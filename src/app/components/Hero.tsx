import Image from "next/image";
import Heroo from "../../../public/hero.png";

const Hero = () => {
  return (
    <div className="relative w-full h-screen " data-aos="zoom-out-down">
         
      {/* Background Image */}
      <Image
        src={Heroo}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        priority
      />

      {/* Floating Symbol */}
      <div className="absolute top-10 right-10 text-black text-4xl md:text-6xl lg:text-9xl">
        ✦
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center lg:items-start lg:text-left px-4 sm:px-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
          Find Clothes That <br className="hidden md:block" /> Match Your Style
        </h1>
        {/* Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg lg:max-w-2xl">
          Browse through our diverse range of meticulously crafted garments
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        {/* Button */}
        <button className="mt-6 bg-black text-white text-sm sm:text-base md:text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
