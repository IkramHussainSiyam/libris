"use client";
import SettingsItem from "~/app/settings/_components/SettingsItem";
import FormItem, {
  FormRootErrorMessage,
} from "~/components/common/form/FormItem";
import DataSelect from "~/components/common/others/DataSelect";
import TextEditor from "~/components/common/others/editor";
import SubmitButton from "~/components/common/submit/SubmitButton";
import Show from "~/components/helpers/Show";
import Alert from "~/components/layout/error/Alert";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { TBook } from "~/lib/types/books.type";
import { TReview } from "~/lib/types/review.type";
import { useReviewWriter } from "../_hooks/useReviewWriter";

const ratingOptions = [
  { label: "1 out of 5", value: "1" },
  { label: "2 out of 5", value: "2" },
  { label: "3 out of 5", value: "3" },
  { label: "4 out of 5", value: "4" },
  { label: "5 out of 5", value: "5" },
];

export default function ReviewWriter({ singleBook, singleReview }: Props) {
  const { form, onSubmit, isDeleting, handleDeleteReview } = useReviewWriter({
    singleBook,
    singleReview,
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="w-full">
            <Alert
              size="sm"
              variant="warning"
              message="Review must be at least 2000 characters long."
            />
          </div>

          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem className="w-full">
                <SettingsItem heading="Score">
                  <DataSelect
                    className="bg-light dark:bg-muted hover:bg-light"
                    value={field.value}
                    onChange={field.onChange}
                    options={ratingOptions}
                  />
                </SettingsItem>
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <SettingsItem heading="Review">
                    <TextEditor
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="Here's my detailed thought about 'Atomic Habits'..."
                    />
                  </SettingsItem>
                </FormItem>
              )}
            />
          </div>

          <FormRootErrorMessage>
            {form.formState.errors.root?.message}
          </FormRootErrorMessage>

          <SubmitButton
            disabled={
              (singleReview && form.formState.isDirty === false) ||
              form.formState.isValid === false
            }
            size={"sm"}
            className="w-full"
            pending={form.formState.isSubmitting}
            render={(pending) =>
              pending
                ? singleReview !== undefined
                  ? "Updating..."
                  : "Submitting..."
                : singleReview !== undefined
                ? "Update Review"
                : "Submit Review"
            }
          />

          <Show when={singleReview !== undefined}>
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              className="w-full"
              disabled={isDeleting}
              onClick={handleDeleteReview}
            >
              {isDeleting ? "Deleting..." : "Delete Review"}
            </Button>
          </Show>
        </form>
      </Form>
    </div>
  );
}

type Props = {
  singleBook: TBook | null;
  singleReview?: TReview | null;
};
