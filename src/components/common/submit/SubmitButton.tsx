"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../../ui/button";

export default function SubmitButton({
  render,
  pending = false,
  disabled = false,
  ...props
}: Props) {
  const { pending: formPending } = useFormStatus();
  const isPending = pending || formPending;

  return (
    <Button disabled={disabled ? disabled : isPending} type="submit" {...props}>
      {render(isPending)}
    </Button>
  );
}

type Props = {
  render: (pending: boolean) => React.ReactNode;
  pending?: boolean;
} & React.ComponentProps<typeof Button>;
