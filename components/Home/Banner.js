/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
// import styles from "../../styles/Banner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import Link from "next/link";
import { motion } from "framer-motion";
const bannerData = [
  {
    title: " Blockchain Development",
    desc: " You can find the best of the blockchain developers with immense experience",
    yoXP: "5+",
    savants: "5k+",
    client: "100%",
    pic: "https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif",
  },
  {
    title: "Smart Contract Audits",
    desc: "Best of the security auditors who can help you prevent your funds from draining on a beautiful morning",
    yoXP: "4+",
    savants: "1k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/web-dev.gif",
  },
  {
    title: "Web3 Design",
    desc: "We have the best designers who can bring in aesthetically pleasing designs to yours dapps.",
    yoXP: "15+",
    savants: "3k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/graphics-design.gif",
  },
  {
    title: "Writing",
    desc: "Technical writers for writing documentations, Crypto white-papers...",
    yoXP: "8+",
    savants: "8k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/writting.gif",
  },
  {
    title: "App Developement",
    desc: "The best services in our company that is curently on the best selling part of our company on demand.",
    yoXP: "15+",
    savants: "15k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/m-dev.gif",
  },
  {
    title: "Web Design",
    desc: "The best services in our company that is curently on the best selling part of our company on demand.",
    yoXP: "15+",
    savants: "15k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/design.gif",
  },
  {
    title: "SEO ",
    desc: "The best services in our company that is curently on the best selling part of our company on demand.",
    yoXP: "15+",
    savants: "15k+",
    client: "100%",
    pic: "https://raw.githubusercontent.com/mahmudulhaquequdrati/all-gifs/main/app-dev.gif",
  },
];

const Banner = () => {
  return (
    <div className="cubano container mx-auto px-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Autoplay]}
        className="overflow-x-hidden"
      >
        {bannerData.map((bd, ind) => (
          <SwiperSlide key={ind} bd={bd}>
            <div className="grid grid-cols-1 lg:grid-cols-2  overflow-x-hidden py-12 items-center">
              <div>
                <motion.div
                  initial={{ scaleX: 0.7, opacity: 0, visibility: "hidden" }}
                  animate={{ scaleX: 1, opacity: 1, visibility: "visible" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="col-span-5 pl-0"
                >
                  <div className="text-center lg:text-left ">
                    <h2 className="text-6xl font-bold text-[#2A3254]">
                      {bd?.title}
                    </h2>
                    <p className="text-gray-500 text-sm my-3 w-96 mx-auto lg:mx-0">
                      {bd.desc}
                    </p>
                    <div className="flex gap-4 justify-center lg:justify-start">
                      <Link passHref href="/gig_search">
                        <button className="px-8 py-3 rounded bg-[#4169e1] text-lg  text-white">
                          Get Started
                        </button>
                      </Link>
                      <Link passHref href="/gig_search">
                        <button className="px-8 py-3  rounded border-2 border-[#4169e1]  text-lg">
                          Try Now
                        </button>
                      </Link>
                    </div>

                    <div className="mt-12 flex gap-6 justify-center lg:justify-start">
                      <div className="">
                        <p className="font-bold text-3xl">{bd.yoXP}</p>
                        <p className="w-[80%] text-sm">Years of experiences</p>
                      </div>
                      <div className="">
                        <p className="font-bold text-3xl">{bd.savants}</p>
                        <p className="w-[80%] text-sm">Savants available</p>
                      </div>
                      <div className="">
                        <p className="font-bold text-3xl">{bd.client}</p>
                        <p className="w-[80%] text-sm">Client Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div>
                <img
                  className="w-[80%] max-w-full mx-auto"
                  src={bd.pic}
                  alt={bd?.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
