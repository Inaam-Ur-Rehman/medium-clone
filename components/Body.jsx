"use client";
import DOMPurify from "dompurify";
import React from "react";

const Body = ({ body }) => {
  console.log(body);
  return (
    <div
      className="w-full p-0 mx-auto my-4 prose-xl prose-headings:text-theme-green prose-headings:font-extrabold prose-headings:uppercase"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
    ></div>
  );
};

export default Body;
