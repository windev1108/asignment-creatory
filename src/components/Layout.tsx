import { NextPage } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";

const Layout: NextPage<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Assignment - Creatory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white w-screen h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-x-hidden">
        {children}
      </main>
    </>
  );
};

export default Layout;
