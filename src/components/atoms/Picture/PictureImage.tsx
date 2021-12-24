import React, { FunctionComponent, ImgHTMLAttributes } from "react";
import { usePictureContext } from "./PictureContext";

export interface PictureImageProps extends ImgHTMLAttributes<Element> {}

export const PictureImage: FunctionComponent<PictureImageProps> = (
  attributes
) => {
  const { loadingMode, shouldDisplay } = usePictureContext();
  if (loadingMode === "lazy" && !shouldDisplay) {
    return (
      <>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt={attributes.alt || ""}
        />
        <noscript>
          <img {...attributes} />
        </noscript>
      </>
    );
  }
  return <img {...attributes} />;
};
