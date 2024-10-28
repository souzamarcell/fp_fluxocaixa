'use client';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../image/fabrica.png';
import { ValidateLogin } from '../utility/validateLogin';
import { useRouter } from 'next/navigation';

const users = [
  {
    "id": "marcell.souza",
    "name": "Marcell Ramos de Souza",
    "email": "marcell.ramos@gmail.com",
    "password": "Jesus@12",
    "phoneMobile": "(92)98123-6607",
    "role": "admin",
    "gender": "1",
    "image": "image/colaboradores/marcell.souza.png",
    "token": "311@#",
    "temp": ""
  },
  {
    "id": "rodrigo.martins",
    "name": "Rodrigo Martins",
    "email": "rodrigo.martins@gmail.com",
    "password": "Rodrigo@73",
    "phoneMobile": "(11)981",
    "role": "admin",
    "gender": "1",
    "image": "image/colaboradores/rodrigo.martins.png",
    "token": "311@#",
    "temp": ""
  }
];

export default function SignIn() {
  const numberOfLogos = 11; // Quantidade de logos a serem exibidos
  const [username, usernameUpdate] = useState('');
  const [password, passwordUpdate] = useState('');
  const router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    if (validate()) {
      console.log('Validou email e senha | ' + username);

      // Encontrando o usuário pelo username
      const user = users.find(user => user.id === username);
      if (!user) {
        toast.error('Usuário não encontrado');
        return;
      }

      // Verificando a senha
      if (user.password === password) {
        // Armazenando dados do usuário no sessionStorage
        sessionStorage.setItem('userrole', user.role);
        sessionStorage.setItem('userGender', user.gender);
        sessionStorage.setItem('token', user.token);

        const primeiroNome = username.split('.')[0];
        const segundoNome = username.split('.')[1];
        const userNameToShow = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
        const userNameToShowTwo = segundoNome.charAt(0).toUpperCase() + segundoNome.slice(1).toLowerCase();

        sessionStorage.setItem('name', userNameToShow);
        sessionStorage.setItem('nameTwo', userNameToShowTwo);

        toast.success(`${userNameToShow}, login realizado com sucesso!`);
        router.push('/principal');
      } else {
        toast.error('Não confere: Usuário ou senha');
      }
    }
  }

  const validate = () => {
    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos');
      return false;
    }
    return ValidateLogin(username, password, true);
  }

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
      <div className="bg-black hidden lg:flex w-full lg:w-[588px] justify-center items-center">
        <div className="flex flex-col items-center">
          {Array.from({ length: numberOfLogos }).map((_, index) => (
            <Image key={index} src={logo} alt={`Logo ${index + 1}`} width={119} height={30} />
          ))}
        </div>
      </div>
      <div className="flex w-full lg:w-[852px] justify-center items-center bg-[#F5F5F5] scale-[.80]">
        <div className="max-w-3xl mx-auto p-6">
          <div className="font-montserrat text-lg lg:hidden text-center mb-4 w-full bg-black text-white p-2 rounded font-semibold relative">Fábrica Próspera @2024</div>

          <div className="font-semibold text-3xl">Entrar com login 1.10.2</div>

          <div className="text-base text-gray-600">Faça login na sua conta</div>
          <div className="mt-6 bg-white rounded-lg p-6">
            <form className="mb-4 mx-2" onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-base text-black mb-1">Login</label>
                <input
                  type="text"
                  id="email"
                  placeholder="rodrigo.martins"
                  className="w-full h-12 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={username}
                  onChange={(e) => usernameUpdate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-base text-black mb-1">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="*******"
                  className="w-full h-12 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                  value={password}
                  onChange={(e) => passwordUpdate(e.target.value)}
                />
              </div>
              <button
                className="w-full h-10 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="submit"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
