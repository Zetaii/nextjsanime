import Image from "next/image"
import Link from "next/link"

function Navbar() {
  return (
    <nav className="m:px-16 text-xl font-bold py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <h1 className="text-2xl font-extrabold">
        <div className="flex justify-center">
          <img
            className="hover:rotate-[360deg] duration-200 ease-in-out"
            src="./logo.svg"
          ></img>
          <h1 className="ml-2 mt-1 text-4xl font-extrabold">ZTAI</h1>
        </div>
      </h1>
      <Link className="hover:text-black" href="/">
        Home
      </Link>
      <Link className="hover:text-black" href="watchlist">
        Watchlist
      </Link>
      <Link className="hover:text-black" href="About">
        About
      </Link>
      <div className="flex items-center gap-6">
        <Image
          src="./tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="./instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Image
          src="./twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
      </div>
    </nav>
  )
}

export default Navbar
