"use client";

import { useEffect } from "react";
import Container from "~/components/common/others/Container";
import Alert from "~/components/layout/error/Alert";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Alert
        className="w-full max-w-full"
        details={error.message}
        variant="error"
        onErrorReset={() => reset()}
      />
    </Container>
  );
}
