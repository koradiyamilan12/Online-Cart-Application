import { FiArrowLeft, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button-variants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

function NotFoundPage() {
  return (
    <Container className="py-14 sm:py-20">
      <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:px-10 sm:py-16">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <FiCompass aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
          404 · Page not found
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <Link className={cn(buttonVariants(), "mt-7 gap-2")} to={ROUTES.HOME}>
          <FiArrowLeft aria-hidden="true" className="size-4" /> Back to home
        </Link>
      </section>
    </Container>
  );
}

export default NotFoundPage;
