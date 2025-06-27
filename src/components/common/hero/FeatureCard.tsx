import Card from "../card/Card";

export default function FeatureCard({
  imgSrc,
  imgAlt,
  title,
  description,
}: FeatureProps) {
  return (
    <Card.Root className="flex items-start lg:items-center gap-6 bg-transparent dark:bg-transparent">
      <Card.Image
        className="w-20"
        src={imgSrc}
        alt={imgAlt}
        width={300}
        height={300}
      />

      <Card.Content className="space-y-1 flex-1 p-0">
        <Card.Title
          asChild
          className="text-lg font-medium text-primary-foreground"
        >
          <h5>{title}</h5>
        </Card.Title>
        <Card.Description className="text-sm text-secondary-foreground">
          {description}
        </Card.Description>
      </Card.Content>
    </Card.Root>
  );
}

type FeatureProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
};
