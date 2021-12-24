import React from "react";
import { HeroPicture } from "./HeroPicture";

export const HeroPictureDemoDefault = () => {
  return (
    <>
      <HeroPicture baseUrl="https://picsum.photos/seed/foobar" />
      <HeroPicture baseUrl="https://picsum.photos/seed/onepiece" />
    </>
  );
};
