"use client";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import readingTime from "reading-time";

const Card = ({ article }) => {
  return (
    <div className="grid items-center grid-cols-6 gap-8 pb-6 border-b-2">
      <div className="flex flex-col col-span-4 gap-4">
        <div className="flex items-center gap-1">
          <Image
            src="https://miro.medium.com/v2/resize:fill:30:30/1*mDhF9X4VO0rCrJvWFatyxg.png"
            width={20}
            height={20}
            className="w-4 h-4 rounded-md"
          />
          <span className="whitespace-nowrap">Bas Wallet</span>
          <span>in</span>
          <span className="whitespace-nowrap">UX Collective</span>
        </div>
        <h2>
          <Link href={`/post/${article?.slug}`} className="font-bold">
            {article?.title}
          </Link>
        </h2>
        <div className="line-clamp-3">
          {DOMPurify.sanitize(article?.body)
            .replace(/<[^>]*>?/gm, "")
            .slice(0, 200)}
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
          <span> . </span>
          <div className="flex flex-wrap items-center gap-1 mt-4">
            {article?.categories?.map((cat) => (
              <span className="px-2 py-1 rounded-full bg-theme-green/10">
                {cat?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 text-3xl text-black/10">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${article?.thumbnail}`}
          width={300}
          height={200}
          className="object-cover w-64 h-32 overflow-hidden rounded-md"
        />
      </div>
    </div>
  );
};

export default Card;
