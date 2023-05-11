import { userAtom } from "@/atom/auth";
import Layout from "@/components/layout";
import { auth } from "@/fb/auth";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const setUser = useSetAtom(userAtom);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } else {
      setUser(null);
    }
  });
  return (
    <>
      <Head>
        <title>DMV 한인</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
