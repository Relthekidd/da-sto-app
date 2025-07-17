// src/services/orderNotification.ts

import emailjs from 'emailjs-com';
import { OrderDetails } from '@/types/order';

const EMAIL_SERVICE_ID = 'service_6fbtnng';
const EMAIL_TEMPLATE_ID = 'template_zwhnofn';
const EMAIL_PUBLIC_KEY = 'LDgGZXL103cOvDqP4';

export async function sendOrderNotification(orderDetails: OrderDetails) {
  try {
    const itemsList = orderDetails.items
      .map(
        (item) =>
          `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    const emailParams = {
      to_email: 'angladea16@gmail.com',
      from_name: orderDetails.customer.name,
      order_id: orderDetails.orderId,
      customer_phone: orderDetails.customer.phone,
      delivery_address: orderDetails.customer.address,
      delivery_instructions: orderDetails.deliveryInstructions || 'None',
      special_requests: orderDetails.specialRequests || 'None',
      items: itemsList,
      total: `$${(orderDetails.total + orderDetails.deliveryFee).toFixed(2)}`,
      timestamp: new Date(orderDetails.timestamp).toLocaleString(),
    };

    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      emailParams,
      EMAIL_PUBLIC_KEY
    );

    return result.status === 200;
  } catch (error) {
    console.error('Error sending order notification:', error);
    return false;
  }
}
