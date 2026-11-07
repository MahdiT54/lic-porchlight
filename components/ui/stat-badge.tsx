import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  icon: LucideIcon;
  value: string | number | null | undefined;
  label: string;
  color?: "primary" | "secondary";
  className?: string;
}

export function StatBadge({
  icon: Icon,
  value,
  label,
  color = "primary",
  className,
}: StatBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border/50 bg-background p-4 shadow-warm",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          color === "primary"
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-semibold tabular-nums">{value ?? "—"}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
