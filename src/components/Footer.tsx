import Image from "next/image"

function Footer() {
  return (
    <footer
      className="animate-my-glow-combined sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap
    bg-[#161921] "
    >
      <p className="text-base font-bold text-white">@2024 ZTAI Anime</p>
      {/* <Image
        src="./logo.svg"
        alt="logo"
        width={47}
        height={44}
        className="object-contain hover:rotate-[360deg] duration-200 ease-in-out"
      /> */}
      <div className="flex items-center gap-6">
        {/* <Image
          src="./tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain w-19 h-auto "
        /> */}
        <Image
          src="./instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        {/* <Image
          src="./twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        /> */}
      </div>
    </footer>
  )
}

export default Footer
