import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteReview_action } from "~/lib/db/reviews/deleteReview.action";
import { updateReview_action } from "~/lib/db/reviews/updateReview.action";
import { writeReview_action } from "~/lib/db/reviews/writeReview.action";
import { routes } from "~/lib/static-data/routes";
import { TBook } from "~/lib/types/books.type";
import { reviewSchema, TReview } from "~/lib/types/review.type";

const formSchema = reviewSchema
  .omit({
    score: true,
  })
  .extend({
    score: z.string(),
  });

export function useReviewWriter({ singleBook, singleReview }: Params) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      score: singleReview?.score.toString() || "5",
      content: singleReview?.content || "",
    },
  });

  async function onSubmit() {
    const data = {
      content: form.getValues("content"),
      score: Number(form.getValues("score")),
      book_ID: singleBook?.id ?? "",
    };

    if (singleReview !== undefined) {
      const res = await updateReview_action({
        reviewId: singleReview?.id ?? "",
        book_ID: data.book_ID,
        content: data.content,
        score: data.score,
      });

      if (res.success) {
        toast.success("Review updated successfully");
        route.replace(routes.review.details(res.data?.id ?? ""));
      } else {
        form.setError("root", { message: res.error as string });
        console.error(res.error);
      }
    } else {
      const res = await writeReview_action({ ...data });

      if (res.success) {
        toast.success("Review submitted successfully");
        route.replace(routes.review.details(res.data?.id ?? ""));
      } else {
        form.setError("root", { message: res.error as string });
        console.error(res.error);
      }
    }

    form.reset();
  }

  function handleDeleteReview() {
    startDeleteTransition(async () => {
      const res = await deleteReview_action({
        reviewId: singleReview?.id ?? "",
      });

      if (res.data) {
        toast.success("Review deleted successfully");
        route.replace(routes.review.list);
      } else {
        toast.error(res.error as string);
        console.error(res.error);
      }
    });
  }

  return {
    form,
    onSubmit,
    handleDeleteReview,
    isDeleting,
  };
}

type Params = {
  singleBook: TBook | null;
  singleReview?: TReview | null;
};
