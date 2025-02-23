import React from 'react';

interface FigmaIconProps {
  className?: string;
}

const FigmaIcon = ({ className }: FigmaIconProps) => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 20 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_20_16)">
        <path
          d="M10 15C10 12.2667 12.2158 10.0509 14.9491 10.0509C17.6824 10.0509 19.8982 12.2667 19.8982 15C19.8982 17.7333 17.6824 19.9491 14.9491 19.9491C12.2158 19.9491 10 17.7333 10 15Z"
          fill="#1ABCFE"
        />
        <path
          d="M0.101807 24.8982C0.101807 22.1649 2.31759 19.9491 5.0509 19.9491H10V24.8982C10 27.6315 7.78424 29.8473 5.0509 29.8473C2.31759 29.8473 0.101807 27.6315 0.101807 24.8982Z"
          fill="#0ACF83"
        />
        <path
          d="M10 0.15274V10.0509H14.9491C17.6824 10.0509 19.8982 7.83514 19.8982 5.10183C19.8982 2.36853 17.6824 0.15274 14.9491 0.15274H10Z"
          fill="#FF7262"
        />
        <path
          d="M0.101807 5.10184C0.101807 7.83514 2.31759 10.0509 5.0509 10.0509H10V0.15274H5.0509C2.31759 0.15274 0.101807 2.36852 0.101807 5.10184Z"
          fill="#F24E1E"
        />
        <path
          d="M0.101807 15C0.101807 17.7333 2.31759 19.9491 5.0509 19.9491H10V10.0509H5.0509C2.31759 10.0509 0.101807 12.2667 0.101807 15Z"
          fill="#A259FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_20_16">
          <rect width="20" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FigmaIcon;