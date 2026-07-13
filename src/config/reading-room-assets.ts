export type ReadingRoomImage = {
  alt: string;
  height: number;
  label: string;
  src: string;
  width: number;
};

const basePath = "/images/knowles-collection/1610-geneva-bible";
const kingJames1630BasePath = "/images/knowles-collection/1630-king-james-bible";

export const readingRoomImages = {
  primary: {
    alt: "The 1610 Geneva Bible standing closed, showing the worn brown binding and central brass panel.",
    height: 1280,
    label: "Front board",
    src: `${basePath}/front-board.jpg`,
    width: 947,
  },
  supporting: [
    {
      alt: "Angled view of the closed Bible showing the front board, spine, and visible metal fittings.",
      height: 1280,
      label: "Closed volume",
      src: `${basePath}/front-board-angled.jpg`,
      width: 874,
    },
    {
      alt: "Spine view of the Bible with worn raised bands and surface wear visible.",
      height: 1280,
      label: "Spine",
      src: `${basePath}/spine-detail.jpg`,
      width: 567,
    },
    {
      alt: "Fore edge view of the closed Bible showing the page block between the boards.",
      height: 1280,
      label: "Fore edge",
      src: `${basePath}/fore-edge-overhead.jpg`,
      width: 973,
    },
  ] satisfies ReadingRoomImage[],
} as const;

export const kingJames1630Images = {
  primary: {
    alt: "The 1630 King James Bible standing closed, showing a worn brown binding with brass decoration.",
    height: 1280,
    label: "Closed volume",
    src: `${kingJames1630BasePath}/front-board.jpg`,
    width: 947,
  },
  supporting: [
    {
      alt: "Angled view of the 1630 King James Bible showing the closed front board and metal fittings.",
      height: 1280,
      label: "Front board",
      src: `${kingJames1630BasePath}/front-board-angled.jpg`,
      width: 874,
    },
    {
      alt: "Spine view of the 1630 King James Bible with raised bands and worn leather visible.",
      height: 1280,
      label: "Spine",
      src: `${kingJames1630BasePath}/spine.jpg`,
      width: 567,
    },
    {
      alt: "Fore-edge view of the 1630 King James Bible showing the page block between the boards.",
      height: 1280,
      label: "Fore edge",
      src: `${kingJames1630BasePath}/fore-edge.jpg`,
      width: 937,
    },
  ] satisfies ReadingRoomImage[],
} as const;
