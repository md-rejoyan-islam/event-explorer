import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-132px)] p-1 md:p-3">{children}</main>
      <Footer />
    </>
  );
}
