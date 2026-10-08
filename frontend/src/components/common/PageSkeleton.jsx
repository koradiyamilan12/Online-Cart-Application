function PageSkeleton() {
  return (
    <div
      aria-label="Loading page"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      role="status"
    >
      <span className="sr-only">Loading page</span>
      <div aria-hidden="true" className="animate-pulse">
        <div className="h-3 w-28 rounded-full bg-slate-200" />
        <div className="mt-3 h-9 w-64 max-w-full rounded-lg bg-slate-200" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-full bg-slate-100" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white p-5"
              key={index}
            >
              <div className="h-36 rounded-xl bg-slate-100" />
              <div className="mt-5 h-4 w-3/4 rounded bg-slate-100" />
              <div className="mt-3 h-4 w-1/3 rounded bg-slate-100" />
              <div className="mt-5 h-11 rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;
