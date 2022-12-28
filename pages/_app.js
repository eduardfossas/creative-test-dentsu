import "styles/globals.css";
import { AudioProvider } from "contexts/AudioProvider";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </>
  );
}
