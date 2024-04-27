import { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  style,
  onClick,
  type,
}) => {
  return (
    <button type={type} className={className} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
