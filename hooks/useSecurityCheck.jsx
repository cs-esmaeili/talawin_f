import { useEffect } from "react";
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import translations from "@/translations.json";
import useLogout from "@/hooks/useLogout";

const useSecurityCheck = (push , setLoading) => {
  const pathname = usePathname();
  const { layoutMain } = translations['fa'];

  const checkExpTime = async () => {
    const token = getCookie('token');
    if (token == null || token == undefined) {
      console.log("Token not found!");
      throw new Error(layoutMain.permissionError);
    }
  };

  const checkUserAccessToUrl = async () => {
    let access = false;
    const userPermission = JSON.parse(localStorage.getItem('userPermission'));
    if (userPermission) {
      userPermission.forEach(permission => {
        if (permission.route === pathname) {
          access = true;
        }
      });
    }
    if (!access) {
      console.log("Permission Not granted!");
      throw new Error(layoutMain.permissionError);
    }
    return access;
  };

  const securityCheck = async () => {
    try {
      await checkExpTime();
      await checkUserAccessToUrl();
      setLoading(false);
    } catch (error) {
      console.log(error);
      useLogout(push);
    }
  };

  useEffect(() => {
    securityCheck();
  }, [pathname]);
};

export default useSecurityCheck;
