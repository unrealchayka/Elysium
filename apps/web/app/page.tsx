import { NewItemsSlider, Films, TrendingFilms } from "./features/video-preview";
import { videoData } from "./shared/constants/FakeData";
import SliderCompanies from "./widgets/sliderCompany/ui/SliderCompanies";

export default function Home() {
  const reversedList = [...videoData].reverse();
  return (
    <>
      <div className="">
        <div className="">
          <NewItemsSlider videos={videoData} />
          <SliderCompanies/>
          <div className="container px-2 md:px-0 m-auto">
            <Films className="pt-5" videos={videoData} title="Continue Watching" btnUrl="/continue-watching" />
            <Films className="pt-5" videos={reversedList} title="You Might Like" btnUrl="/you-might-like" />
          </div>
        </div>
        <TrendingFilms />
      </div>
    </>
  );
}
