type ForProps<T> = {
  each: T[];
  render: (item: T, index: number) => React.ReactNode;
};

/**
 * @example
 * <For each={todos} render={(todo) => <div key={todo.id}>{todo.title}</div>} />
 */

export default function For<T>({ each, render }: ForProps<T>) {
  return <>{each.map(render)}</>;
}
