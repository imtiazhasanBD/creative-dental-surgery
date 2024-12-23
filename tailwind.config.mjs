module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#00adef",
        'primary-gradient': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,173,239,1) 0%, rgba(179,224,169,1) 100%)',
      },
    },
  },
  plugins: [],
};

