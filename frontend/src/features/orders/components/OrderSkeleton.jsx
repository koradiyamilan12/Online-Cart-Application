function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>
          <div className="mt-5 h-4 w-36 rounded bg-slate-200" />
          <div className="mt-3 h-10 w-full rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default OrderSkeleton;
