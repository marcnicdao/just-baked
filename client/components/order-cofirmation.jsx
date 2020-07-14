import React from 'react';

class OrderConfirmation extends React.Component {

  render() {
    const { setView } = this.props;
    return (

      <div className='d-flex text-center justify-content-center align-items-center flex-column px-4'>
        <button onClick={() => setView('catalog', {})}
          className="details-back-button btn btn-outline-dark mb-5">{'Back to catalog'}
        </button>

        <h3>Your order has been placed</h3>
        <p>Reminder: No real purchases were made during this transaction</p>

      </div>
    );

  }
}
export default OrderConfirmation;
