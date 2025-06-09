import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
// import AppDownload from "@/components/AppDownload";
import Tracking from "../components/Tracking";
import Newsletter from "@/components/NewsLetter";
// import Testing from "../components/test";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [category, setCategory] = useState("all");

  return (
    <>
      <div className="xl:max-w-[ w-full mx-auto">
        <Hero />
        {/* <div className="h-[100px]"></div> */}
        <ExploreMenu category={category} setCategory={setCategory} />
        {/* <Testing /> */}
        <FoodDisplay category={category} />
        <Tracking />

        <Newsletter />
        {/* <AppDownload /> */}
      </div>
    </>
  );
};

export default Home;
