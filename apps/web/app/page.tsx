import { NewItemsSlider, Films, TrendingFilms } from "./features/video-preview";
import { videoData } from "./shared/constants/FakeData";

export default function Home() {
  const reversedList = [...videoData].reverse();
  return (
    <>
      <div className="">
        <div className="">
          <NewItemsSlider videos={videoData} />
          <div className="container m-auto">
            <Films className="pt-5" videos={videoData} title="Continue Watching" btnUrl="/continue-watching" />
            <Films className="pt-5" videos={reversedList} title="You Might Like" btnUrl="/you-might-like" />
          </div>
        </div>
        <TrendingFilms />
      </div>
    </>
  );
}
