import React from "react"

const Circles = () => {
  return (
    <>
      <div className="absolute top-4 -left-4 w-32 h-32 bg-gray-400 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-3000"></div>
      <div className="absolute top-4 left-32 w-32 h-32 bg-gray-500 opacity-10 rounded-full filter blur-xl animate-blob"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gray-600 opacity-10    rounded-full filter blur-xl animate-blob animation-delay-2000"></div>

      <div className="absolute top-[400px] right-12 w-32 h-32 bg-gray-400 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-3000"></div>
      <div className="absolute top-[400px] right-32 w-48 h-48 bg-gray-500 opacity-10 rounded-full filter blur-xl animate-blob"></div>
      <div className="absolute top-[450px] right-20 w-48 h-48 bg-gray-600 opacity-10    rounded-full filter blur-xl animate-blob animation-delay-2000"></div>

      <div className="absolute top-[600px] -left-4 w-32 h-32 bg-gray-400 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>
      <div className="absolute top-[600px] left-32 w-32 h-32 bg-gray-500 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-5000"></div>
      <div className="absolute top-[650px] left-20  w-32 h-32 bg-gray-600 opacity-10   rounded-full filter blur-xl animate-blob animation-delay-6000"></div>
    </>
  )
}

export default Circles
