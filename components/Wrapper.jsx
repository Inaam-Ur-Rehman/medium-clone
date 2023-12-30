"use client";

import { useScrollPercentage } from "react-scroll-percentage";

const Wrapper = ({ children }) => {
  const [ref, percentage] = useScrollPercentage({
    threshold: 0,
  });
  //   if (document && percentage > 0.53) {
  //     //    change the color of the nav bar
  //     document.querySelector("nav").style.backgroundColor = "white";
  //   } else {
  //     document.querySelector("nav").style.backgroundColor = "";
  //   }
  return (
    <div ref={ref}>
      <h1>hook</h1>
      {children}
    </div>
  );
};

export default Wrapper;
