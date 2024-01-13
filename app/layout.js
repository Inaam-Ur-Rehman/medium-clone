import { Baloo_2, ABeeZee } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Wrapper from "@/components/Wrapper";
import "react-quill/dist/quill.snow.css";
import { ClerkProvider } from "@clerk/nextjs";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--baloo",
});

export const metadata = {
  title: "Medium",
  description: "A Medium.com clone built with Next.js and Tailwind CSS",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${baloo.variable}`}>
          <Nav />
          <Wrapper>{children}</Wrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
