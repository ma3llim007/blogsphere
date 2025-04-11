const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const tailwindcss = require("@tailwindcss/vite");
const path = require("path");
const viteCompression = require("vite-plugin-compression");

// https://vitejs.dev/config/
module.exports = defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({ algorithm: "brotliCompress" }),
        viteCompression({ algorithm: "gzip" }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    optimizeDeps: {
        exclude: ["react-toastify"],
    },
    build: {
        minify: "esbuild",
        target: "esnext",
        cssCodeSplit: true,
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor"; // Separate vendor files
                    }
                },
            },
        },
    },
});
