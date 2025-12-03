import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 仅在生产环境移除 console（保留 error 和 warn），并移除 debugger
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
};

export default nextConfig;
