import React from "react";
import { ImageDemoDefault } from "./components/atoms/Image/demo";
import { PictureDemoDefault } from "./components/atoms/Picture/demo";
import { HeroPicture } from "./components/molecules/HeroPicture";

function App() {
  return (
    <>
      <HeroPicture baseUrl="https://picsum.photos/seed/picsum" />
      {/* <ImageDemoDefault /> */}
      {/* <PictureDemoDefault /> */}
    </>
  );
}

export default App;
