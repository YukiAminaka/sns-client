import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
