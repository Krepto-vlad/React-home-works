import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../../constants/stripeConfig';
import type { PaymentProcessor, PaymentResult, OrderData } from '../../types/paymentTypes';
import { StripePaymentService } from './thirdPartyServices';


const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export class StripeCheckoutAdapter implements PaymentProcessor {
  private stripeService: StripePaymentService;

  constructor() {
    this.stripeService = new StripePaymentService(STRIPE_PUBLISHABLE_KEY);
  }

  async processPayment(orderData: OrderData): Promise<PaymentResult> {
    console.log(`[Adapter] adapt the request for Stripe`);

    const paymentIntent = await this.stripeService.createPaymentIntent(
      orderData.amount,
      orderData.currency,
      { orderId: orderData.orderId }
    );

    const result = await this.openStripeModal(orderData, paymentIntent.clientSecret);

    return result;
  }

  private openStripeModal(orderData: OrderData, clientSecret: string): Promise<PaymentResult> {
    return new Promise((resolve) => {

      const modalContainer = document.createElement('div');
      modalContainer.id = 'stripe-modal-root';
      document.body.appendChild(modalContainer);

      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(modalContainer);
        
        const handleClose = (result: PaymentResult) => {
          root.unmount();
          document.body.removeChild(modalContainer);
          resolve(result);
        };

        root.render(
          <StripeModal
            orderData={orderData}
            clientSecret={clientSecret}
            onClose={handleClose}
          />
        );
      });
    });
  }
}


interface StripeModalProps {
  orderData: OrderData;
  clientSecret: string;
  onClose: (result: PaymentResult) => void;
}

const StripeModal: React.FC<StripeModalProps> = ({ orderData, clientSecret, onClose }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="stripe-modal-overlay" onClick={() => onClose({ success: false, message: 'Payment cancelled' })}>
        <div className="stripe-modal-content" onClick={(e) => e.stopPropagation()}>
          <StripeCheckoutForm
            orderData={orderData}
            clientSecret={clientSecret}
            onClose={onClose}
          />
        </div>
      </div>
    </Elements>
  );
};


interface StripeCheckoutFormProps {
  orderData: OrderData;
  clientSecret: string;
  onClose: (result: PaymentResult) => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ orderData, clientSecret, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setLoading(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        onClose({
          success: false,
          message: stripeError.message || 'Payment failed',
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onClose({
          success: true,
          transactionId: paymentIntent.id,
          message: 'Payment successful!',
        });
      }
    } catch (err) {
      onClose({
        success: false,
        message: 'Payment processing error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stripe-checkout-form">
      <div className="stripe-header">
        <h2>Stripe Checkout</h2>
        <button className="close-btn" onClick={() => onClose({ success: false, message: 'Cancelled' })}>
          ×
        </button>
      </div>

      <div className="order-summary">
        <p><strong>Order ID:</strong> {orderData.orderId}</p>
        <p><strong>Amount:</strong> ${orderData.amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-element-container">
          <label>Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => onClose({ success: false, message: 'Cancelled' })}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="pay-btn"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Pay $${orderData.amount.toFixed(2)}`}
          </button>
        </div>
      </form>

      <style>{`
        .stripe-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .stripe-modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .stripe-checkout-form {
          padding: 24px;
        }

        .stripe-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .stripe-header h2 {
          margin: 0;
          font-size: 24px;
          color: #32325d;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 32px;
          color: #aab7c4;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #32325d;
        }

        .order-summary {
          background: #f6f9fc;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .order-summary p {
          margin: 8px 0;
          color: #32325d;
        }

        .card-element-container {
          margin-bottom: 24px;
        }

        .card-element-container label {
          display: block;
          margin-bottom: 8px;
          color: #32325d;
          font-weight: 500;
        }

        .StripeElement {
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          background: white;
        }

        .StripeElement--focus {
          border-color: #35b8be;
          box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
        }

        .StripeElement--invalid {
          border-color: #fa755a;
        }

        .error-message {
          color: #fa755a;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .button-group {
          display: flex;
          gap: 12px;
        }

        .cancel-btn,
        .pay-btn {
          flex: 1;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: #f6f9fc;
          border: 1px solid #e0e0e0;
          color: #32325d;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #e0e0e0;
        }

        .pay-btn {
          background: #35b8be;
          border: none;
          color: white;
        }

        .pay-btn:hover:not(:disabled) {
          background: #35b8be;
        }

        .pay-btn:disabled,
        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
