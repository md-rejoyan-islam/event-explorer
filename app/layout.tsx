import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Explorer",
  description: "Discover and explore exciting events in your area",
export const metadata = {
  title: "Event Explorer",
  description: "Discover and explore exciting events in your area",
};

export default function RootLayout({
  children,
}: {
}: {
  children: React.ReactNode;
}) {
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-myBackground text-myText`}>
      <body className={`${inter.className} bg-myBackground text-myText`}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
