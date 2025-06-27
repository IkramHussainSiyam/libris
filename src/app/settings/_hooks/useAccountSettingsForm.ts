import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AccountSettings } from "~/lib/db/settings/getAccountSettings.query";
import { saveAccountSettings_action } from "~/lib/db/settings/saveAccountSettings.action";
import { accountSettingsSchema } from "~/lib/types/settings.type";
import { TUser } from "~/lib/types/user.type";

export const useAccountSettingsForm = ({ settings, users }: Params) => {
  const form = useForm<z.infer<typeof accountSettingsSchema>>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      user_name: settings?.user_name ?? "",
      image: settings?.image ?? "",
      banner: settings?.banner ?? "",
      bio: settings?.bio ?? "",
      account_visibility: settings?.account_visibility ?? "public",
    },
  });

  async function saveChanges() {
    if (
      form.formState.dirtyFields.user_name &&
      isUserNameTaken(form.getValues("user_name")!)
    ) {
      return;
    }

    const res = await saveAccountSettings_action({
      data: form.getValues(),
    });

    if (res.success) {
      toast.success("Changes saved successfully");
    } else {
      console.error(res.error);
      toast.error(res.error as string);
    }

    // FIX_ME: I had to use to prevent that floating save button not hiding (currently i don't have any other solution)
    location.reload();
  }

  function handleUserName(
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldOnChage: (...event: any[]) => void
  ) {
    if (value.length > 30) {
      form.setError("user_name", {
        message: "User name can't be longer than 30 characters.",
      });
      return;
    }

    fieldOnChage(value);
    form.clearErrors("user_name");

    isUserNameTaken(value);
  }

  function isUserNameTaken(value: string) {
    const isTaken = users.some((user) => user?.user_name === value);

    if (isTaken) {
      form.setError("user_name", {
        message: "This username is already taken.",
      });
    }

    return isTaken;
  }

  return { form, saveChanges, handleUserName };
};

type Params = {
  settings: AccountSettings;
  users: TUser[];
};
