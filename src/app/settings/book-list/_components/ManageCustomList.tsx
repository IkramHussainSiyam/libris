"use client";
import FormItem from "~/components/common/form/FormItem";
import EmptyMessage from "~/components/common/others/EmptyMessage";
import SubmitButton from "~/components/common/submit/SubmitButton";
import For from "~/components/helpers/For";
import If from "~/components/helpers/If";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TCustomLists } from "~/lib/types/customlists.type";
import ListItem from "../../_components/ListItem";
import SettingsItem from "../../_components/SettingsItem";
import { useManageCustomlist } from "../_hooks/useManageCustomlist";

export default function ManageCustomList({ customListsPromise }: Props) {
  const { customLists, form, listToEdit, handleListSubmit } =
    useManageCustomlist({ customListsPromise });

  return (
    <SettingsItem heading="Custom Lists" className="space-y-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleListSubmit)}
          className="flex items-start gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  {...field}
                  placeholder="e.g. Productivity Booklist"
                  className="bg-accent dark:bg-accent"
                ></Input>
              </FormItem>
            )}
          />
          <SubmitButton
            pending={form.formState.isSubmitting}
            render={(pending) =>
              pending
                ? listToEdit !== null
                  ? "Updating..."
                  : "Adding..."
                : listToEdit !== null
                ? "Update"
                : "Add"
            }
          />
        </form>
      </Form>
      <If
        condition={customLists ? customLists?.length > 0 : false}
        then={
          <div className="space-y-3 max-h-72 scroll-area">
            <For
              each={customLists ?? []}
              render={(list) => <ListItem key={list.id} customList={list} />}
            />
          </div>
        }
        otherwise={<EmptyMessage>You have no custom lists</EmptyMessage>}
      />
    </SettingsItem>
  );
}

type Props = {
  customListsPromise: Promise<TCustomLists[] | null>;
};
