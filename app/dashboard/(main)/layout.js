'use client'

import { ModalProvider } from '@/components/dashboard/Modal';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';
import useSocket from '@/hooks/useSocket';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/navigation';
import translations from "@/translations.json";
import { securityCheck as RsecurityCheck } from '@/services/User';
import { usePathname } from 'next/navigation';
import { setPermissions } from '@/state/permissions';
import { setinformation } from '@/state/information';
import { setrole } from '@/state/role';
import { useDispatch } from 'react-redux';

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { layoutMain } = translations['fa'];
  const pathname = usePathname();
  const dispatch = useDispatch();
  useSocket(!loading);

  const securityCheck = async () => {
    try {

      setLoading(true);
      const { data } = await RsecurityCheck({ route: pathname });
      const { information, permissions } = data;

      dispatch(setPermissions(permissions));
      dispatch(setinformation(information));
      dispatch(setrole(information.role_id));

      setLoading(false);
    } catch (error) {
      console.log(error);
      useLogout(push);
    }
  }

  useEffect(() => {
    securityCheck();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className='bg-primary flex h-screen w-full max-w-full overflow-hidden'>
      <Toaster position="top-center" />
      {loading ?
        <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
          <div className="w-32 h-32 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
        </div>
        :
        <ModalProvider>
          <div className={open ? "opacity-50 bg-black w-100% h-screen z-20 top-0 left-0 right-0 bottom-0 fixed cursor-pointer" : "hidden"}
            onClick={() => setOpen(!open)} />
          <div className='flex grow flex-col h-screen min-w-0 max-w-full'>
            <Header open={open} setOpen={setOpen} />
            <div className="flex relative grow border-solid  overflow-hidden">
              {children}
            </div>
          </div>
          <Sidebar open={open} setOpen={setOpen} />
        </ModalProvider>
      }
    </div>
  )
}
