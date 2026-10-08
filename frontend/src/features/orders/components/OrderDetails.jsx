import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import OrderItem from "@/features/orders/components/OrderItem";
import OrderSummary from "@/features/orders/components/OrderSummary";

function OrderDetails({ order, isNewlyPlaced = false }) {
  if (!order) return null;

  const items = Array.isArray(order.items) ? order.items : [];
  const itemCount = items.reduce(
    (sum, item) => sum + Number(item?.quantity ?? 0),
    0,
  );
  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <PageHeader
        action={
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-fit gap-2",
            )}
            to={ROUTES.ORDERS}
          >
            <FiArrowLeft aria-hidden="true" className="size-4" /> Back to orders
          </Link>
        }
        description={`Placed on ${orderDate}`}
        eyebrow="Order details"
        title={`Order #${order.id}`}
      />

      {isNewlyPlaced ? (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/75 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-emerald-700 shadow-sm">
              <FiCheckCircle aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-emerald-950">
                Order placed successfully
              </h2>
              <p className="mt-1 text-sm leading-6 text-emerald-800">
                Your order has been created. You can find it here and in your
                order history.
              </p>
            </div>
          </div>
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "shrink-0 border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100",
            )}
            to={ROUTES.ORDERS}
          >
            View my orders
          </Link>
        </div>
      ) : null}

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Items in this order</CardTitle>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium tabular-nums text-slate-600">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-5">
            {items.length ? (
              items.map((item, index) => (
                <OrderItem
                  item={item}
                  key={`${item.productName ?? item.name}-${index}`}
                />
              ))
            ) : (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                No items were recorded for this order.
              </p>
            )}
          </CardContent>
        </Card>
        <OrderSummary
          createdAt={order.createdAt}
          itemCount={itemCount}
          totalAmount={order.totalAmount}
        />
      </div>
    </Container>
  );
}

export default OrderDetails;
