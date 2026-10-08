import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/button";

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loadingText = "Working…",
  loading = false,
  onConfirm,
  onOpenChange,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100vw_-_2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/45"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      ref={dialogRef}
    >
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight" id={titleId}>
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600" id={descriptionId}>
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            autoFocus
            disabled={loading}
            onClick={() => onOpenChange(false)}
            type="button"
            variant="outline"
          >
            {cancelLabel}
          </Button>
          <Button
            loading={loading}
            loadingText={loadingText}
            onClick={onConfirm}
            type="button"
            variant="destructive"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
