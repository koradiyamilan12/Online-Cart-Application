import { FiArrowRight, FiLock, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";

function HomePage() {
  return (
    <Container className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm font-medium text-indigo-700">
          <FiShoppingBag aria-hidden="true" className="size-4" />
          Online Cart Application
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Shopping, made clear and simple.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          The storefront foundation is ready. Secure sign-in, product discovery, and cart management will be introduced in the next phases.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={cn(buttonVariants({ size: "lg" }))} to={ROUTES.LOGIN}>
            Sign in
            <FiArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }))} to={ROUTES.REGISTER}>
            Create account
          </Link>
        </div>
      </div>

      <Card className="mt-12 max-w-2xl">
        <CardHeader>
          <CardTitle>Built on a secure foundation</CardTitle>
          <CardDescription>Phase 0 establishes the application structure without pre-building future features.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-indigo-50 text-indigo-700">
              <FiLock aria-hidden="true" className="size-4" />
            </span>
            <p>Authentication is prepared for HTTP-only cookies. Sensitive credentials are never stored in browser storage.</p>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default HomePage;
