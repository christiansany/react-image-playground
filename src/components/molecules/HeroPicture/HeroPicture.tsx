import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Picture } from "../../atoms/Picture/index";

const breakpoints = {
  xs: 0,
  md: 992,
  lg: 1200,
  xl: 1400,
};

const breakpointIds = ["xs", "md", "lg", "xl"];

const containerGutters = {
  xs: 16,
  md: 32,
  lg: 32,
  xl: 32,
};

const gutters = {
  xs: 16,
  md: 32,
  lg: 32,
  xl: 32,
};

const mainContainerWidth = {
  xs: "100%",
  md: "",
  lg: "",
  xl: "",
};

interface IUsePictureSourcesProps {
  displayArea: "main";
  sources: any[];
}

const usePictureSources = (config: IUsePictureSourcesProps) => {};

interface IHeroPictureProps {
  baseUrl: string;
}

/**
 * 16px gutter
 * 32px gutter @ 992px
 *
 *
 *
 * 1400px ->828
 * 1200px -> 708
 * 992px -> 732
 * 100%
 */

const Main = styled.div`
  padding: 0 16px;
  width: 100%;

  // md
  @media (min-width: 992px) {
    padding: 0 32px;
    width: 732px;
  }

  // lg
  @media (min-width: 1200px) {
    width: 708px;
  }

  // xl
  @media (min-width: 1400px) {
    width: 828px;
  }
`;

const intrinsicImageSizes = [
  50, 100, 150, 200, 300, 400, 500, 600, 800, 1000, 1200, 1400, 1600, 2000,
  2400,
] as const;

interface IUsePictureSourceOptions {
  ratio: [number, number];
  sizes: any; // TODO
  minImageWidth: number;
  maxImageWidth: number;
  // crop?: boolean; // TODO: Crapstrategy???
  // pixelDensitySupported: number;
}

// TODO: useMemo here
const usePictureSource = (
  url: string,
  { maxImageWidth, minImageWidth, ratio }: IUsePictureSourceOptions
) => {
  const widths = intrinsicImageSizes.filter(
    (width) => width >= minImageWidth && width <= maxImageWidth
  );

  return widths
    .map((width) => {
      const height = (width / ratio[0]) * ratio[1];
      return `${url}/${width}/${height} ${width}w`;
    })
    .join(",");
};

export const HeroPicture: FunctionComponent<IHeroPictureProps> = ({
  baseUrl,
}) => {
  const tabletSourceSet = usePictureSource(baseUrl, {
    ratio: [2, 3],
    sizes: "(min-width: 1000px) 200px, 150px",
    minImageWidth: 150,
    maxImageWidth: 200 * 3,
  });

  const mobileSourceSet = usePictureSource(baseUrl, {
    ratio: [1, 1],
    sizes: "(min-width: 1000px) 100px, 50px",
    minImageWidth: 50,
    maxImageWidth: 100 * 3,
  });

  return (
    <Main>
      <HeroPictureWrapper>
        <StyledPicture>
          {/* Aspect Ratio 2:3*/}
          <Picture.Source
            media="(min-width: 500px)"
            srcSet={tabletSourceSet}
            sizes="(min-width: 1000px) 200px, 150px"
          />
          {/* Aspect Ratio 1:1 */}
          <Picture.Source
            srcSet={mobileSourceSet}
            sizes="(min-width: 400px) 100px, 50px"
          />
          <Picture.Image
            src="https://picsum.photos/seed/picsum/200/300"
            alt="picsum seed"
            onLoad={() => console.log("loaded: picsum")}
          />
        </StyledPicture>
      </HeroPictureWrapper>
    </Main>
  );
};

const StyledPicture = styled(Picture)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const HeroPictureWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 50px;

  @media (min-width: 400px) {
    width: 100px;
  }
  @media (min-width: 500px) {
    width: 150px;
  }
  @media (min-width: 1000px) {
    width: 200px;
  }

  &::before {
    display: block;
    content: " ";
    padding-top: 100%;

    @media (min-width: 500px) {
      padding-top: 150%;
    }
  }
`;
