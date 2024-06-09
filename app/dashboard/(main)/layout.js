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
import '@/styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';
import translations from "@/translations.json";

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.value);
  const { replace } = useRouter();
  const pathname = usePathname()
  const { layoutMain } = translations['fa'];

  const checkExpTime = async () => {
    const token = getCookie('token');
    if (token == null || token == undefined) {
      console.log("Token not found !");
      throw new Error(layoutMain.permissionError);
    }
  }

  const checkUserAccessToUrl = async (permissions) => {
    let access = false;
    await permissions.forEach(element => {
      if (element.route == pathname) {
        access = true;
      }
    });
    if (!access) {
      console.log("Permission Not granted !");
      throw new Error(layoutMain.permissionError);
    } else {
      return access;
    }
  }

  const userPsermissions = async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      if (token) httpServices.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let response = await RuserPermissions();
      let { data } = response;
      dispatch(setPermissions(data));
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      replace("/dashboard/login");
    }
  }

  const securityCheck = async () => {
    try {
      await checkExpTime();
      if (permissions == null || permissions.length === 0) {
        const freshPermissions = await userPsermissions();
        await checkUserAccessToUrl(freshPermissions);
      } else {
        await checkUserAccessToUrl(permissions);
      }
    } catch (error) {
      console.log(error);
      replace("/dashboard/login");
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
          <span>{layoutMain.securityCheck}</span>
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
            <div className='flex flex-col gap-3 justify-center items-center bg-secondary rounded-md m-2 p-2 h-fit'>
              <div className='text-2xl text-yellow-400 text-center'>طلاوین</div>
              <div className='text-center'>
                اصفهان / میدان نقش جهان / خ حکیم / بازارچه نو / مقابل بانک کشاورزی
              </div>
            </div>
          </div>
          <Sidebar open={open} setOpen={setOpen} />
        </ModalProvider>
      }
    </div>
  )
}
