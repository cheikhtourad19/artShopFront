import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    allowedRevalidateHeaderKeys: ["*"],
  },
};

export default withFlowbiteReact(nextConfig);
