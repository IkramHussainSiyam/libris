import LoadingText from "~/components/layout/loading/LoadingText";

export default function Loading() {
  return (
    <div className="p-6 bg-light dark:bg-muted">
     <LoadingText showDots noText dotSize="8px" />
    </div>
  );
}
