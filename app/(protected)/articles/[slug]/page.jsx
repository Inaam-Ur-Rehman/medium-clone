"use client";
import supabase from "@/utils/db";
import ReactQuill from "react-quill";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import uploadFile from "@/utils/uploadFile";
import {
  getArticleBySlug,
  updateArticle,
} from "@/utils/actions/article.actions";
import DOMPurify from "dompurify";
import { getAllCategories } from "@/utils/actions/categories.actions";
import Multiselect from "multiselect-react-dropdown";
import { useUser } from "@clerk/nextjs";

const Edit = ({ params }) => {
  const [data, setData] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [cover, setCover] = useState(null);
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    })();
  }, []);

  const upload = async (e) => {
    const url = await uploadFile(e);
    setCover(url);
  };

  useEffect(() => {
    const getArticle = async () => {
      const data = await getArticleBySlug(params?.slug);
      setData(data);
      setValue(DOMPurify.sanitize(data?.body));
      setIsPublished(data?.published);
      setCover(data?.thumbnail);
      setSelectedCategories(data?.categories);
      setTitle(data?.title);
    };
    getArticle();
  }, [params?.slug]);
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Here");
    const formValidation = z.object({
      title: z
        .string({
          required_error: "Title is required",
        })
        .min(3, {
          message: "Title must be at least 3 characters long",
        })
        .max(200, {
          message: "Title must be at most 200 characters long",
        }),
      content: z
        .string({
          required_error: "Content is required",
        })
        .min(20, {
          message: "Content must be at least 20 characters long",
        }),
      thumbnail: z
        .string({
          required_error: "Cover image is required",
        })
        .min(5),
      is_published: z.boolean(),
    });

    const result = formValidation.safeParse({
      title,
      content: value,
      thumbnail: cover,
      is_published: isPublished,
    });
    if (result.error) {
      // alert(result.error?.flatten()?.fieldErrors);
      console.log(result.error?.flatten()?.fieldErrors);
      setError(result.error?.flatten()?.fieldErrors);
      return;
    } else {
      console.log("Here");
      const res = await updateArticle({
        id: data?.id,
        title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        body: value,
        thumbnail: cover,
        published: isPublished,
        categories: selectedCategories.map((category) => category.id),
      });
      if (res) {
        alert("Article updated");
        router.push("/dashboard");
      }
      if (error) {
        console.log(error);
        return;
      }
    }
  };

  return (
    <div className="px-4 mx-auto my-10 max-w-7xl">
      <form className="flex flex-col gap-4 pt-2 ">
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={data?.title}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green focus:border-transparent"
            onChange={(e) => setTitle(e.target.value)}
          />
          <p>
            {error?.title && (
              <span className="text-red-600">{error?.title}</span>
            )}
          </p>
        </label>
        <label htmlFor="category">
          Category
          <Multiselect
            name="category"
            id="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green focus:border-transparent"
            options={categories}
            selectedValues={selectedCategories}
            onSelect={setSelectedCategories}
            onRemove={setSelectedCategories}
            displayValue="name"
          />
        </label>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.thumbnail}`}
          alt=""
          className="w-[400px] aspect-video"
        />
        <label htmlFor="cover">
          Cover Image
          <input
            type="file"
            name="cover"
            id="cover"
            defaultValue={data?.thumbnail}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green focus:border-transparent"
            onChange={upload}
          />
          <p>
            {error?.thumbnail && (
              <span className="text-red-600">{error?.thumbnail}</span>
            )}
          </p>
        </label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
            ],
          }}
        />
        <p>
          {error?.content && (
            <span className="text-red-600">{error?.content}</span>
          )}
        </p>
        <label htmlFor="isPublished">
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            className="mr-2"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish ?
        </label>
      </form>
      <button
        onClick={handleSubmit}
        className="block px-6 py-2 mt-2 ml-auto text-white rounded-md bg-theme-green max-w-max"
      >
        Update
      </button>
    </div>
  );
};

export default Edit;
