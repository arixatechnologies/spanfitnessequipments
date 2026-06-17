import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#09122C",
        wine: "#872341",
        ember: "#BE3144",
        coral: "#E17564"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 34px rgba(190, 49, 68, 0.34)",
        coral: "0 0 28px rgba(225, 117, 100, 0.32)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shine: "shine 2.4s linear infinite",
        marquee: "marquee 24s linear infinite",
        glow: "glow 8s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shine: {
          "0%": { transform: "translateX(-130%) skewX(-18deg)" },
          "100%": { transform: "translateX(260%) skewX(-18deg)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        glow: {
          "0%": { opacity: "0.45", transform: "translate3d(-2%, 0, 0) scale(1)" },
          "100%": { opacity: "0.85", transform: "translate3d(2%, -1%, 0) scale(1.04)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
