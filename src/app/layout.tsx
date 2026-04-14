import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Milk Makeup - Clean Beauty + Vegan Makeup",
  description: "Clean, vegan, and cruelty-free makeup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} min-h-screen flex flex-col m-0 p-0`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}