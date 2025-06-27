"use client";
import FormItem from "~/components/common/form/FormItem";
import TextEditor from "~/components/common/others/editor";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { TActivity } from "~/lib/types/activity.type";
import { useStatusWriter } from "../../_hooks/useStatusWriter";

export default function StatusWriter({
  statusToEdit,
}: {
  statusToEdit?: TActivity | null;
}) {
  const { onSubmit, reset, form } = useStatusWriter({ statusToEdit });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <TextEditor
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                id={field.name}
                placeholder="What's on your mind?"
              />
            </FormItem>
          )}
        />
        <Show when={form.formState.isDirty}>
          <div className="flex gap-2 justify-end w-full">
            <div className="flex items-center gap-3">
              <Button
                onClick={reset}
                type="button"
                variant={"destructive"}
                size={"sm"}
                className="h-7 px-3"
              >
                Cencel
              </Button>
              <SubmitButton
                type="submit"
                size={"sm"}
                className="h-7 px-3"
                pending={form.formState.isSubmitting}
                render={(pending) => (pending ? "Publishing..." : "Publish")}
              />
            </div>
          </div>
        </Show>
      </form>
    </Form>
  );
}
