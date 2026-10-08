function ProductListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="h-32 animate-pulse bg-slate-200" />
          <div className="space-y-4 p-5">
            <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-10 w-28 animate-pulse rounded-md bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListSkeleton;
