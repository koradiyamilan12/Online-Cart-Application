import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import Container from "./Container";

function Header() {
  return (
    <header className="border-b bg-white">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link className="flex items-center gap-2 font-semibold text-slate-900" to={ROUTES.HOME}>
          <span className="grid size-8 place-items-center rounded-md bg-indigo-600 text-white">
            <FiShoppingCart aria-hidden="true" className="size-4" />
          </span>
          <span>{APP_NAME}</span>
        </Link>
        <Link className={cn(buttonVariants({ variant: "outline", size: "sm" }))} to={ROUTES.LOGIN}>
          Sign in
        </Link>
      </Container>
    </header>
  );
}

export default Header;
