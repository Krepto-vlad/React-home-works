import { PaymentProcessorFactory } from "./paymentFactory";

export function getPaymentProcessor() {
  return PaymentProcessorFactory.createPaymentProcessor();
}

export type { PaymentProcessor, PaymentResult, OrderData } from "../../types/paymentTypes";
