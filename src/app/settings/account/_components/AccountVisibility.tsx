"use client";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function AccountVisibility({
  value,
  onValueChange,
  ...props
}: Props) {
  return (
    <RadioGroup
      {...props}
      className="gap-5"
      value={value}
      onValueChange={onValueChange}
    >
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value="private"
          id={`private`}
          aria-describedby={`private-description`}
        />
        <div className="grow">
          <div className="grid grow gap-2">
            <Label htmlFor={`private`} className="text-foreground/70">
              Private
            </Label>
            <p
              id={`private-description`}
              className="text-accent-foreground text-xs"
            >
              Only me & my followers can view my profile, lists, and activity.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RadioGroupItem
          value="public"
          id={`public`}
          aria-describedby={`public-description`}
        />
        <div className="grow">
          <div className="grid grow gap-2">
            <Label htmlFor={`public`} className="text-foreground/70">
              Public
            </Label>
            <p
              id={`public-description`}
              className="text-accent-foreground text-xs"
            >
              Everyone can view my profile, lists, and activity.
            </p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
}

type Props = {
  value?: "public" | "private";
  onValueChange?: RadioGroupProps["onValueChange"];
} & React.ComponentProps<typeof RadioGroup>;
