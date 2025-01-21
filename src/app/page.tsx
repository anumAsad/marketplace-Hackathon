'use client';
import { useEffect} from "react";
import Hero from "./components/Hero";
import AOS from "aos"
import "aos/dist/aos.css"
import DressStyle from "./components/DressStyle";
import TopSelling from "./components/TopSelling";
import Reviews from "./components/Reviews";
import NewArrivals from "./components/NewArrivals";



export default function Home() {
 

  useEffect(() => {
    

  
    AOS.init({
      easing:"ease-out-back",
      duration: 1200,
      delay: 100,
      mirror:true,
      anchorPlacement:"bottom-bottom",
      offset:160,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Hero />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <Reviews />
   
    </div>
  );
}
