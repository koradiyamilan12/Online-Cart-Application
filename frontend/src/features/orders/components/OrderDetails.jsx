import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import OrderItem from "@/features/orders/components/OrderItem";
import OrderSummary from "@/features/orders/components/OrderSummary";

function OrderDetails({ order }) {
  if (!order) {
    return null;
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const itemCount = items.reduce((sum, item) => sum + Number(item?.quantity ?? 0), 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Order #{order.id}</p>
              <CardTitle className="mt-2 text-2xl">Order details</CardTitle>
            </div>
            <Link to={ROUTES.ORDERS}>
              <Button className="gap-2" type="button" variant="outline">
                <FiArrowLeft aria-hidden="true" className="size-4" />
                Back to orders
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {items.length ? (
              items.map((item, index) => <OrderItem key={`${item.productName}-${index}`} item={item} />)
            ) : (
              <p className="text-sm text-slate-500">No items recorded for this order.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <OrderSummary createdAt={order.createdAt} itemCount={itemCount} totalAmount={order.totalAmount} />
    </div>
  );
}

export default OrderDetails;
