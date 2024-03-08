import Link from "next/link"
import { getServerSideUser } from "../lib/payload-utils"
import { cookies } from "next/headers"
import { buttonVariants } from "./ui/button"
import UserAccountNav from "./UserAccountNav"
import "./Styles.css"

const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <nav className="navbar">
      <h1 className="text-2xl font-extrabold">
        <div className="flex justify-center">
          <Link className="hover:text-black flex " href="/">
            <img
              className="hover:rotate-[360deg] duration-200 ease-in-out"
              src="./logo.svg"
              alt="logo"
              width={50}
              height={50}
            ></img>
            <h1 className="ml-2 mt-1 text-4xl font-extrabold">ZTAI</h1>
          </Link>
        </div>
      </h1>
      <Link
        className="font-bold text-lg hover:text-black hover:bg-white p-2 rounded-md "
        href="/"
      >
        Home
      </Link>
      <Link
        className="font-bold text-lg hover:text-black hover:bg-white p-2 rounded-md"
        href="watchlist"
      >
        Watchlist
      </Link>
      <Link
        className="font-bold text-lg hover:text-black hover:bg-white p-2 rounded-md"
        href="About"
      >
        About
      </Link>
      <div className="flex items-center gap-6">
        {user ? (
          <UserAccountNav user={{ ...user, collection: "" }} />
        ) : (
          <Link
            href="/sign-in"
            className={`${buttonVariants({
              variant: "ghost",
            })} text-xl  hover:text-black`}
          >
            Sign in{" "}
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
