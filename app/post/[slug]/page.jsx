import prisma from "@/utils/prisma";
import Body from "@/components/Body";
import { updateViews } from "@/utils/actions/article.actions";

const SinglePost = async ({ params }) => {
  const slug = params.slug;
  const data = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
  });
  await updateViews(slug);

  return (
    <div className="max-w-5xl px-4 mx-auto mt-12">
      <h1 className="py-8 text-4xl font-bold text-center">{data?.title}</h1>
      <p className="text-xl text-black">{data?.views} views</p>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.thumbnail}`}
        alt=""
        className="w-full rounded-2xl"
      />
      <Body body={data?.body} />
    </div>
  );
};

export default SinglePost;
