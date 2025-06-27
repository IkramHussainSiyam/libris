"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import FormItem, {
  FormRootErrorMessage,
} from "~/components/common/form/FormItem";
import TextEditor from "~/components/common/others/editor";
import Link from "~/components/common/others/Link";
import Select from "~/components/common/select/select";
import SubmitButton from "~/components/common/submit/SubmitButton";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { routes } from "~/lib/static-data/routes";
import { TBook } from "~/lib/types/books.type";
import { TSubject } from "~/lib/types/subjects.type";
import { useBookActionForm } from "../_hooks/useBookActionForm";

export default function BookActionForm({
  booksPromise,
  subjectsPromise,
}: Props) {
  const searchParams = useSearchParams();
  const books = use(booksPromise);
  const relatedBooks = books?.filter(
    (book) => book.id !== searchParams.get("edit-book")
  );

  const { allSubjects: subjects } = use(subjectsPromise);

  const { openModal, handleCloseModal, form, onSubmit } = useBookActionForm();

  return (
    <Dialog open={openModal} onOpenChange={handleCloseModal}>
      <Button asChild className="w-full lg:w-fit self-end [&_svg]:size-5">
        <Link href={routes.admin.books.create}>
          <Plus />
          Add Book
        </Link>
      </Button>
      <DialogContent className="px-0">
        <DialogTitle className="px-5 text-center text-xl mb-4">
          Add Book
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-5 space-y-6 max-h-[650px] scroll-area"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem label="Book Name">
                  <Input {...field} placeholder="Atomic Habits..." />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem label="Author">
                  <Input {...field} placeholder="James Clear" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover_url"
              render={({ field }) => (
                <FormItem label="Cover URL">
                  <Input
                    {...field}
                    placeholder="https://example.com/cover.jpg"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem label="Description">
                  <TextEditor
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Book description..."
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published_date"
              render={({ field }) => (
                <FormItem label="Published Date">
                  <Input {...field} type="date" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total_pages"
              render={({ field }) => (
                <FormItem label="Total Pages">
                  <Input
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > 0) {
                        form.setValue("total_pages", Number(e.target.value));
                      } else {
                        form.setValue("total_pages", 0);
                      }
                    }}
                    type="number"
                    placeholder="289"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject_IDs"
              render={({ field }) => (
                <FormItem label="Subjects">
                  <Select
                    options={
                      subjects && subjects?.length > 0
                        ? subjects?.map((s) => s.id)
                        : []
                    }
                    selected={form.watch("subject_IDs")}
                    onSelect={(selected) => {
                      form.setValue(
                        "subject_IDs",
                        field.value.includes(selected)
                          ? field.value.filter((id) => id !== selected)
                          : [...field.value, selected]
                      );
                    }}
                    onClear={() => form.setValue("subject_IDs", [])}
                    renderSelected={(selected) => `${selected.length} Selected`}
                    isSelected={(opt, selected) => selected.includes(opt)}
                    displayLabel={(id) =>
                      subjects?.find((s) => s.id === id)?.name ?? "Unknown"
                    }
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="related_book_IDs"
              render={({ field }) => (
                <FormItem label="Related Books">
                  <Select
                    options={
                      relatedBooks && relatedBooks?.length > 0
                        ? relatedBooks?.map((s) => s.id)
                        : []
                    }
                    selected={form.watch("related_book_IDs")}
                    onSelect={(selected) => {
                      form.setValue(
                        "related_book_IDs",
                        field.value?.includes(selected)
                          ? field.value.filter((id) => id !== selected)
                          : [...field.value!, selected]
                      );
                    }}
                    onClear={() => form.setValue("subject_IDs", [])}
                    renderSelected={(selected) =>
                      `${selected?.length} Selected`
                    }
                    isSelected={(opt, selected) =>
                      selected?.includes(opt) ?? false
                    }
                    displayLabel={(id) =>
                      relatedBooks?.find((s) => s.id === id)?.name ?? "Unknown"
                    }
                  />
                </FormItem>
              )}
            />
            <FormRootErrorMessage className="px-3 py-2 flex items-center justify-center bg-destructive/10">
              {form.formState.errors.root?.message}
            </FormRootErrorMessage>
            <SubmitButton
              className="w-full"
              pending={form.formState.isSubmitting}
              render={(pending) => (pending ? "Submitting..." : "Submit")}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  subjectsPromise: Promise<{ allSubjects: TSubject[] | null }>;
  booksPromise: Promise<TBook[] | null>;
};
