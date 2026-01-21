import type { StripePaymentIntent } from "../../types/paymentTypes";

export class StripePaymentService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: { orderId: string }
  ): Promise<StripePaymentIntent> {
    console.log(`[Stripe API] Creating payment intent for $${amount} ${currency.toUpperCase()}`);
    
    const paymentIntent: StripePaymentIntent = {
      id: `pi_test_${Date.now()}`,
      amount: amount * 100, 
      currency: currency.toLowerCase(),
      status: "requires_payment_method",
      clientSecret: `pi_test_secret_${Date.now()}`,
    };

    return paymentIntent;
  }
}
