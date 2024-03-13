import Image from "next/image"
import { MotionH1 } from "./MotionH1"
import { MotionDiv } from "./Motion"
import { useRef } from "react"
import { TextReveal } from "./TextReveal"
import { TextReveal2 } from "./TextReveal2"
import { TextReveal3 } from "./TextReveal3"
import { TextReveal4 } from "./TextReveal4"
import { MotionImage } from "./MotionImage"

function Hero() {
  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        <div>
          <Image
            src="./logo.svg"
            alt="logo"
            width={101}
            height={101}
            className="object-contain   hover:rotate-[360deg] duration-200 ease-in-out animate"
          />
        </div>

        <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
          <TextReveal>
            <div>Explore The</div>
          </TextReveal>
          <TextReveal2>
            <div>Diverse</div>
          </TextReveal2>
          <TextReveal3>
            <div>Realms of</div>
          </TextReveal3>
          <TextReveal4>
            <div>Anime Magic</div>
          </TextReveal4>
        </h1>
      </div>

      <div className="lg:flex-1 relative w-full h-[50vh] justify-center">
        <Image
          src="/anime.png"
          alt="anime"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
          fill
          className="object-contain hover:scale-110 ease-in-out transition-all animate-bouncing"
        />
      </div>
    </header>
  )
}

export default Hero
