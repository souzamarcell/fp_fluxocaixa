import { toast } from 'react-toastify';

export const ValidateLogin = (username: string | null, password: string | null, result: boolean) => {
  // let result = true;
  if ((password === '' || password === null) && (username === '' || username === null)) {
    result = false;
    toast.warning('Por favor, entrar com um usuário e senha!');
  }
  else if (username === '' || username === null) {
    result = false;
    toast.warning('Por favor, entrar com um usuário!');
  }
  else if (password === '' || password === null) {
    result = false;
    toast.warning('Por favor, entrar com uma senha!');
  }
  return result;
};
