import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCard = () => {
  return (
    <div className="grid items-start grid-cols-6 justify-items-center">
      <span className="col-span-1 text-3xl text-black/10">01</span>
      <div className="flex flex-col col-span-5 gap-4">
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
          <Link href="/reading" className="font-bold">
            The deeper meaning behind Japan’s unique UX design culture
          </Link>
        </h2>
        <div>
          <span>Jul 13</span>
          <span> · </span>
          <span>6 min read</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
