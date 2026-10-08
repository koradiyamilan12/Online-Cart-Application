const config = require("../config/config");
const resend = require("../config/resend");
const { buildOrderSummaryEmail } = require("../templates/order-email.template");

const TESTING_SENDER_VALIDATION_MESSAGE =
  "Testing sender can only deliver to the Resend account email. Verify a domain to send to others.";

function isResendValidationError(error) {
  const hasValidationErrorName = [error?.name, error?.code].some(
    (name) => String(name).toLowerCase() === "validation_error",
  );

  return (
    Number(error?.statusCode ?? error?.status) === 403 && hasValidationErrorName
  );
}

function createTestingSenderValidationError(providerError) {
  const error = new Error(TESTING_SENDER_VALIDATION_MESSAGE);
  error.isResendTestingSenderValidationError = true;
  error.providerMessage = providerError?.message;
  return error;
}

async function sendOrderSummaryEmail({
  customerName,
  customerEmail,
  orderId,
  items,
  totalAmount,
}) {
  const from = config.getEmailFrom();

  if (!resend) {
    throw new Error(
      "Order email service is not configured. Set RESEND_API_KEY to enable order emails.",
    );
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
      from,
      to: [customerEmail],
      subject: "Your order summary",
      html,
      text,
    });
  } catch (error) {
    if (isResendValidationError(error)) {
      throw createTestingSenderValidationError(error);
    }

    throw new Error(`Failed to send order summary email: ${error.message}`, {
      cause: error,
    });
  }

  if (result?.error) {
    const { message, statusCode } = result.error;

    if (isResendValidationError(result.error)) {
      throw createTestingSenderValidationError(result.error);
    }
    const status = statusCode ? ` (HTTP ${statusCode})` : "";
    throw new Error(
      `Failed to send order summary email${status}: ${message || "Resend returned an unknown error."}`,
    );
  }

  if (!result?.data) {
    throw new Error(
      "Failed to send order summary email: Resend returned no email data or error details.",
    );
  }

  return result.data;
}

module.exports = {
  sendOrderSummaryEmail,
};
