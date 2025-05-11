import React from "react";

export const Spinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-primary border-l-primary border-r-transparent border-b-transparent ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    />
  );
};