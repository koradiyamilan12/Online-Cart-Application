function ProductListSkeleton() {
  return (
    <div
      aria-label="Loading products"
      className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
    >
      <span className="sr-only">Loading products</span>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          key={index}
        >
          <div className="h-40 animate-pulse bg-slate-100 sm:h-44" />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-5 w-4/5 animate-pulse rounded-md bg-slate-100" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-slate-100" />
            <div className="h-6 w-24 animate-pulse rounded-md bg-slate-100" />
            <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListSkeleton;
