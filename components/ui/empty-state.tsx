import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-background px-6 py-16 text-center",
        className,
      )}
      {...props}
    >
      {Icon && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-8" aria-hidden="true" />
        </div>
      )}
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export { EmptyState, type EmptyStateProps };
