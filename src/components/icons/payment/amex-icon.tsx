import { SVGProps } from "react";

export function AmexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="24" rx="4" fill="#006FCF" />
      <path
        fill="white"
        d="M16.2 12.1h1.8v-4.2h-2.8l-1.8 4-1.9-4H8.7v8.2h2.5v-6l2.1 4.4h1.4l2.1-4.4v6h2.5v-4zm7.2 0h3.1v2.1h-3.1v2.1h3.5v2.1h-6v-8.2h6v2.1h-3.5v1.8zm-14.8 4.2H4.8l3.6-8.2h3.8l3.6 8.2h-2.9l-.7-1.6h-3.5l-.7 1.6z"
      />
      <path fill="white" d="M11.4 13l-1.2-2.9L9 13h2.4z" />
    </svg>
  );
}