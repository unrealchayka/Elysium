
import TrendingSlider from "./components/elements/videoPreview/TrendingSlider";
import VieoPreview from "./components/elements/videoPreview/Videos";
// import Palitre from "./caomponents/other/palitre";
import { videoData } from "./constants/FakeData";

export default function Home() {
  const list = Array.from({ length: 10 }, (_, i) => i + 1);
  const reversedList = [...videoData].reverse();
  return (
    <>
      <div className="">
        <TrendingSlider videos={videoData}/>
        <VieoPreview className="pt-5" videos={videoData} title="Continue Watching" btnUrl="/continue-watching"/>
        <VieoPreview className="pt-5" videos={reversedList} title="You Might Like" btnUrl="/you-might-like"/>
      </div>
      
    </>

  );
}
