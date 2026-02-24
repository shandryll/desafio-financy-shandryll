// Utilitário para renderizar ícones do Lucide dinamicamente pelo nome
import * as LucideIcons from "lucide-react";
import { FC } from "react";

interface DynamicLucideIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export const DynamicLucideIcon: FC<DynamicLucideIconProps> = ({
  name,
  size = 20,
  color = "currentColor",
  className,
}) => {
  const IconComponent = (LucideIcons as any)[
    name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
  ];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} />;
};
