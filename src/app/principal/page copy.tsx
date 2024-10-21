'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import ChatOverview from '@/components/chart'
import Sales from '@/components/sales'
import Image from 'next/image'
import colaboradorImage2 from '../image/colaboradores/rodrigo.martins.jpg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DollarSign, Aperture, Users } from 'lucide-react'

export default function Principal() {
  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento
  const [name, setName] = useState('') // Estado para armazenar o nome do usuário
  const [nameTwo, setNameTwo] = useState('') // Estado para armazenar o nome do usuário
  const router = useRouter()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const colaboradorImage = '../image/colaboradores/rodrigo.martins.jpg'

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const storedName = sessionStorage.getItem('name')
    const storedNameTwo = sessionStorage.getItem('nameTwo')

    if (token === '311@#') {
      console.log(' Validou token: ' + token)
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

  // Se estiver carregando, não renderiza nada até que a verificação do token seja feita
  if (isLoading) {
    return null
    // return <div>
    //   carregando
    // </div>
  }

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  })

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Cabeçalho */}
      <header
        style={{
          backgroundColor: '#282c34',
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <article className="flex justify-between items-center w-full">
          {/* <div className="flex items-center gap-2 border-b py-2"> */}
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              {/* <AvatarImage src="https://github.com/mllsouza.png" /> */}
              {/* <AvatarImage src={colaboradorImage} /> */}
              <Image
                src={colaboradorImage2}
                alt={`Logo`}
                width={119}
                height={30}
              />
              {/* <AvatarFallback>DV</AvatarFallback> */}
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

          <h1>Fábrica Próspera - Fluxo de Caixa</h1>

          <div>
            {/* <div>21/10/2024</div>
            <div>11:05</div> */}
            <div>{currentDateTime.date}</div>
            <div>{currentDateTime.time}</div>
          </div>
        </article>
      </header>

      {/* Conteúdo principal */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Menu lateral */}
        <nav
          style={{
            width: '200px',
            backgroundColor: '#333',
            color: 'white',
            padding: '1rem',
          }}
        >
          {/* <ul style={{ listStyleType: 'none', padding: 0 }}> */}
          <ul
            style={{ listStyleType: 'none', padding: 0, fontSize: '0.875rem' }}
          >
            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={toggleSubMenu}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Fornecedores
              </div>
              {isSubMenuOpen && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>Matéria Prima</li>
                  <li style={{ margin: '0.5rem 0' }}>Equipamento</li>
                  <li style={{ margin: '0.5rem 0' }}>Serviços</li>
                </ul>
              )}
            </li>
            <li style={{ margin: '1rem 0' }}>Lançamentos Entradas</li>
            <li style={{ margin: '1rem 0' }}>Despesas / Custos Fixos</li>
            <li style={{ margin: '1rem 0' }}>Impostos e Comissões</li>
            <li style={{ margin: '1rem 0' }}>Financiamentos</li>
            <li style={{ margin: '1rem 0' }}>Relatórios</li>
          </ul>
        </nav>

        {/* Conteúdo principal */}
        <main style={{ flex: 1, padding: '1rem' }}>
          <h2>Bem-vindo ao Dashboard</h2>
          <p>Aqui vai o conteúdo principal da sua aplicação.</p>
        </main>
      </div>
    </div>
  )
}
