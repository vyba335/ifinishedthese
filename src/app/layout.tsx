import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/utils/AuthProvider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const metadata: Metadata = {
    title: "I Finished These!",
    description:
        "Save your finished games, write review for them and share your list!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en">
                <body className={`antialiased`}>
                    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </body>
            </html>
        </AuthProvider>
    );
}
