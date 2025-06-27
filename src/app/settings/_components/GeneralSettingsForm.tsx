"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormItem from "~/components/common/form/FormItem";
import DataSelect from "~/components/common/others/DataSelect";
import { Form, FormField } from "~/components/ui/form";
import { GeneralSettings } from "~/lib/db/settings/getGeneralSettings.query";
import { saveGeneralSettings_action } from "~/lib/db/settings/saveGeneralSettings.action";
import { generalSettingsSchema as formSchema } from "~/lib/types/settings.type";
import SaveSettingsButton from "../account/_components/SaveSettingsButton";
import SettingsItem from "./SettingsItem";

export default function GeneralSettingsForm({ generalSettingsPromise }: Props) {
  const generalSettings = use(generalSettingsPromise);

  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      default_feed_tab: generalSettings?.default_feed_tab ?? "global",
      default_bookEntry_status:
        generalSettings?.default_bookEntry_status ?? "planning",
      default_explore_order:
        generalSettings?.default_explore_order ?? "acsending",
    },
  });

  async function saveChanges() {
    const res = await saveGeneralSettings_action({ data: form.getValues() });

    if (res.success) {
      toast.success("Settings updated successfully");
    } else {
      console.error(res.error);
      toast.error(res.error as string);
    }

    route.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(saveChanges)} className="space-y-8">
        <SaveSettingsButton
          isSettingsChanged={form.formState.isDirty}
          isSubmitting={form.formState.isSubmitting}
          onReset={() => form.reset()}
        />

        <FormField
          control={form.control}
          name="default_feed_tab"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Activity Default Tab">
                <DataSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Following", value: "following" },
                    { label: "Global", value: "global" },
                  ]}
                />
              </SettingsItem>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default_bookEntry_status"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Default Book Entry Status">
                <DataSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Planning", value: "planning" },
                    { label: "Reading", value: "reading" },
                    { label: "Completed", value: "completed" },
                    { label: "On hold", value: "on_hold" },
                  ]}
                />
              </SettingsItem>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default_explore_order"
          render={({ field }) => (
            <FormItem>
              <SettingsItem heading="Default Explorer Order">
                <DataSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Oldest", value: "oldest" },
                    { label: "Newest", value: "newest" },
                    { label: "Acsending", value: "acsending" },
                    { label: "Decsending", value: "decsending" },
                  ]}
                />
              </SettingsItem>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

type Props = {
  generalSettingsPromise: Promise<GeneralSettings>;
};
