import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir el servidor de desarrollo desde el móvil en la misma wifi.
  allowedDevOrigins: ["192.168.1.185"],
};

export default nextConfig;
