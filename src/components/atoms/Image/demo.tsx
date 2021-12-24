import React from "react";
import { Image } from ".";

export const ImageDemoDefault = () => {
  return (
    <>
      <Image
        loading="lazy"
        src="https://picsum.photos/seed/habibi/1000"
        alt="habibi seed"
        onLoad={() => console.log("loaded: habibi")}
      />

      {/* Two screens whitespace to test lazyloading */}
      <div className="h-screen" />
      <div className="h-screen" />

      <Image
        loading="lazy"
        src="https://picsum.photos/seed/foobar/1000"
        alt="foobar seed"
        onLoad={() => console.log("loaded: foobar")}
      />
    </>
  );
};
