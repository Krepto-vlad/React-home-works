import type { PaymentProcessor } from "../../types/paymentTypes";
import { StripeCheckoutAdapter } from "./stripeCheckoutAdapter";
import {
  LoggingPaymentDecorator,
  ErrorHandlingPaymentDecorator,
  ValidationPaymentDecorator,
} from "./paymentDecorators";


export class PaymentProcessorFactory {
  static createPaymentProcessor(): PaymentProcessor {
    let processor: PaymentProcessor = new StripeCheckoutAdapter();

    processor = new ValidationPaymentDecorator(processor); 
    processor = new ErrorHandlingPaymentDecorator(processor, 2);
    processor = new LoggingPaymentDecorator(processor); 

    return processor;
  }
}
