import Layout from "@/components/layout";
import { auth } from "@/fb/auth";
import { useResetAtoms } from "@/hooks/useResetAtoms";
import { useUser } from "@/hooks/useUser";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { setUser } = useUser();
  const resetAtoms = useResetAtoms();
  useEffect(() => {
    auth.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser({
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
        });
      } else {
        resetAtoms();
      }
    });
  }, [resetAtoms, setUser]);
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
