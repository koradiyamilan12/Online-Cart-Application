import CartItem from "./CartItem";

function CartList({ items, isMutating, mutatingItemId, onDecrease, onIncrease, onRemove }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          isMutating={isMutating}
          item={item}
          mutatingItemId={mutatingItemId}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default CartList;
