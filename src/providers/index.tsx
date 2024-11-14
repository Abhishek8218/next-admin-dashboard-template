"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Create a client
const queryClient = new QueryClient();
export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        {children}
      
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </Suspense>
  )
};
