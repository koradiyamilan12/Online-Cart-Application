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
  const senderAddress = config.emailFrom || config.resendFromEmail;

  if (!resend || !senderAddress) {
    throw new Error("Order email service is not configured");
  }

  const { html, text } = buildOrderSummaryEmail({
    customerName,
    orderId,
    items,
    totalAmount,
    appName: config.appName,
  });

  let result;
  try {
    result = await resend.emails.send({
      from: senderAddress,
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
