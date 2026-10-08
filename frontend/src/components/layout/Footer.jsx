import { FiArrowUpRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { APP_NAME } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200/80 bg-white sm:mt-20">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-800"
          to={ROUTES.HOME}
        >
          <span className="grid size-7 place-items-center rounded-lg bg-brand-50 text-brand-700">
            <FiShoppingBag aria-hidden="true" className="size-3.5" />
          </span>
          {APP_NAME}
        </Link>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {APP_NAME}. A simpler way to shop.
        </p>
        <Link
          className="inline-flex w-fit items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-brand-700"
          to={ROUTES.DASHBOARD}
        >
          Explore the shop{" "}
          <FiArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
