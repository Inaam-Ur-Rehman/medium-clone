import Button from "@/components/Button";
import {
  getArticles,
  getArticlesByAuthor,
} from "@/utils/actions/article.actions";
import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async () => {
  const { userId } = auth();
  const { publicMetadata, firstName } = await currentUser();
  const data = await getArticlesByAuthor(publicMetadata?.userId);

  return (
    <div className="px-4 pt-12 mx-auto max-w-7xl">
      <div className="flex items-center gap-4 text-2xl">
        <h1>Dashboard</h1>
        <p>Hello, {firstName}</p>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div className="col-sapn-1"></div>
        <div className="col-span-3">
          <h2 className="my-4 text-2xl">Your Articles</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-between p-4 rounded-lg bg-theme-green/10">
              <p>Number of Articles</p>
              <p>{data?.length}</p>
            </div>
            <div className="flex flex-col items-center justify-between p-4 rounded-lg bg-theme-yellow/10">
              <p>Number of Published Articles</p>
              <p>{data?.filter((art) => art.published === true).length}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            {data?.map((art) => (
              <div
                key={art.id}
                className="flex items-center gap-4 px-4 py-2 bg-theme-green/10"
              >
                <p>{art.title}</p>
                <p>{art.published ? "Published" : "Draft"}</p>
                <Link
                  href={`/articles/${art.slug}`}
                  className="px-4 py-1 text-white bg-green-600 rounded-md"
                >
                  Edit
                </Link>
                <Button
                  title="Delete"
                  id={art?.id}
                  className="text-white bg-red-600"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="px-4 py-1 text-white bg-red-600 rounded-md">
        Signout
      </button>
    </div>
  );
};

export default page;
