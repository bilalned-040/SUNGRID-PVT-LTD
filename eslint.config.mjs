import nextVitals from 'eslint-config-next/core-web-vitals';
const publicFiles = ['components/site/**/*.{js,jsx}', 'data/**/*.js', 'lib/**/*.mjs', 'scripts/**/*.mjs', 'tests/**/*.mjs', 'pages/index.js', 'pages/_app.js', 'pages/_document.js', 'pages/about.jsx', 'pages/contact.jsx', 'pages/gallery.jsx', 'pages/calculator.jsx', 'pages/certificates.jsx', 'pages/get-a-quote.jsx', 'pages/404.jsx'];
export default [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'styles/**', 'coverage/**'] },
  // Parse all project JavaScript and apply Next.js checks to the public site surface.
  { files: ['**/*.{js,jsx,mjs}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...nextVitals.map(config => ({ ...config, files: publicFiles })),
];
