import React, { useContext } from "react";

export type LoadingMode = "lazy" | "eager";

export interface IPictureContext {
  loadingMode: LoadingMode;
  shouldDisplay: boolean;
}

export const PictureContext = React.createContext<IPictureContext | null>(null);

export const usePictureContext = () => {
  const context = useContext(PictureContext);
  if (!context) {
    throw new Error("PictureContext is not provided");
  }
  return context;
};
