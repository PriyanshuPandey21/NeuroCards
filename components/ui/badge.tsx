import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-chart-1/10 text-chart-1 border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    destructive: "bg-red-500/10 text-red-500 border-red-500/20",
    outline: "text-foreground border-border",
    success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
