import React from "react";

interface SpinnerProps {
  /**
   * Size of the spinner: 'sm' (24px), 'md' (40px), 'lg' (64px)
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to center the spinner on the page
   * @default true
   */
  centered?: boolean;

  /**
   * Optional label text to display below the spinner
   */
  label?: string;

  /**
   * Color theme: 'blue', 'green', 'purple', 'orange'
   * @default 'blue'
   */
  color?: "blue" | "green" | "purple" | "orange";
}

/**
 * Reusable loading spinner component with Tailwind CSS animations
 *
 * @example
 * // Basic usage
 * <Spinner />
 *
 * @example
 * // Large spinner with label
 * <Spinner size="lg" label="Loading recipes..." />
 *
 * @example
 * // Inline spinner (not centered)
 * <Spinner size="sm" centered={false} />
 */
function Spinner({
  size = "md",
  centered = true,
  label,
  color = "blue",
}: SpinnerProps): React.ReactNode {
  // Size classes mapping
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  // Color classes mapping for the spinner ring
  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    orange: "border-orange-500",
  };

  // The spinner element with rotation animation
  const spinnerElement = (
    <div className="flex flex-col items-center gap-3">
      {/* Animated spinner ring */}
      <div
        className={`
          ${sizeClasses[size]}
          border-4
          ${colorClasses[color]}
          border-t-transparent
          rounded-full
          animate-spin
        `}
        role="status"
        aria-live="polite"
        aria-label="Loading"
      />

      {/* Optional label text */}
      {label && (
        <p className="text-sm text-gray-600 font-medium">
          {label}
        </p>
      )}
    </div>
  );

  // If centered, wrap in centering container
  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-50">
        {spinnerElement}
      </div>
    );
  }

  // Otherwise, return just the spinner
  return spinnerElement;
}

export default Spinner;
