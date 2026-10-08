function CartSkeleton() {
  return (
    <div
      aria-label="Loading cart"
      className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6"
      role="status"
    >
      <span className="sr-only">Loading cart</span>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            aria-hidden="true"
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
            key={index}
          >
            <div className="flex gap-4">
              <div className="size-14 shrink-0 rounded-2xl bg-slate-100" />
              <div className="flex-1">
                <div className="h-4 w-40 rounded bg-slate-100" />
                <div className="mt-3 h-3 w-24 rounded bg-slate-100" />
                <div className="mt-6 flex justify-between">
                  <div className="h-10 w-28 rounded-xl bg-slate-100" />
                  <div className="h-5 w-20 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="h-fit animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div className="h-4 w-32 rounded bg-slate-100" />
        <div className="mt-6 h-4 rounded bg-slate-100" />
        <div className="mt-5 h-px bg-slate-100" />
        <div className="mt-5 h-6 w-28 rounded bg-slate-100" />
        <div className="mt-6 h-12 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export default CartSkeleton;
