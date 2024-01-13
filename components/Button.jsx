"use client";

import { deleteArticle } from "@/utils/actions/article.actions";
import supabase from "@/utils/db";

const Button = ({ title, id, className }) => {
  return (
    <button
      className={`max-w-max px-6 py-1 rounded-md ${className}`}
      onClick={async () => {
        const data = await deleteArticle(id);
        if (data) alert("Article deleted");
      }}
    >
      {title}
    </button>
  );
};

export default Button;
