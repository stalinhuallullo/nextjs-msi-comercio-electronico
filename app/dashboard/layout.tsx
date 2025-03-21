
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./dashboard.globals.css";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App tay",
    description: "Generated by create next app",
};

export default function DashboardLayout({   
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
            <Head>
                <link rel="stylesheet" href="style-taylor.css" />
            </Head>
            <body className={`${inter.className} bg-gray-50 dark:bg-gray-800`}>
                <Header />
                <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Sidebar />
                    <div className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
                    <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">

                        {children}
                        <Footer />

                    </div>
                </div>
            </body>
        </html>
    );
}
