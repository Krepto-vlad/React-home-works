import type { PaymentProcessor, PaymentResult, OrderData } from "../../types/paymentTypes";

abstract class PaymentDecorator implements PaymentProcessor {
  constructor(protected processor: PaymentProcessor) {}

  async processPayment(orderData: OrderData): Promise<PaymentResult> {
    return this.processor.processPayment(orderData);
  }
}


export class LoggingPaymentDecorator extends PaymentDecorator {
  async processPayment(orderData: OrderData): Promise<PaymentResult> {
    console.log(`[Decorator: Logging] Starting payment for order ${orderData.orderId}, amount: $${orderData.amount}`);
    const startTime = Date.now();

    const result = await this.processor.processPayment(orderData);

    const duration = Date.now() - startTime;
    console.log(`[Decorator: Logging] Payment ${result.success ? 'succeeded' : 'failed'} in ${duration}ms`);

    return result;
  }
}

export class ErrorHandlingPaymentDecorator extends PaymentDecorator {
  constructor(processor: PaymentProcessor, private maxRetries: number = 3) {
    super(processor);
  }

  async processPayment(orderData: OrderData): Promise<PaymentResult> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`[Decorator: ErrorHandling] Attempt ${attempt}/${this.maxRetries}`);
        return await this.processor.processPayment(orderData);
      } catch (error) {
        lastError = error as Error;
        console.error(`[Decorator: ErrorHandling] Attempt ${attempt} failed:`, error);

        if (attempt < this.maxRetries) {
          await this.delay(1000 * attempt);
        }
      }
    }

    return {
      success: false,
      message: `Payment failed after ${this.maxRetries} attempts: ${lastError?.message}`,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}


export class ValidationPaymentDecorator extends PaymentDecorator {
  async processPayment(orderData: OrderData): Promise<PaymentResult> {
    console.log(`[Decorator: Validation] Validating payment data`);

    if (orderData.amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount: must be greater than 0',
      };
    }

    if (!orderData.currency || orderData.currency.length !== 3) {
      return {
        success: false,
        message: 'Invalid currency code',
      };
    }

    if (!orderData.orderId || orderData.orderId.trim() === '') {
      return {
        success: false,
        message: 'Invalid order ID',
      };
    }

    console.log(`[Decorator: Validation] Validation passed`);
    return this.processor.processPayment(orderData);
  }
}

