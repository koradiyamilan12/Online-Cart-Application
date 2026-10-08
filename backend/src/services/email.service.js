const config = require("../config/config");
const resend = require("../config/resend");
const {
  buildOrderSummaryEmail,
} = require("../templates/order-email.template");

async function sendOrderSummaryEmail({
  customerName,
  customerEmail,
  orderId,
  items,
  totalAmount,
}) {
  if (!resend || !config.resendFromEmail) {
    throw new Error("Order email service is not configured");
  }

  const { html, text } = buildOrderSummaryEmail({
    customerName,
    orderId,
    items,
    totalAmount,
  });

  let result;
  try {
    result = await resend.emails.send({
      from: config.resendFromEmail,
      to: [customerEmail],
      subject: "Your order summary",
      html,
      text,
    });
  } catch {
    throw new Error("Failed to send order summary email");
  }

  if (result?.error || !result?.data) {
    throw new Error("Failed to send order summary email");
  }

  return result.data;
}

module.exports = {
  sendOrderSummaryEmail,
};
