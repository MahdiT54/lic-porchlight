"use client";

import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type LoadingButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
  loadingText?: ReactNode;
};

function LoadingButton({
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={disabled || loading} aria-busy={loading}>
      {loading && (
        <Loader2
          data-icon="inline-start"
          className="animate-spin"
          aria-hidden="true"
        />
      )}
      {loading ? (loadingText ?? children) : children}
    </Button>
  );
}

export { LoadingButton, type LoadingButtonProps };
