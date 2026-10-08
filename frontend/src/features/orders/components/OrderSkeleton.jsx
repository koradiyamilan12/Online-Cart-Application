function OrderSkeleton() {
  return (
    <div aria-label="Loading orders" className="space-y-4" role="status">
      <span className="sr-only">Loading orders</span>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          aria-hidden="true"
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
          key={index}
        >
          <div className="flex items-center gap-4">
            <div className="size-12 shrink-0 rounded-2xl bg-slate-100" />
            <div className="flex-1">
              <div className="h-4 w-32 rounded bg-slate-100" />
              <div className="mt-3 h-3 w-40 rounded bg-slate-100" />
            </div>
            <div className="hidden h-5 w-24 rounded bg-slate-100 sm:block" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderSkeleton;
