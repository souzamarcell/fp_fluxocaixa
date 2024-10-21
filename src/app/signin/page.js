'use client'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../image/prolam.png'
import { ValidateLogin } from '../utility/validateLogin'
import { useRouter } from 'next/navigation'

export default function SignIn() {

    const numberOfLogos = 11; // Quantidade de logos a serem exibidos
    const [username, usernameupdate] = useState('')
    const [password, passwordupdate] = useState('')
    const router = useRouter();

    useEffect(() => {
        sessionStorage.clear()
        localStorage.clear()
    }, [])

    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        if (validate()) {
            console.log('Validou email e senha | ' + username)
            fetch(`http://localhost:8000/user/${username}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Usuário não encontrado');
                    }
                    return res.json()
                })
                .then((resp) => {
                    if (!resp || Object.keys(resp).length === 0) {
                        toast.error('Não confere: Usuário ou senha');
                    } else {
                        if (resp.password === password) {
                            sessionStorage.setItem('userrole', resp.role)
                            sessionStorage.setItem('userGender', resp.gender)
                            sessionStorage.setItem('userSetor', resp.sector)
                            sessionStorage.setItem('token', resp.token)
                            const primeiroNome = username.split('.')[0];
                            const segundoNome = username.split('.')[1];
                            sessionStorage.setItem('segundoNome', segundoNome)

                            const userNameToShow = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase()
                            toast.success(`${userNameToShow}, login realizado com sucesso!`)
                            sessionStorage.setItem('name', userNameToShow)

                            const userNameToShowTwo = segundoNome.charAt(0).toUpperCase() + segundoNome.slice(1).toLowerCase()
                            sessionStorage.setItem('nameTwo', userNameToShowTwo)

                            // Redireciona para a página principal
                            // router.push('/principal');
                            router.push('/principal');

                        } else {
                            toast.error('Não confere: Usuário ou senha');
                        }
                    }
                })
                .catch((err) => {
                    toast.error('Login não cadastrado!')
                })
        }
    }

    const validate = () => {
        let result = true
        if (ValidateLogin(username, password, result)) {
            return result
        }
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
                    <div className="font-montserrat text-lg lg:hidden text-center mb-4 w-full bg-black text-white p-2 rounded font-semibold relative">PROLAM 2024</div>
                    <div className="font-semibold text-3xl">Entrar com login</div>
                    <div className="text-base text-gray-600">Faça login na sua conta</div>

                    {/* <form onSubmit={ProceedLogin}> */}
                    <div className="mt-6 bg-white rounded-lg p-6">
                        <form className="mb-4 mx-2" onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-base text-black mb-1"
                                >
                                    {/* Endereço de e-mail */}
                                    Login
                                </label>
                                <input
                                    type="text"
                                    // type="email"
                                    id="email"
                                    placeholder="marcell.souza@prolam.com.br"
                                    className="w-full mr-20 h-12 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                                    value={username}
                                    onChange={(e) => usernameupdate(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-base text-black mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="*******"
                                    className="w-full h-12 px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                                    value={password}
                                    onChange={(e) => passwordupdate(e.target.value)}
                                />
                            </div>

                            <button
                                className="w-full h-10 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                // type="button"
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
