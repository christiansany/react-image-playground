import React from "react";
import { Picture } from "./";

export const PictureDemoDefault = () => {
  return (
    <>
      <Picture loading="lazy">
        <Picture.Source
          media="(min-width: 500px)"
          srcSet={[
            "https://picsum.photos/seed/picsum/50/75 200w",
            "https://picsum.photos/seed/picsum/100/150 200w",
            "https://picsum.photos/seed/picsum/200/300 200w",
            "https://picsum.photos/seed/picsum/400/600 400w",
            "https://picsum.photos/seed/picsum/600/900 900w",
          ].join(",")}
          sizes="(min-width: 1000px) 200px, 150px"
        />
        <Picture.Source
          srcSet={[
            "https://picsum.photos/seed/picsum/50/50 200w",
            "https://picsum.photos/seed/picsum/100/100 200w",
            "https://picsum.photos/seed/picsum/200/200 200w",
            "https://picsum.photos/seed/picsum/400/400 400w",
            "https://picsum.photos/seed/picsum/600/600 900w",
          ].join(",")}
          sizes="(min-width: 400px) 100px, 50px"
        />
        <Picture.Image
          src="https://picsum.photos/seed/picsum/200/300"
          alt="picsum seed"
          onLoad={() => console.log("loaded: picsum")}
        />
      </Picture>

      {/* Two screens whitespace to test lazyloading */}
      <div className="h-screen" />
      <div className="h-screen" />

      <Picture loading="lazy">
        <Picture.Source
          srcSet={[
            "https://picsum.photos/seed/digiduke/1000 1000w",
            "https://picsum.photos/seed/digiduke/1500 1500w",
            "https://picsum.photos/seed/digiduke/2000 2000w",
            "https://picsum.photos/seed/digiduke/2500 2500w",
          ].join(",")}
          sizes={[
            "(min-width: 1500px) 1500px",
            "(min-width: 1000px) 1000px",
            "500px",
          ].join(",")}
        />
        <Picture.Image
          src="https://picsum.photos/seed/digiduke/1000"
          alt="digiduke seed"
          onLoad={() => console.log("loaded: digiduke")}
        />
      </Picture>
    </>
  );
};
