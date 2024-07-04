import MainHeader from "@/components/main-header/main-header";
import "./globals.css";

export const metadata = {
  title: "Recipe Net",
  description: "A community of coooking lovers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
