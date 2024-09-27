import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "@/components/AppDownload";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [category, setCategory] = useState("all");
  return (
    <>
      <div className="xl:max-w-[1280px] w-full mx-auto">
        <Hero />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
      </div>
    </>
  );
};

export default Home;
