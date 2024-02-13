import React from "react";

const shapes = {
  circle: "rounded-[50%]",
  square: "rounded-none",
  round: "rounded-lg",
} as const;
const variants = {
  gradient: {
    pink_600_01_purple_800_02: "bg-gradient  text-white-A700",
    pink_600_purple_800: "bg-gradient1 text-white-A700",
  },
  fill: {
    white_A700: "bg-white-A700 shadow-bs text-blue_gray-800_01",
    blue_gray_100_19: "bg-blue_gray-100_19 text-blue_gray-800",
    teal_100: "bg-teal-100",
    indigo_400_6b: "bg-indigo-400_6b",
    blue_gray_100_3f: "bg-blue_gray-100_3f text-blue_gray-800_7f",
    gray_50: "bg-gray-50 text-blue_gray-900_02",
  },
  outline: {
    blue_gray_800_7f:
      "outline outline-[0.5px] outline-blue_gray-800_7f text-blue_gray-800_7f",
    pink_600_purple_800:
      "outline outline-[0.5px] pink_600_purple_800_border text-gray-800",
    pink_600_01_purple_800_02:
      "bg-gradient  border border-solid pink_600_01_purple_800_02_border shadow-bs text-white-A700",
  },
} as const;
const sizes = { xs: "p-0.5", sm: "p-2", md: "p-3", lg: "p-[15px]" } as const;

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
