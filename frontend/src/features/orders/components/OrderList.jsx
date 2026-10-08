import OrderCard from "@/features/orders/components/OrderCard";

function OrderList({ orders }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrderList;
