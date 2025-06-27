"use client";
import FormItem, {
  FormRootErrorMessage,
} from "~/components/common/form/FormItem";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAddSubjectForm } from "../_hooks/useAddSubjectForm";

export default function AddSubjectForm() {
  const { form, onSubmit, subjectToEdit, reset } = useAddSubjectForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start justify-between gap-2.5"
      >
        <div className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  {...field}
                  placeholder="Add a new subject"
                  className="bg-light dark:bg-muted"
                  autoFocus
                />
              </FormItem>
            )}
          />
          <FormRootErrorMessage>
            {form.formState.errors.root?.message}
          </FormRootErrorMessage>
        </div>
        <SubmitButton
          pending={form.formState.isSubmitting}
          render={(p) =>
            p
              ? subjectToEdit
                ? "Updating..."
                : "Adding..."
              : subjectToEdit
              ? "Update Subject"
              : "Add Subject"
          }
        />
        <Show when={form.getValues("name") !== ""}>
          <Button
            onClick={reset}
            type="button"
            className="bg-zinc-900 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-accent dark:hover:bg-zinc-50/80"
          >
            Cencel
          </Button>
        </Show>
      </form>
    </Form>
  );
}
