"use client";

import SubmitButton from "~/components/common/submit/SubmitButton";
import { Button } from "~/components/ui/button";

export default function SaveSettingsButton({
  isSettingsChanged,
  onReset,
  isSubmitting,
}: Props) {
  return (
    <div
      data-settings-changed={isSettingsChanged}
      className="fixed bottom-3 translate-y-32 data-[settings-changed=true]:translate-y-0 left-1/2 -translate-x-1/2 shadow-2xl shadow-primary/60 border-2 border-primary w-1/2 px-4 py-3 bg-light dark:bg-muted flex items-center justify-between transition-all"
    >
      <span className="text-sm font-display font-medium">
        🛑 Careful — you have unsaved changes!
      </span>
      <div className="flex items-center gap-2.5">
        <Button
          onClick={onReset}
          type="button"
          variant={"outlined"}
          className="border-none bg-transparent shadow-none"
        >
          Cencel Changes
        </Button>
        <SubmitButton
          pending={isSubmitting}
          render={(pending) => (pending ? "Saving..." : "Save Changes")}
        />
      </div>
    </div>
  );
}

type Props = {
  isSettingsChanged: boolean;
  onReset: () => void;
  isSubmitting: boolean;
};
