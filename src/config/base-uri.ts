export const BASE_URI =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_BASE_URI
    : process.env.NEXT_PUBLIC_BASE_URI;
