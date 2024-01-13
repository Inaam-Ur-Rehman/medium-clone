"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import supabase from "@/utils/db";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { createArticle } from "@/utils/actions/article.actions";
import { getAllCategories } from "@/utils/actions/categories.actions";
import { useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";

const Write = () => {
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    })();
  }, []);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const { data, error } = await supabase.storage.from("images").upload(
      // unique filename
      `${Math.floor(Math.random() * 1000)}-${file.name}`,
      file,
      {
        cacheControl: "3600",
        upsert: false,
      }
    );
    setCover(data.fullPath);
    if (error) {
      console.log(error);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      user_id: z
        .string({
          required_error: "User is required",
        })
        .min(1),
    });

    const result = formValidation.safeParse({
      title,
      content: value,
      thumbnail: cover,
      is_published: isPublished,
      user_id: user?.id,
    });
    if (result.error) {
      // alert(result.error?.flatten()?.fieldErrors);
      setError(result.error?.flatten()?.fieldErrors);
      return;
    } else {
      const articleObj = {
        title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        body: value,
        thumbnail: cover,
        published: isPublished,
        authorId: user?.id,
        categories: selectedCategories.map((category) => category.id),
      };
      const data = await createArticle(articleObj);
      if (data) {
        // alert("Post created successfully");
        router.replace("/dashboard");
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
        <label htmlFor="cover">
          Cover Image
          <input
            type="file"
            name="cover"
            id="cover"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-green focus:border-transparent"
            onChange={uploadFile}
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
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Publish ?
        </label>
      </form>
      <button
        onClick={handleSubmit}
        className="block px-6 py-2 mt-2 ml-auto text-white rounded-md bg-theme-green max-w-max"
      >
        Publish
      </button>
    </div>
  );
};

export default Write;
