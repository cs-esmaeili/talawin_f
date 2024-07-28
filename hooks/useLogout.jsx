import { deleteCookie } from 'cookies-next';


const useSecurityCheck = (push) => {

  const hostname = window.location.hostname;
  deleteCookie('token', { path: '/', domain: hostname });
  deleteCookie('user', { path: '/', domain: hostname });
  deleteCookie('userName', { path: '/', domain: hostname });
  deleteCookie('role', { path: '/', domain: hostname });
  localStorage.removeItem('userPermission');
  push('/dashboard/login');

};

export default useSecurityCheck;
