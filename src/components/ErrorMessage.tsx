import React from "react";

interface ErrorMessageProps {
  /**
   * Error message to display
   */
  message: string;

  /**
   * Whether to center the error message
   * @default true
   */
  centered?: boolean;

  /**
   * Optional callback when retry button is clicked
   */
  onRetry?: () => void;
}

/**
 * Reusable error message component with Tailwind CSS styling
 *
 * @example
 * <ErrorMessage message="Failed to fetch recipes" />
 *
 * @example
 * <ErrorMessage 
 *   message="Network error. Please try again."
 *   onRetry={() => refetch()}
 * />
 */
function ErrorMessage({
  message,
  centered = true,
  onRetry,
}: ErrorMessageProps): React.ReactNode {
  const errorContent = (
    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
      <div className="flex items-start gap-3">
        {/* Error icon */}
        <div className="shrink-0 mt-0.5">
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Error message and retry button */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
          <p className="text-sm text-red-700 mt-1">{message}</p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-50">
        {errorContent}
      </div>
    );
  }

  return errorContent;
}

export default ErrorMessage;