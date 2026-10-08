import Container from "@/components/layout/Container";
import EmptyState from "@/components/common/EmptyState";

function PlaceholderPage({ title, description }) {
  return (
    <Container className="py-12 sm:py-16">
      <EmptyState description={description} title={title} />
    </Container>
  );
}

export default PlaceholderPage;
