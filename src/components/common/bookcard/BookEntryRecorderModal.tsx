"use client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useFavoriteBook } from "~/app/book/_hooks/useFavoriteBook";
import SettingsItem from "~/app/settings/_components/SettingsItem";
import FormItem from "~/components/common/form/FormItem";
import DataSelect from "~/components/common/others/DataSelect";
import Show from "~/components/helpers/Show";
import Alert from "~/components/layout/error/Alert";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { GeneralSettings } from "~/lib/db/settings/getGeneralSettings.query";
import { TBookEntry, TReadingStatus } from "~/lib/types/book_entry.type";
import { TBook } from "~/lib/types/books.type";
import { TCustomLists } from "~/lib/types/customlists.type";
import { cn } from "~/lib/utils/utils";
import Overlay from "../others/overlay";
import SubmitButton from "../submit/SubmitButton";
import { useBookEntryRecorderModal } from "./useBookEntryRecorderModal";

const statusOptions: { label: string; value: TReadingStatus }[] = [
  { label: "Reading", value: "reading" },
  { label: "Completed", value: "completed" },
  { label: "On-Hold", value: "on_hold" },
  { label: "Planning", value: "planning" },
  { label: "Dropped", value: "dropped" },
];

const scoreOptions = [
  { label: "None", value: "0" },
  { label: "1 out of 5", value: "1" },
  { label: "2 out of 5", value: "2" },
  { label: "3 out of 5", value: "3" },
  { label: "4 out of 5", value: "4" },
  { label: "5 out of 5", value: "5" },
];

