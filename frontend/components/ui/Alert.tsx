"use client";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export default function Alert({
  message,
  type = "info",
  onClose,
}: AlertProps) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        flex items-center gap-3
        px-4 py-3 rounded-lg border shadow-lg
        animate-slideIn
        ${styles[type]}
      `}
    >
      <span className="text-sm font-medium">{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-lg font-bold leading-none hover:opacity-70"
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}
