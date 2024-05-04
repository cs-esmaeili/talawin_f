'use client'

import Header from '@/components/site/Header';
import Sidebar from '@/components/site/Sidebar';
import 'react-image-crop/dist/ReactCrop.css'
import '@/styles/globals.css';
import Footer from '@/components/site/Footer';
import { useState, useEffect } from 'react';
import { categorys as Rcategorys } from '@/services/Category';

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);

  const [changeHeader, setChangeHeader] = useState(false);

  const [categorys, setCategorys] = useState(null);

  const categoryList = async () => {
    try {
      const { data } = await Rcategorys();
      setCategorys(data);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    categoryList();
  }, []);

  return (
    <html lang="en">
      <body className='bg-primary_s overflow-x-hidden'>

        <div className='relative flex flex-col grow w-full h-screen min-w-0 max-w-full items-center  overflow-x-hidden' onScroll={(e) => {
          if (e.target.scrollTop >= 200) {
            setChangeHeader(true);
          } else if (changeHeader) {
            setChangeHeader(false);
          }
        }}>
          <Header categorys={categorys} open={open} setOpen={setOpen} changeHeader={changeHeader} />
          <Sidebar categorys={categorys} open={open} setOpen={setOpen} />
          <div className={`fixed top-0 w-full h-[80px]  z-20 transition-all duration-1000 ${changeHeader ? "bg-accent_s opacity-70" : "bg-gradient-to-b from-primary_s to-transparent z-20"}`}></div>
          {children}
          <Footer />
        </div>

      </body>
    </html>
  )
}
