import { deleteCookie } from 'cookies-next';


const useSecurityCheck = (push) => {

  const hostname = window.location.hostname;
  deleteCookie('token');
  deleteCookie('userName');
  deleteCookie('sessionTime');
  push('/dashboard/login');

};

export default useSecurityCheck;
