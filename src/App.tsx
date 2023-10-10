import { useEffect, useState } from "react";
// import { useMotionValueEvent, useScroll } from "framer-motion";
import { scroll } from "framer-motion/dom";
import "./App.css";
import { Buttons } from "./components/buttons";

type ImageType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const API_URL = "https://picsum.photos/v2/list";
const SCROLL_THRESHOLD = 0.8;

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<string | null>(null);
  // const [limit, setLimit] = useState<number>(10);

  scroll((progress) => {
    if (progress >= SCROLL_THRESHOLD && !isLoading) {
      fetchImages({ page: page + 1 });
    }
  });

  const fetchImages = async ({ page }: { page: number }) => {
    setLoading(true);
    const response = await fetch(`${API_URL}?limit=100&page=${page}`);
    const data = await response.json();
    setImages([...images, ...data]);
    setPage(page);
    setLoading(false);
  };

  const handleOpenImage = (url: string) => {
    setOpenImage(url);
  };

  useEffect(() => {
    fetchImages({
      page: 1,
    });
  }, []);

  return (
    <div className="App">
      <div className="flex flex-row flex-wrap">
        {images.map((image, i) => (
          <div
            key={image.id + i}
            className="cursor-zoom-in"
            onClick={() => handleOpenImage(image.download_url)}
          >
            <img
              src={image.download_url}
              alt={image.author}
              className="w-40 h-40"
            />
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : null}
      {openImage ? (
        <div className="absolute top-0 left-0 h-full w-full bg-black/60 flex justify-center items-center">
          <div className="w-[600px] w-[600px] relative">
            <div className="absolute top-0 w-full flex justify-between p-4">
              <Buttons icon="X" setOpenImage={setOpenImage} />
              <div className="flex flex-row">
                <Buttons icon="Share" setOpenImage={setOpenImage} />
                <Buttons icon="Download" setOpenImage={setOpenImage} />
              </div>
            </div>
            <img src={openImage} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
