"use client";
import { ReactNode, Suspense as ReactSuspense } from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import Alert from "../layout/error/Alert";
import LoadingText from "../layout/loading/LoadingText";

export default function AsyncBoundary({
  children,
  suspenseFallback,
  errorFallback,
  loadingWithBg,
}: BoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={errorFallback || DefaultErrorFallback}
    >
      <ReactSuspense
        fallback={
          suspenseFallback || (
            <DefaultLoadingFallback withBg={loadingWithBg ?? false} />
          )
        }
      >
        {children}
      </ReactSuspense>
    </ReactErrorBoundary>
  );
}

export function ErrorBoundary({
  errorFallback,
  children,
}: Omit<BoundaryProps, "suspenseFallback">) {
  return (
    <ReactErrorBoundary
      FallbackComponent={errorFallback || DefaultErrorFallback}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export function Suspense({
  suspenseFallback,
  children,
  loadingWithBg,
}: Omit<BoundaryProps, "errorFallback">) {
  return (
    <ReactSuspense
      fallback={
        suspenseFallback || (
          <DefaultLoadingFallback withBg={loadingWithBg ?? false} />
        )
      }
    >
      {children}
    </ReactSuspense>
  );
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Alert
      className="w-full h-fit"
      variant="error"
      message="Oops! Something went wrong."
      details={error.message}
      onErrorReset={resetErrorBoundary}
    />
  );
}

function DefaultLoadingFallback({ withBg }: { withBg: boolean }) {
  if (withBg)
    return (
      <div className="w-full h-fit bg-white dark:bg-muted py-6">
        <LoadingText showDots noText dotSize="8px" />
      </div>
    );

  return <LoadingText showDots noText dotSize="8px" />;
}

type BoundaryProps = {
  loadingWithBg?: boolean;
  children: ReactNode;
  suspenseFallback?: ReactNode;
  errorFallback?: React.FC<FallbackProps>;
};
