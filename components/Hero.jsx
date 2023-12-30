import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-theme-yellow border-b-[0.7px] border-black">
      <div className="grid grid-cols-1 px-4 py-16 pt-24 mx-auto md:grid-cols-2 md:px-16 max-w-7xl md:pt-40 ">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl">Stay curious.</h1>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <Link
            className="px-4 py-2 text-white bg-black rounded-full md:px-10 max-w-max"
            href="/reading"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
