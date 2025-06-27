type ShowProps = {
  when: boolean;
  children: React.ReactNode;
};

/**
 * @example
 * <Show when={!isAuthenticated}><Alert message="You are not logged in" /></Show>
 */

export default function Show({ when, children }: ShowProps) {
  return <>{when ? children : null}</>;
}
