/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath lets BEACON live at /beacon/* behind the Caddy reverse proxy
  // (see infra/Caddyfile). Without this, internal Next.js links would
  // generate /overview instead of /beacon/overview and the proxy would
  // miss them.
  basePath: "/beacon",
};

module.exports = nextConfig;