// pages/_app.js
import '../styles/globals.css'; // your global CSS

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
