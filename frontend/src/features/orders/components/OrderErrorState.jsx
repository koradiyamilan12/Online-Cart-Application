import ErrorMessage from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/button";

function OrderErrorState({ message, onRetry }) {
  return (
    <div className="space-y-4">
      <ErrorMessage message={message || "Unable to load orders."} />
      {onRetry ? (
        <Button onClick={onRetry} type="button" variant="outline">
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export default OrderErrorState;
