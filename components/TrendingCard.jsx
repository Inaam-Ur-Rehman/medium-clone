import readingTime from "reading-time";
import Link from "next/link";
import getImageURL from "@/utils/getImageURL";

const TrendingCard = ({ article, index }) => {
  return (
    <div className="grid items-start grid-cols-6 justify-items-center">
      <span className="col-span-1 text-3xl text-black/10">{index + 1}</span>
      <div className="flex flex-col col-span-5 gap-4">
        <div className="flex items-center gap-1">
          <img
            src={getImageURL(article?.author?.image)}
            width={20}
            height={20}
            alt="avatar"
            className="w-6 h-6 rounded-md"
          />
          <span className="whitespace-nowrap">{article?.author?.name}</span>
          <span className="whitespace-nowrap">{article?.author?.website}</span>
        </div>
        <h2>
          <Link href={`/post/${article?.slug}`} className="font-bold">
            {article?.title}
          </Link>
        </h2>
        <div className="flex items-center gap-2">
          {article?.categories?.map((cat) => (
            <Link
              className="px-2 rounded-full bg-theme-green/10"
              href={`/category/${cat?.slug}`}
            >
              {cat?.name}
            </Link>
          ))}
        </div>
        <div>
          <span>
            {new Date(article?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span> · </span>
          <span>{readingTime(article?.body).text}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
