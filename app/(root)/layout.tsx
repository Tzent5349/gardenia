import Footer from "@/components/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";


export default async function HomeLayout({
    children,}: {
    children: React.ReactNode
  
  }) {
  
  
  
  
  
    return (
      <>
      
        <Navbar />
        {children}
        <Footer />
      </>
    );
  };
  