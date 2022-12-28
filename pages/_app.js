import "styles/globals.css";
import { AudioProvider } from "contexts/AudioProvider";

export default function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Component {...pageProps} />
    </AudioProvider>
  );
}