export default function BookEntryRecorderModal({
  children,
  bookInfo,
  singleBookEntry,
  customLists,
  generalSettings,
}: Props) {
  const {
    form,
    isPending,
    isEntryExists,
    openModal,
    setOpenModal,
    handleDeleteEntry,
    handleRecordEntry,
  } = useBookEntryRecorderModal({
    bookInfo,
    singleBookEntry,
    generalSettings,
  });

  const {
    handleFavoriteButton,
    isPending: isPendingFavorite,
    optimisticFavorite,
  } = useFavoriteBook({
    bookId: bookInfo?.id ?? "",
    favored_by_user_IDs: bookInfo?.favored_by_user_IDs ?? [],
  });

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="max-w-5xl p-0 border-none sm:rounded-none"
        customCloseButton={
          <DialogClose className="[&_svg]:stroke-primary-foreground z-40" />
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRecordEntry)}>
            <DialogHeader className="space-y-0 relative">
              <div className="w-full h-32 pointer-events-none select-none overflow-hidden">
                <Image
                  className="size-full object-cover blur-lg"
                  src={bookInfo?.cover_url ?? ""}
                  alt={bookInfo?.name ?? ""}
                  width={1000}
                  height={256}
                ></Image>
              </div>
              <Overlay className="z-10 bg-black/70 flex items-end px-10 pb-3 select-text pointer-events-auto">
                <div className="w-20 h-[115px] absolute -bottom-4 left-10 z-20 shadow-lg">
                  <Image
                    className="size-full object-cover"
                    src={bookInfo?.cover_url ?? ""}
                    alt={bookInfo?.name ?? ""}
                    width={80}
                    height={115}
                  ></Image>
                </div>
                <div className="flex items-center gap-8 justify-between w-full pl-24">
                  <h4 className="text-sm text-primary-foreground line-clamp-2">
                    {bookInfo?.name}
                  </h4>
                  <div className="flex items-center gap-3">
                    <Button
                      disabled={isPendingFavorite}
                      onClick={handleFavoriteButton}
                      data-favorite={optimisticFavorite}
                      type="button"
                      variant={"outlined"}
                      size={"icon"}
                      className="size-8 border-primary-foreground/15 bg-primary-foreground/5 hover:bg-primary-foreground/10 [&_svg]:stroke-primary-foreground [&_svg]:data-[favorite=true]:fill-primary-foreground stroke-primary-foreground"
                    >
                      <Heart />
                    </Button>
                    <SubmitButton
                      disabled={isEntryExists && !form.formState.isDirty}
                      size={"sm"}
                      className="h-8 px-3"
                      pending={form.formState.isSubmitting}
                      render={(pending) => (pending ? "Saving..." : "Save")}
                    />
                  </div>
                </div>
              </Overlay>
            </DialogHeader>
            <DialogDescription>
              <Show when={isEntryExists}>
                <Alert
                  size="sm"
                  className="justify-center gap-1.5"
                  variant="success"
                  message="This book is in your library."
                />
              </Show>
              <div className="flex items-start gap-8 my-12 px-10 w-full">
                <div className="w-full grid grid-cols-3 gap-x-8 gap-y-8 flex-1">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Status"
                        >
                          <DataSelect
                            value={field.value}
                            onChange={field.onChange}
                            className="items-start"
                            options={statusOptions}
                            placeholder="Status"
                          />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Score"
                        >
                          <DataSelect
                            value={field.value?.toString()}
                            onChange={(val) => field.onChange(parseInt(val))}
                            className="items-start"
                            options={scoreOptions}
                            placeholder="Score"
                          />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Reading Progress (Pages)"
                        >
                          <Input
                            {...field}
                            onChange={(e) =>
                              bookInfo &&
                              parseInt(e.target.value) > bookInfo?.total_pages
                                ? field.onChange(bookInfo?.total_pages)
                                : field.onChange(parseInt(e.target.value))
                            }
                            min={0}
                            max={bookInfo?.total_pages}
                            type="number"
                            placeholder="Reading Progress"
                          />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Start Date"
                        >
                          <Input {...field} type="date" />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="finish_date"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Finish Date"
                        >
                          <Input {...field} type="date" />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="total_repeats"
                    render={({ field }) => (
                      <FormItem className="text-xs">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Total Repeats"
                        >
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            min={0}
                            type="number"
                            placeholder="Total Repeats"
                          />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <SettingsItem
                          headingClassName="text-xs"
                          heading="Notes"
                        >
                          <Textarea
                            {...field}
                            placeholder="Write your notes..."
                            className="bg-accent dark:bg-accent"
                          />
                        </SettingsItem>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/5 space-y-6">
                  <SettingsItem
                    headingClassName="text-xs"
                    containerClassName="space-y-2.5"
                    heading={
                      customLists && customLists?.length > 0
                        ? "Custom Lists"
                        : undefined
                    }
                  >
                    <Show when={customLists ? customLists?.length > 0 : false}>
                      <ul className="space-y-2.5 max-h-56 scroll-area">
                        {customLists?.map((list) => (
                          <FormField
                            control={form.control}
                            name="custom_list_IDs"
                            key={list.id}
                            render={({ field }) => (
                              <FormItem className="text-xs">
                                <li
                                  key={list.id}
                                  className="text-xs text-accent-foreground flex items-start gap-1.5"
                                >
                                  <Input
                                    name={field.name}
                                    checked={field.value?.includes(list.id)}
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.checked
                                          ? [...field.value!, list.id]
                                          : field.value?.filter(
                                              (id) => id !== list.id
                                            )
                                      )
                                    }
                                    id={list.id}
                                    type="checkbox"
                                    className="size-[14px]"
                                    ref={field.ref}
                                    disabled={field.disabled}
                                    onBlur={field.onBlur}
                                  />
                                  <Label htmlFor={list.id}>{list.name}</Label>
                                </li>
                              </FormItem>
                            )}
                          />
                        ))}
                      </ul>
                    </Show>
                    <FormField
                      control={form.control}
                      name="private"
                      render={({ field }) => (
                        <li
                          className={cn(
                            "text-xs text-accent-foreground flex items-center gap-1.5",
                            customLists &&
                              customLists?.length > 0 &&
                              "border-t border-border/50 pt-2.5 mt-2.5"
                          )}
                        >
                          <Input
                            name={field.name}
                            checked={field.value}
                            onChange={field.onChange}
                            type="checkbox"
                            className="size-[14px]"
                            id="privacy"
                            ref={field.ref}
                            disabled={field.disabled}
                            onBlur={field.onBlur}
                          />
                          <Label htmlFor="privacy">Private</Label>
                        </li>
                      )}
                    />
                  </SettingsItem>
                  <Show when={isEntryExists}>
                    <Button
                      onClick={handleDeleteEntry}
                      disabled={isPending}
                      type="button"
                      variant={"destructive"}
                      size={"sm"}
                      className="w-full h-7 px-3"
                    >
                      {isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </Show>
                </div>
              </div>
            </DialogDescription>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

type Props = {
  singleBookEntry: TBookEntry | null;
  bookInfo: TBook | null;
  customLists: TCustomLists[] | null;
  children: React.ReactNode;
  generalSettings: GeneralSettings;
};
