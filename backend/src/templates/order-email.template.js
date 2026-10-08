function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatInr(amount) {
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(String(amount));

  if (!match) {
    throw new Error("Invalid order amount for email");
  }

  const [, wholeAmount, fractionalAmount = ""] = match;
  const fraction = fractionalAmount.padEnd(2, "0");
  const lastThreeDigits = wholeAmount.slice(-3);
  const remainingDigits = wholeAmount.slice(0, -3);
  const groupedAmount = remainingDigits
    ? `${remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${lastThreeDigits}`
    : lastThreeDigits;

  return `₹${groupedAmount}.${fraction}`;
}

function buildOrderSummaryEmail({ customerName, items, totalAmount, appName = "Online Cart" }) {
  const htmlRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(item.productName)}</td>
          <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${escapeHtml(item.quantity)}</td>
          <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; white-space: nowrap;">${formatInr(item.unitPrice)}</td>
          <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; white-space: nowrap;">${formatInr(item.lineTotal)}</td>
        </tr>`,
    )
    .join("");
  const textItems = items
    .map(
      (item) =>
        `${item.productName}\nQuantity: ${item.quantity}\nPrice: ${formatInr(item.unitPrice)}\nTotal: ${formatInr(item.lineTotal)}`,
    )
    .join("\n\n");
  const formattedTotal = formatInr(totalAmount);

  return {
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body style="margin: 0; padding: 24px 12px; background: #f8fafc; color: #1f2937; font-family: Arial, sans-serif;">
    <main style="max-width: 640px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="margin: 0 0 16px; color: #111827;">Your order summary</h2>
      <p style="margin: 0 0 24px; line-height: 1.5;">Hi ${escapeHtml(customerName)}, thanks for your order from ${escapeHtml(appName)}. Here is your bill:</p>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f3f4f6; text-align: left;">
              <th scope="col" style="padding: 10px 8px;">Product</th>
              <th scope="col" style="padding: 10px 8px; text-align: center;">Qty</th>
              <th scope="col" style="padding: 10px 8px; text-align: right;">Price</th>
              <th scope="col" style="padding: 10px 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>${htmlRows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 16px 8px 0; font-weight: 700; text-align: right;">Grand Total</td>
              <td style="padding: 16px 8px 0; font-weight: 700; text-align: right; white-space: nowrap;">${formattedTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p style="margin: 28px 0 0; line-height: 1.5;">Thank you for shopping with ${escapeHtml(appName)}.</p>
    </main>
  </body>
</html>`,
    text: `Hi ${customerName},\n\nThanks for your order from ${appName}. Here is your bill:\n\n${textItems}\n\nGrand Total: ${formattedTotal}\n\nThank you for shopping with ${appName}.`,
  };
}

module.exports = {
  buildOrderSummaryEmail,
  escapeHtml,
  formatInr,
};
