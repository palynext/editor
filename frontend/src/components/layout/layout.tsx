import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-screen w-screen flex-col">
    <Header />
    {children}
    <div className="flex-1" />
    <Footer />
</div>;
}
