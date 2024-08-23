import { deleteCookie } from 'cookies-next';


const useSecurityCheck = (push) => {

  const hostname = window.location.hostname;
  deleteCookie('token');
  deleteCookie('userName');
  push('/dashboard/login');

};

export default useSecurityCheck;
