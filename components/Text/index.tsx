import React, {forwardRef} from "react";

const sizeClasses = {
  txtIBMPlexSansArabicRegular16Bluegray50: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium16Bluegray100: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold19: "font-ibmplexsansarabic font-semibold",
  txtInterSemiBold24: "font-inter font-semibold",
  txtIBMPlexSansArabicSemiBold16: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicSemiBold48Gray90001:
    "font-ibmplexsansarabic font-semibold",
  txtAbelRegular16: "font-abel font-normal",
  txtIBMPlexSansSemiBold18Purple800: "font-ibmplexsans font-semibold",
  txtIBMPlexSansArabicSemiBold16Indigo400:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicRegular20Bluegray500:
    "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansArabicSemiBold60: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansMedium16Gray800: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold20Black900:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicSemiBold23: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansMedium16Bluegray1007f: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold24: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicSemiBold16Bluegray50:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansSemiBold18Gray800: "font-ibmplexsans font-semibold",
  txtIBMPlexSansArabicSemiBold20: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicMedium18: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansArabicMedium16: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansArabicSemiBold20Bluegray50:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicMedium14: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansArabicMedium12: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansMedium16WhiteA700: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicRegular16Bluegray300:
    "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium16Bluegray800bf: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicRegular20: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium14Pink600: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicRegular16Gray90044: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansArabicSemiBold33: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicMedium20: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansMedium14Bluegray8007f: "font-ibmplexsans font-medium",
  txtIBMPlexSansMedium16Pink600: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold30: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicRegular14Bluegray500:
    "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium22: "font-ibmplexsans font-medium",
  txtIBMPlexSansMedium14Deeppurple8007f: "font-ibmplexsans font-medium",
  txtIBMPlexSansMedium16Deeppurple800: "font-ibmplexsans font-medium",
  txtIBMPlexSansMedium16Bluegray800: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold36: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansMedium14Deeppurple800: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicMedium24: "font-ibmplexsansarabic font-medium",
  txtIBMPlexSansSemiBold32: "font-ibmplexsans font-semibold",
  txtIBMPlexSansArabicRegular16WhiteA700: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansArabicRegular16: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansArabicRegular14: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium16: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold1425: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicRegular12: "font-ibmplexsansarabic font-normal",
  txtIBMPlexSansMedium14: "font-ibmplexsans font-medium",
  txtIBMPlexSansArabicSemiBold16WhiteA700:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansSemiBold18Bluegray800bf: "font-ibmplexsans font-semibold",
  txtIBMPlexSansMedium11: "font-ibmplexsans font-medium",
  txtIBMPlexSansSemiBold28: "font-ibmplexsans font-semibold",
  txtIBMPlexSansArabicSemiBold48: "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansArabicSemiBold16Bluegray300:
    "font-ibmplexsansarabic font-semibold",
  txtIBMPlexSansSemiBold18: "font-ibmplexsans font-semibold",
  txtIBMPlexSansSemiBold18Bluegray1007f: "font-ibmplexsans font-semibold",
  txtIBMPlexSansArabicRegular20Bluegray50: "font-ibmplexsansarabic font-normal",
} as const;

export type TextProps = Partial<{
  className: string;
  size: keyof typeof sizeClasses;
  as: any;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text = forwardRef<HTMLElement, React.PropsWithChildren<TextProps>>(
  ({ children, className = "", size, as, ...restProps }, ref) => {
    const Component = as || "p";

    return (
      <Component
        ref={ref}
        className={`text-left ${className} ${size && sizeClasses[size]}`}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

export default Text;
