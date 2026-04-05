import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAuthorProfile } from "@/lib/posts";

export default async function SiteShell({ children }) {
  const author = await getAuthorProfile();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer author={author} />
    </div>
  );
}
