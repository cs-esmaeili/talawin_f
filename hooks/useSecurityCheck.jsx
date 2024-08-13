import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import translations from "@/translations.json";
import useLogout from "@/hooks/useLogout";
import { useSelector } from 'react-redux';

const useSecurityCheck = (push, setLoading) => {
  const pathname = usePathname();
  const { layoutMain } = translations['fa'];
  const userPermission = useSelector((state) => state.permissions.value);
  const [isPermissionLoaded, setIsPermissionLoaded] = useState(false);

  const checkExpTime = async () => {
    const token = getCookie('token');
    if (!token) {
      console.log("Token not found!");
      return false;
    }
    return true;
  };

  const checkUserAccessToUrl = async () => {
    let access = false;
    if (userPermission != null && userPermission.length > 0) {
      userPermission.forEach(permission => {
        if (permission.route === pathname) {
          access = true;
        }
      });
    }
    if (!access) {
      console.log("Permission Not granted!");
    }
    return access;
  };

  const securityCheck = async () => {
    try {
      const check1 = await checkExpTime();
      const check2 = await checkUserAccessToUrl();
      if (check1 && check2) {
        setLoading(false);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      useLogout(push);
    }
  };

  useEffect(() => {
    if (userPermission !== null && userPermission.length > 0) {
      setIsPermissionLoaded(true);
    }
  }, [userPermission]);

  useEffect(() => {
    if (isPermissionLoaded) {
      securityCheck();
    }
  }, [isPermissionLoaded, pathname]);
};

export default useSecurityCheck;
