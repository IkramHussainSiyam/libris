type IfProps = {
  condition: boolean;
  then: React.ReactNode;
  otherwise?: React.ReactNode;
};

/**
 * @example
 * <If condition={isAuthenticated} then={<div>Authenticated</div>} otherwise={<div>Not authenticated</div>} />
 */

export default function If({ condition, then, otherwise = null }: IfProps) {
  return <>{condition ? then : otherwise}</>;
}
