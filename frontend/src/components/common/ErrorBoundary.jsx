import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
          <section
            aria-labelledby="application-error-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            role="alert"
          >
            <h1
              className="text-xl font-semibold tracking-tight text-slate-950"
              id="application-error-title"
            >
              Something went wrong
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The application encountered an unexpected problem.
            </p>
            <button
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              onClick={() => window.location.reload()}
              type="button"
            >
              Reload application
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
