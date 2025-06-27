"use client";
import FormItem from "~/components/common/form/FormItem";
import TextEditor from "~/components/common/others/editor";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { TActivity, TActivityComment } from "~/lib/types/activity.type";
import { useCommentWriter } from "../../_hooks/useCommentWriter";

export default function CommentWriter({
  activity,
  commentToEdit,
}: {
  activity?: TActivity | null;
  commentToEdit?: TActivityComment | null;
}) {
  const { form, onSubmit, reset } = useCommentWriter({
    activity,
    commentToEdit,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <TextEditor
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                id={field.name}
                placeholder="Write a comment..."
              />
            </FormItem>
          )}
        />
        <Show when={form.formState.isDirty}>
          <div className="flex items-center gap-2 justify-between">
            <div></div>
            <div className="flex items-center gap-2">
              <Button
                onClick={reset}
                type="button"
                variant={"outlined"}
                size={"sm"}
                className="border-none"
              >
                Cencel
              </Button>
              <SubmitButton
                size={"sm"}
                pending={form.formState.isSubmitting}
                render={(pending) => (pending ? "Posting..." : "Post")}
              />
            </div>
          </div>
        </Show>
      </form>
    </Form>
  );
}
