import { Link } from "react-router-dom";
import EmptyState from "@/components/common/EmptyState";
import { buttonVariants } from "@/components/ui/button-variants";
import Container from "@/components/layout/Container";
import { ROUTES } from "@/constants/routes";

function NotFoundPage() {
  return (
    <Container className="py-12 sm:py-16">
      <EmptyState
        action={<Link className={buttonVariants()} to={ROUTES.HOME}>Return home</Link>}
        description="The page you requested does not exist or has moved."
        title="Page not found"
      />
    </Container>
  );
}

export default NotFoundPage;
