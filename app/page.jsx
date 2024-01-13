import Card from "@/components/Card";
import Hero from "@/components/Hero";
import TrendingCard from "@/components/TrendingCard";
import {
  getArticles,
  getTrendingArticles,
} from "@/utils/actions/article.actions";
import { getAllCategories } from "@/utils/actions/categories.actions";
import supabase from "@/utils/db";
import prisma from "@/utils/prisma";
import Link from "next/link";

export default async function Home() {
  const data = await getTrendingArticles();
  const articles = await getArticles();
  const categories = await getAllCategories();

  // const blogs = await prisma.article.findMany({});
  // console.log(blogs);
  return (
    <main>
      <Hero />
      {/* Trending  */}
      <div className="px-4 mx-auto my-16 max-w-7xl">
        <h2 className="my-6">Trending on Medium</h2>
        {/* Trending posts */}
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((article, index) => (
            <TrendingCard key={article?.id} article={article} index={index} />
          ))}
        </div>
      </div>
      <hr className="my-12" />
      <div className="grid grid-cols-1 gap-16 px-4 mx-auto md:grid-cols-12 max-w-7xl">
        <div className="flex flex-col gap-16 mb-6 md:col-span-8">
          {articles?.map((article) => (
            <Card key={article?.id} article={article} />
          ))}
        </div>
        <div className="md:col-span-4">
          <h2>Discover more of what matters to you</h2>
          <div className="flex flex-wrap items-center gap-4 my-2">
            {categories?.map((category) => (
              <Link
                href={`/post/category/${category?.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                key={category?.id}
                className="px-2 py-1 rounded-full bg-theme-green/10"
              >
                {category?.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
