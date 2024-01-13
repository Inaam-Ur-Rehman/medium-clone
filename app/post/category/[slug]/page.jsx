import Card from "@/components/Card";
import { getArticlesByCategory } from "@/utils/actions/article.actions";

const CategoryPage = async ({ params }) => {
  const slug = params?.slug;
  const blogs = await getArticlesByCategory(slug);
  return (
    <div className="max-w-2xl px-2 mx-auto mt-12">
      <h1 className="my-8 text-2xl font-bold capitalize">{slug} Category</h1>
      <div className="flex flex-col gap-6">
        {blogs?.length > 0 ? (
          blogs?.map((article) => <Card key={article?.id} article={article} />)
        ) : (
          <h1>No articles found</h1>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
