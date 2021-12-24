import React, { FunctionComponent, HTMLAttributes, useMemo } from "react";
import { PictureImage } from "./PictureImage";
import type { PictureImageProps } from "./PictureImage";
import { PictureSource } from "./PictureSource";
import type { PictureSourceProps } from "./PictureSource";
import { PictureContext } from "./PictureContext";
import type { LoadingMode, IPictureContext } from "./PictureContext";
import { useInView } from "../hooks";

interface IPictureProps extends HTMLAttributes<HTMLElement> {
  loading?: LoadingMode;
  important?: boolean; // TODO: Should add prefetch hint to the head
  aspectRatio?: number; // TODO: Should css styles to force certain aspectRatio of wrapper
}

interface IPictureComposition {
  Source: FunctionComponent<PictureSourceProps>;
  Image: FunctionComponent<PictureImageProps>;
}

const Picture: FunctionComponent<IPictureProps> & IPictureComposition = ({
  loading = "eager",
  children,
  ...others
}) => {
  const { ref, isInView } = useInView({
    skip: loading === "eager",
    once: true,
  });

  const value = useMemo<IPictureContext>(
    () => ({
      loadingMode: loading,
      shouldDisplay: isInView,
    }),
    [isInView, loading]
  );

  return (
    <PictureContext.Provider value={value}>
      <picture ref={ref} {...others}>
        {children}
      </picture>
    </PictureContext.Provider>
  );
};

Picture.Source = PictureSource;
Picture.Image = PictureImage;

export default Picture;
