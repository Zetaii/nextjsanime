"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface Props {
  children: JSX.Element
  width?: "fit-content" | "100%"
}

export const TextReveal = ({ children, width = "fit-content" }: Props) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      slideControls.start("visible")
    }
  }, [isInView, mainControls, slideControls])

  return (
    <div ref={ref} className="relative  overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.4, ease: "easeIn", delay: 0.8 }}
        style={{
          position: "absolute",
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
          background: "#10131c",
          zIndex: 20,
          borderRadius: "20px",
        }}
      />
    </div>
  )
}
