import React, { FunctionComponent, ImgHTMLAttributes } from "react";
import { useInView } from "../hooks";

export interface ImageProps extends ImgHTMLAttributes<Element> {
  loading?: "lazy" | "eager";
  important?: boolean; // TODO: Should add prefetch hint to the head
  aspectRatio?: number; // TODO: Should css styles to force certain aspectRatio of wrapper
}

export const Image: FunctionComponent<ImageProps> = ({
  loading = "eager",
  ...others
}) => {
  const { ref, isInView } = useInView({
    skip: loading === "eager",
    once: true,
  });

  if (loading === "lazy" && !isInView) {
    return (
      <>
        <img
          ref={ref}
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt={others.alt || ""}
        />
        <noscript>
          <img {...others} />
        </noscript>
      </>
    );
  }
  return <img ref={ref} {...others} />;
};
