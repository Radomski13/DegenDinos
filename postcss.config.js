// postcss.config.js

const production = process.env.NODE_ENV !== "dev";

module.exports = {
	plugins: [require("tailwindcss"), production && require("autoprefixer")],
};
