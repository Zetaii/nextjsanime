import Link from "next/link"
import { getServerSideUser } from "../lib/payload-utils"
import { cookies } from "next/headers"
import { buttonVariants } from "./ui/button"
import UserAccountNav from "./UserAccountNav"
import Image from "next/image"
import { motion } from "framer-motion"
import { MotionLink } from "./MotionLink"
import { MotionDiv } from "./Motion"
import { MotionNav } from "./MotionNav"

const Navbar = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <>
      (
      <MotionNav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: -10, opacity: 1 }}
        transition={{ type: "teen", duration: 0.3 }}
      >
        <nav
          className="m:px-16 text-xl font-bold py-4 px-8 flex justify-between items-center gap-2
    flex-wrap bg-[#161921] text-white border-b border-l-2 border-r-2  rounded
    "
        >
          <h1 className="text-2xl font-extrabold">
            <MotionDiv
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 3,
                delay: 0.5,
              }}
              whileHover={{ scale: 1.3 }}
            >
              <div className="flex justify-center">
                <Link className="hover:text-black flex " href="/">
                  <Image src="./logo.svg" alt="logo" width={50} height={50} />

                  <h1 className="ml-2 mt-1 text-4xl font-extrabold">ZTAI</h1>
                </Link>
              </div>
            </MotionDiv>
          </h1>
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              delay: 0.5,
              duration: 0.8,
            }}
          >
            <div>
              <MotionDiv
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.3 }}
              >
                <div>
                  <Link className="font-bold text-lg  p-2 rounded-md " href="/">
                    Home
                  </Link>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>

          <MotionDiv
            whileHover={{ scale: 1.1 }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              delay: 0.6,
              duration: 0.9,
            }}
          >
            <div>
              <MotionDiv
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.3 }}
              >
                <div>
                  <Link
                    className="font-bold text-lg p-2 rounded-md"
                    href="watchlist"
                  >
                    Watchlist
                  </Link>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              delay: 0.7,
              duration: 1,
            }}
          >
            <div>
              <MotionDiv
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.3 }}
              >
                <div>
                  <Link
                    className="font-bold text-lg   p-2 rounded-md"
                    href="About"
                  >
                    About
                  </Link>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
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
      </MotionNav>
      )
    </>
  )
}

export default Navbar
