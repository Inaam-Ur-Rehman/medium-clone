import Card from "@/components/Card";
import Hero from "@/components/Hero";
import TrendingCard from "@/components/TrendingCard";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Trending  */}
      <div className="px-4 mx-auto my-16 max-w-7xl">
        <h2 className="my-2">Trending on Medium</h2>
        {/* Trending posts */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </div>
      </div>
      <hr className="my-12" />
      <div className="grid grid-cols-1 gap-16 px-4 mx-auto md:grid-cols-12 max-w-7xl">
        <div className="flex flex-col gap-16 mb-6 md:col-span-8">
          <Card />
          <Card />
        </div>
        <div className="md:col-span-4">
          <h2>Discover more of what matters to you</h2>
          <div className="flex flex-wrap items-center gap-4 my-2">
            <span className="px-2 py-1 rounded-full bg-black/10">Running</span>
            <span className="px-2 py-1 rounded-full bg-black/10">
              Programming
            </span>
            <span className="px-2 py-1 rounded-full bg-black/10">Writing</span>
            <span className="px-2 py-1 rounded-full bg-black/10">
              Self Improvement
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
