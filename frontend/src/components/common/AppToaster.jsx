import { Toaster } from "react-hot-toast";

function AppToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 3500,
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
        style: {
          maxWidth: "calc(100vw - 2rem)",
          border: "1px solid #e2e8f0",
          borderRadius: "0.875rem",
          background: "#ffffff",
          color: "#0f172a",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: "#047857",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#b91c1c",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

export default AppToaster;
