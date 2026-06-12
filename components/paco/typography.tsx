import { Text, type TextProps } from "react-native";
import { textClass, type TextRole } from "@/theme/typography";

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

type PacoTextProps = Omit<TextProps, "role"> & {
  variant?: TextRole;
  className?: string;
};

/** Texto con rol tipográfico del sistema neogrotesco Paco */
export function PacoText({ variant = "body", className, children, ...props }: PacoTextProps) {
  return (
    <Text className={cn(textClass[variant], className)} {...props}>
      {children}
    </Text>
  );
}
