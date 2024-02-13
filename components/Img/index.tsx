import React, { forwardRef } from "react";

export type ImgProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> &
  Partial<{
    className: string;
    src: string;
    alt: string;
  }>;

const Img = forwardRef<HTMLImageElement, React.PropsWithChildren<ImgProps>>(
  ({ className, src, alt, ...restProps }, ref) => {
    return (
      <img
        ref={ref}
        className={className}
        src={src || "defaultNoData.png"}
        alt={alt || "testImg"}
        {...restProps}
        loading={"lazy"}
      />
    );
  }
);
Img.displayName = "Img";

export default Img;
