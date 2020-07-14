require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows[0]) res.json(result.rows[0]);
      else next(new ClientError(`Product with ID ${productId} does not exist`, 404));
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
   select "c"."cartItemId",
          "c"."price",
          "p"."productId",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
     from "cartItems" as "c"
     join "products" as "p" using ("productId")
    where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (productId < 0) {
    return res.status(400).json({ error: 'Please enter a valid Id' });
  }
  const sql = `
    select "price"
      from "products"
     where "productId" = $1
  `;
  const params = [productId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`No products with Id ${productId}`);
      }
      const price = result.rows[0].price;
      if (req.session.cartId) {
        return ({
          cartId: req.session.cartId,
          price: price
        });
      } else {
        const sqlAddToCarts = `
            insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
          `;
        return db.query(sqlAddToCarts)
          .then(result => {
            return ({
              cartId: result.rows[0].cartId,
              price: price
            });
          });
      }

    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sqlAddCartItem = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const cartItemParams = [result.cartId, productId, result.price];
      return db.query(sqlAddCartItem, cartItemParams)
        .then(result => {
          return result.rows[0];
        });
    })
    .then(result => {
      const sqlJoinCart = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1
      `;
      const joinCartParams = [result.cartItemId];
      return db.query(sqlJoinCart, joinCartParams)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400)
      .json({ error: 'Add items to cart to start an order' });
  }
  const { name, creditCard, shippingAddress } = req.body;
  if (name && creditCard && shippingAddress) {
    const sql = `
      insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
        values ($1, $2, $3, $4)
        returning "name", "orderId", "createdAt", "creditCard", "shippingAddress"
    `;
    const params = [req.session.cartId, name, creditCard, shippingAddress];
    db.query(sql, params)
      .then(result => {
        delete req.session.cartId;
        res.status(201).json(result.rows[0]);
      })
      .catch(err => next(err));
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  const sql = `
    delete from "cartItems"
    where "cartItemId" = $1
    returning *
  `;
  db.query(sql, [cartItemId])
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
