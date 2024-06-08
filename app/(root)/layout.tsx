import Footer from "@/components/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import StoreProvider from "@/app/(root)/StoreProvider";


export default async function HomeLayout({
    children,}: {
    children: React.ReactNode
  
  }) {
  
  
  
  
  
    return (
      <>
        <StoreProvider>

        <Navbar />
        {children}
        </StoreProvider>
        <Footer />
      </>
    );
  };
  