import type { LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

type CategoryIconsProps = LucideProps & {
  icon?: string | null;
};

type IconName = keyof typeof Icons;

export function CategoryIcons({ icon, ...props }: CategoryIconsProps) {
  if (!icon) return null;
  const iconPascalCase = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const Icon = Icons[iconPascalCase as IconName] as
    | React.ComponentType<LucideProps>
    | undefined;

  if (!Icon) return null;

  return <Icon {...props} />;
}
