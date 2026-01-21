// Типы для платежной системы

// Интерфейс для данных заказа
export interface OrderData {
  amount: number;
  currency: string;
  orderId: string;
}

// Интерфейс нашего приложения для платежей
export interface PaymentProcessor {
  processPayment(orderData: OrderData): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

// Типы для стороннего сервиса Stripe
export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}
