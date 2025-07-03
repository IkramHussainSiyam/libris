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
      className="fixed bottom-3 z-[999] translate-y-32 opacity-0 data-[settings-changed=true]:opacity-100 data-[settings-changed=true]:translate-y-0 left-1/2 -translate-x-1/2 shadow-2xl shadow-primary/60 border-2 border-primary w-[calc(100%-1.5rem)] lg:w-2/3 xl:w-1/2 px-4 py-3 bg-light dark:bg-muted flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between transition-all"
    >
      <span className="text-sm font-display font-medium">
        🛑 Careful — you have unsaved changes!
      </span>
      <div className="flex flex-col md:flex-row md:items-center gap-2.5">
        <Button
          onClick={onReset}
          type="button"
          variant={"outlined"}
          className="h-8 text-xs md:h-10 md:text-sm border-none bg-transparent shadow-none"
        >
          Cencel Changes
        </Button>
        <SubmitButton
          pending={isSubmitting}
          render={(pending) => (pending ? "Saving..." : "Save Changes")}
          className="h-8 text-xs md:h-10 md:text-sm"
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
