function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="mt-4 h-3 w-20 rounded bg-slate-200" />
            <div className="mt-6 flex items-center justify-between">
              <div className="h-10 w-28 rounded bg-slate-200" />
              <div className="h-10 w-24 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-2/3 rounded bg-slate-200" />
          <div className="h-10 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
