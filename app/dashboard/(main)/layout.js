'use client'

import { userPermissions as RuserPermissions } from '@/services/User';
import { ModalProvider } from '@/components/dashboard/Modal';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPermissions } from '@/state/permissions';
import httpServices from '@/services/httpServices';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import '@/styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.value);
  const { replace } = useRouter();
  const pathname = usePathname()

  const checkUserAccessToUrl = async (permissions) => {
    let access = false;
    permissions.forEach(element => {
      if (element.route == pathname) {
        access = true;
      }
    });
    if (!access) {
      throw new Error('Permission is not granted !');
    } else {
      return access;
    }
  }

  const userPsermissions = async () => {
    try {
      if (permissions.length != 0 && permissions != null) {
        await checkUserAccessToUrl(permissions);
        return;
      }
      setLoading(true);
      const token = getCookie('token');
      if (token) httpServices.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      let response = await RuserPermissions();
      let { data } = response;
      await dispatch(setPermissions(data));
      await checkUserAccessToUrl(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      replace("/dashboard/login");
    }
  }

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

  useEffect(() => {
    userPsermissions();
  }, [pathname]);


  return (
    <html lang="en">
      <body>
        <div className='bg-primary flex h-screen w-full max-w-full overflow-hidden'>
          <Toaster position="top-center" />
          {loading ?
            <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
              <div className="w-32 h-32 rounded-full border-8 border-solid border-accent border-t-transparent animate-spin"></div>
              <span>Getting User Permissions</span>
            </div>
            :
            <ModalProvider>
              <Sidebar open={open} setOpen={setOpen} />
              <div className={open ? "opacity-50 bg-black w-100% h-screen z-20 top-0 left-0 right-0 bottom-0 fixed cursor-pointer" : "hidden"}
                onClick={() => setOpen(!open)} />
              <div className='flex grow flex-col h-screen min-w-0 max-w-full'>
                <Header open={open} setOpen={setOpen} />
                <div className="flex relative grow border-solid  overflow-hidden">
                  {children}
                </div>
              </div>
            </ModalProvider>
          }
        </div>
      </body>
    </html>
  )
}
