"use client";
import { use } from "react";
import FormItem from "~/components/common/form/FormItem";
import TextEditor from "~/components/common/others/editor";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AccountSettings } from "~/lib/db/settings/getAccountSettings.query";
import { TUser } from "~/lib/types/user.type";
import SettingsItem from "../../_components/SettingsItem";
import { useAccountSettingsForm } from "../../_hooks/useAccountSettingsForm";
import AccountVisibility from "./AccountVisibility";
import SaveSettingsButton from "./SaveSettingsButton";

export default function AccountSettingsForm({
  accountSettingsPromise,
  allUsersPromise,
}: Props) {
  const settings = use(accountSettingsPromise);
  const { allUsers: users } = use(allUsersPromise);

  const { form, saveChanges, handleUserName } = useAccountSettingsForm({
    settings,
    users,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveChanges)} className="space-y-6">
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="User Name">
                <div className="w-full relative">
                  <Input
                    {...field}
                    onChange={(e) =>
                      handleUserName(e.target.value, field.onChange)
                    }
                    placeholder="john_doe"
                    className="bg-accent dark:bg-accent"
                  />
                  <div
                    data-error={
                      form.formState.errors.user_name?.message !== undefined
                    }
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-accent-foreground text-sm data-[error=true]:text-destructive"
                  >
                    {form.watch("user_name")?.length}/30
                  </div>
                </div>
              </SettingsItem>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Avatar">
                <Input
                  {...field}
                  placeholder="https://photos.google.com/..."
                  className="bg-accent dark:bg-accent"
                />
              </SettingsItem>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Banner">
                <Input
                  {...field}
                  placeholder="https://photos.google.com/..."
                  className="bg-accent dark:bg-accent"
                />
              </SettingsItem>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="About / Bio">
                <TextEditor
                  className="theme-accent"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your bio..."
                />
              </SettingsItem>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account_visibility"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Account Visibility" className="space-y-3">
                <AccountVisibility
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </SettingsItem>
            </FormItem>
          )}
        />

        <SaveSettingsButton
          isSettingsChanged={form.formState.isDirty}
          isSubmitting={form.formState.isSubmitting}
          onReset={() => form.reset()}
        />
      </form>
    </Form>
  );
}

type Props = {
  accountSettingsPromise: Promise<AccountSettings | null>;
  allUsersPromise: Promise<{ allUsers: TUser[] }>;
};
