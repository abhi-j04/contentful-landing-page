import { ReactNode } from 'react';
import { Navbar } from './index';
import Footer from './Footer';
import { FooterSectionEntry } from '@/types/contentful';

interface LayoutProps {
  children: ReactNode;
  footerData?: FooterSectionEntry | null;
}

const Layout = ({ children, footerData }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer initialData={footerData} />
    </div>
  );
};

export default Layout;
