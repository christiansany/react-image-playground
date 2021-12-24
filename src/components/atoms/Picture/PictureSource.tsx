import React, { FunctionComponent, SourceHTMLAttributes } from "react";
import { usePictureContext } from "./PictureContext";

export interface PictureSourceProps extends SourceHTMLAttributes<Element> {}

export const PictureSource: FunctionComponent<PictureSourceProps> = (
  attributes
) => {
  const { loadingMode, shouldDisplay } = usePictureContext();
  if (loadingMode === "lazy" && !shouldDisplay) {
    return null;
  }
  return <source {...attributes} />;
};
