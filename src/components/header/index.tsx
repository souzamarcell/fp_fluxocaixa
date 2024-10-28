'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
// import colaboradorImage2 from '../image/colaboradores/rodrigo.martins.jpg'
import colaboradorImage2 from '../../app/image/colaboradores/rodrigo.martins.jpg'
import { Avatar } from '@radix-ui/react-avatar'
// import Link from 'next/link'
// import { Header } from '@/components/header'

export function Header() {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('') // Estado para armazenar o nome do usuário
  const [nameTwo, setNameTwo] = useState('') // Estado para armazenar o nome do usuário
  const router = useRouter()
  // const [isNavOpen, setIsNavOpen] = useState(true)

  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  })

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const storedName = sessionStorage.getItem('name')
    const storedNameTwo = sessionStorage.getItem('nameTwo')

    if (token === '311@#') {
      console.log('Validou token: ' + token)
      setName(storedName || '') // Se o nome for null, atribui uma string vazia
      setNameTwo(storedNameTwo || '') // Define o nome do usuário no estado
      setIsLoading(false) // Token válido, podemos parar de carregar e mostrar a página
    } else {
      sessionStorage.clear()
      localStorage.clear()
      console.log('Token inválido')
      router.push('/')
      toast.error('Favor fazer login!')
    }
  }, [router])

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const formattedDate = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      const formattedTime = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

      setCurrentDateTime({
        date: formattedDate,
        time: formattedTime,
      })
    }

    updateDateTime() // Atualiza imediatamente ao montar o componente
    const intervalId = setInterval(updateDateTime, 1000) // Atualiza a cada segundo

    return () => clearInterval(intervalId) // Limpa o intervalo quando o componente for desmontado
  }, [])

  return (
    <div>
      {/* Header novo */}
      <header className="bg-[#282c34] text-white p-4 text-center">
        <article className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                src={colaboradorImage2}
                alt={`Logo`}
                width={120}
                height={30}
              />
            </Avatar>
            <div className="text-gray-400">
              <p className="text-sm sm:text-base">
                {name} {nameTwo}
              </p>
              <span className="text-[12px] sm:text-sm">
                rodrigo.martins@gmail.com
              </span>
            </div>
          </div>

          <h1 className="hidden lg:block">Fábrica Próspera - Fluxo de Caixa</h1>
          <div className="text-[12px] sm:text-sm">
            <h1 className="block lg:hidden">Fluxo</h1>
            <h2 className="block lg:hidden"> de </h2>
            <h2 className="block lg:hidden"> Caixa </h2>
          </div>

          <div className="text-[12px] sm:text-sm text-gray-400">
            <div>{currentDateTime.date}</div>
            <div>{currentDateTime.time}</div>
          </div>
        </article>
      </header>
    </div>
  )
}
