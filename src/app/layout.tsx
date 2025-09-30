import type { Metadata } from "next";
import "./globals.css";
import { connectToMongoDB } from "@/utils/db";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
    title: "IFinishedThese",
    description: "Create your own list of finished games or just find more information about them!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    connectToMongoDB();
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
