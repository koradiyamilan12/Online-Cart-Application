import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

function OrderEmptyState({ onRefresh }) {
  return (
    <EmptyState
      action={
        onRefresh ? (
          <Button className="gap-2" onClick={onRefresh} type="button" variant="outline">
            Refresh orders
          </Button>
        ) : null
      }
      description="You have not placed any orders yet. Add products to your cart and complete a checkout to see your order history."
      title="No orders yet"
      className="border-slate-200"
    />
  );
}

export default OrderEmptyState;
