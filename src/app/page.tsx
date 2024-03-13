import { fetchAnime } from "./action"
import Hero from "../components/Hero"
import LoadMore from "../components/LoadMore"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import AnimeCard, { AnimeProp } from "../components/AnimeCard"

async function Home() {
  const data = await fetchAnime(1)

  return (
    <MaxWidthWrapper>
      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <div className="absolute top-40 left-[700px] w-32 h-32 bg-gray-400 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-3000"></div>
        <div className="absolute top-[700px] right-[700px] w-32 h-32 bg-gray-400 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-5000"></div>
        <Hero />
        <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data.map((item: AnimeProp, index: number) => (
            <AnimeCard key={item.id} anime={item} index={index} />
          ))}
        </section>
        <LoadMore />
      </main>
    </MaxWidthWrapper>
  )
}

export default Home
