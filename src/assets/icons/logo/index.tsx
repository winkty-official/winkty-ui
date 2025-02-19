"use client";

import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useState<string>("dark");

  const { theme: _theme } = useTheme();

  useEffect(() => {
    setTheme(_theme ?? "dark");
  }, [_theme]);

  return (
    <motion.svg
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      className={cva({
        "mx-auto size-[216px]": !className,
        "fill-primary": theme === "dark",
        [className ?? ""]: true,
      })()}
      width="116"
      height="37"
      viewBox="0 0 116 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6747 32L0 11.3975L6.03864 11.2213L15.9224 26.1123L13.7732 31.9362L13.6747 32Z"
        className={cva({
          "fill-black": theme === "light",
          "fill-white": theme === "dark",
        })()}
      />
      <motion.path
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6264 31.6304L6.95168 11.0279L12.9903 10.8517L22.8741 25.7427L20.7249 31.5666L20.6264 31.6304Z"
        className={cva({
          "fill-black": theme === "light",
          "fill-white": theme === "dark",
        })()}
      />
      <motion.path
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.0654 15.9847L30.7793 15.7008L27.8578 10.4658L21.8235 10.1757L25.0654 15.9847Z"
        className="fill-primary"
      />
      <motion.path
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.7018 21.4554L22.237 21.1649L25.0154 15.9224L30.7456 15.6507L30.7705 15.6649L27.7018 21.4554Z"
        className="fill-primary"
      />
      <motion.path
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        d="M35.3778 30V13.0909H37.9759V30H35.3778ZM36.6989 10.2727C36.1925 10.2727 35.7558 10.1003 35.3888 9.75533C35.0292 9.41039 34.8494 8.99574 34.8494 8.51136C34.8494 8.02699 35.0292 7.61233 35.3888 7.2674C35.7558 6.92247 36.1925 6.75 36.6989 6.75C37.2053 6.75 37.6383 6.92247 37.9979 7.2674C38.3648 7.61233 38.5483 8.02699 38.5483 8.51136C38.5483 8.99574 38.3648 9.41039 37.9979 9.75533C37.6383 10.1003 37.2053 10.2727 36.6989 10.2727ZM45.3323 19.8281V30H42.7343V13.0909H45.2442V15.733H45.4644C45.8607 14.8743 46.4625 14.1844 47.2698 13.6634C48.0771 13.1349 49.1192 12.8707 50.3962 12.8707C51.5411 12.8707 52.5429 13.1056 53.4015 13.5753C54.2602 14.0376 54.9281 14.7422 55.4051 15.6889C55.8821 16.6283 56.1207 17.8172 56.1207 19.2557V30H53.5226V19.4318C53.5226 18.1035 53.1777 17.0687 52.4878 16.3274C51.798 15.5788 50.8512 15.2045 49.6476 15.2045C48.8183 15.2045 48.0771 15.3844 47.4239 15.744C46.7781 16.1036 46.268 16.6283 45.8937 17.3182C45.5194 18.008 45.3323 18.8447 45.3323 19.8281ZM63.29 23.8352L63.2459 20.6207H63.7743L71.1721 13.0909H74.3865L66.5044 21.0611H66.2843L63.29 23.8352ZM60.8681 30V7.45454H63.4661V30H60.8681ZM71.6124 30L65.0073 21.6335L66.8567 19.8281L74.915 30H71.6124ZM85.0841 13.0909V15.2926H76.3213V13.0909H85.0841ZM78.8753 9.03977H81.4733V25.1562C81.4733 25.8902 81.5797 26.4406 81.7925 26.8075C82.0127 27.1671 82.2916 27.4093 82.6292 27.5341C82.9741 27.6515 83.3374 27.7102 83.719 27.7102C84.0052 27.7102 84.2401 27.6955 84.4236 27.6662C84.607 27.6295 84.7538 27.6001 84.8639 27.5781L85.3923 29.9119C85.2162 29.978 84.9703 30.044 84.6547 30.1101C84.3392 30.1835 83.9392 30.2202 83.4548 30.2202C82.7209 30.2202 82.0017 30.0624 81.2971 29.7468C80.5999 29.4312 80.0202 28.9505 79.5578 28.3047C79.1028 27.6589 78.8753 26.8442 78.8753 25.8608V9.03977ZM90.6654 36.3409C90.2251 36.3409 89.8324 36.3042 89.4875 36.2308C89.1425 36.1648 88.904 36.0987 88.7719 36.0327L89.4324 33.7429C90.0636 33.9044 90.6214 33.9631 91.1057 33.919C91.5901 33.875 92.0194 33.6585 92.3937 33.2695C92.7754 32.8879 93.124 32.2678 93.4395 31.4091L93.9239 30.0881L87.6711 13.0909H90.4893L95.1569 26.5653H95.333L100.001 13.0909H102.819L95.6412 32.4659C95.3183 33.3393 94.9184 34.0621 94.4413 34.6346C93.9643 35.2144 93.4102 35.6437 92.779 35.9226C92.1552 36.2015 91.4507 36.3409 90.6654 36.3409Z"
        className={cva({
          "fill-black": theme === "light",
          "fill-white": theme === "dark",
        })()}
      />
    </motion.svg>
  );
};

export default Logo;
