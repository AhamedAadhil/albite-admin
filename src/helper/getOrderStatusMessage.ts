export function getOrderStatusMessage(
  orderId: string,
  status: string,
  rejectionReason?: string
): string {
  switch (status) {
    case "placed":
      return `Your order (#${orderId}) has been placed successfully. We are preparing it for you!`;
    case "accepted":
      return `Good news! Your order (#${orderId}) has been accepted and is being processed.`;
    case "prepared":
      return `Your order (#${orderId}) is prepared and ready to be dispatched soon.`;
    case "delivered":
      return `Your order (#${orderId}) has been delivered. We hope you enjoy your meal!`;
    case "rejected":
      return `Unfortunately, your order (#${orderId}) was rejected. Reason: ${
        rejectionReason || "N/A"
      }. Please contact support for assistance.`;
    case "cancelled":
      return `Your order (#${orderId}) has been cancelled. If this was unexpected, please get in touch with us.`;
    case "out_for_delivery": // or 'prepared' if you track differently
      return `Your order (#${orderId}) is out for delivery. Keep an eye out for our friendly delivery partner.`;
    default:
      return `Your order (#${orderId}) status has been updated to ${status}.`;
  }
}
