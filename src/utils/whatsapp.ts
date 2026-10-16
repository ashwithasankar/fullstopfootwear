import { businessData } from '../data/business';
import { CartItem, OrderCustomerInfo, Product } from '../types';

/**
 * Creates a structured WhatsApp order link for a single product.
 */
export function createSingleProductWhatsAppUrl(
  product: Product,
  selectedColor: string,
  selectedSize: number,
  quantity: number = 1
): string {
  const total = (product.price * quantity).toLocaleString();
  const text = [
    `*FULLSTOP SHOE MALL — Footwear Order Enquiry*`,
    ``,
    `Hello Fullstop Shoe Mall, I would like to enquire about these footwear items:`,
    `• *Product:* ${product.name}`,
    `• *Brand:* ${product.brand}`,
    `• *Colour:* ${selectedColor}`,
    `• *Size:* EU ${selectedSize}`,
    `• *Quantity:* ${quantity}`,
    `• *Price:* ${businessData.currency}${total}`,
    ``,
    `Please let me know availability and estimated dispatch time. Thank you!`,
  ].join('\n');

  return `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates a structured WhatsApp order link for a full cart order enquiry.
 */
export function createCartOrderWhatsAppUrl(
  items: CartItem[],
  customer: OrderCustomerInfo
): string {
  const totalAmount = items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toLocaleString();

  const lines: string[] = [
    `*FULLSTOP SHOE MALL — Footwear Order Request*`,
    ``,
    `*Customer Details:*`,
    `• Name: ${customer.name || 'Not provided'}`,
    `• Phone: ${customer.phoneOrWhatsapp || 'Not provided'}`,
    `• City / Country: ${customer.city || 'Not provided'}`,
    `• Address: ${customer.address || 'Not provided'}`,
  ];

  if (customer.notes && customer.notes.trim()) {
    lines.push(`• Notes / Fit advice: ${customer.notes.trim()}`);
  }

  lines.push(``, `*Selected Silhouettes (${items.length}):*`);

  items.forEach((item, index) => {
    const itemTotal = (item.product.price * item.quantity).toLocaleString();
    lines.push(
      `${index + 1}. *${item.product.name}* (${item.product.brand})`,
      `   Colour: ${item.selectedColor.name} | Size: EU ${item.selectedSize} | Qty: ${item.quantity}`,
      `   Price: ${businessData.currency}${itemTotal}`
    );
  });

  lines.push(
    ``,
    `*Estimated Total: ${businessData.currency}${totalAmount}*`,
    ``,
    `Please confirm the order and availability and dispatch details.`
  );

  return `https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
