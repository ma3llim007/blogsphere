import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import viteCompression from "vite-plugin-compression";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);


// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), viteCompression({ algorithm: "brotliCompress" }), viteCompression({ algorithm: "gzip" })],
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
