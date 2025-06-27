export default function GroupItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h5 className="text-sm text-foreground/70">{title}</h5>
      {children}
    </div>
  );
}
