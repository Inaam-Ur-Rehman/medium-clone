import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <div className="grid items-start grid-cols-6 gap-8 justify-items-center">
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
          <Link href="/reading" className="font-bold">
            The deeper meaning behind Japan’s unique UX design culture
          </Link>
        </h2>
        <p>What it took to achieve second place</p>
        <div>
          <span>Jul 13</span>
          <span> · </span>
          <span>6 min read</span>
          <span> . </span>
          <span className="px-2 py-1 rounded-full bg-black/10">Running</span>
        </div>
      </div>
      <div className="col-span-2 text-3xl text-black/10">
        <Image
          src="https://miro.medium.com/v2/da:true/resize:fill:300:201/0*V3ldUojTlPcZU85h"
          width={300}
          height={201}
          className="w-64 rounded-md h-34"
        />
      </div>
    </div>
  );
};

export default Card;
