'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import colaboradorImage2 from '../image/colaboradores/rodrigo.martins.jpg'
import { Avatar } from '@radix-ui/react-avatar'

type MenuKeys = 'fornecedores' | 'materiaPrima' | 'equipamento' | 'servicos'
type MenuKeysLan = 'lancamentos | Projeto1 | Projeto2 | Projeto3'

export default function Principal() {
  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento
  const [name, setName] = useState('') // Estado para armazenar o nome do usuário
  const [nameTwo, setNameTwo] = useState('') // Estado para armazenar o nome do usuário
  const router = useRouter()

  // Estado para controlar submenus
  const [openSubMenus, setOpenSubMenus] = useState({
    fornecedores: false,
    materiaPrima: false,
    equipamento: false,
    servicos: false,
  })

  const [openSubMenusLan, setOpenSubMenusLan] = useState({
    lancamentos: false,
    Projeto1: false,
    Projeto2: false,
    Projeto3: false,
  })

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

  // Se estiver carregando, não renderiza nada até que a verificação do token seja feita
  if (isLoading) {
    return null
  }
  
  const toggleSubMenu = (menu: MenuKeys) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const toggleSubMenuLan = (menu: MenuKeysLan) => {
    setOpenSubMenusLan((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

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
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={colaboradorImage2}
                alt={`Logo`}
                width={119}
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
          <ul
            style={{ listStyleType: 'none', padding: 0, fontSize: '0.875rem' }}
          >

            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={() => toggleSubMenu('fornecedores')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Fornecedores
              </div>
              {openSubMenus.fornecedores && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenu('materiaPrima')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Matéria Prima
                    </div>
                    {openSubMenus.materiaPrima && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>
                          Ferramentas do Projeto
                        </li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 1</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 2</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 3</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 4</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 5</li>
                        <li style={{ margin: '0.5rem 0' }}>
                          Total Fornecedores
                        </li>
                      </ul>
                    )}
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenu('equipamento')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Equipamento
                    </div>
                    {openSubMenus.equipamento && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor A</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor B</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor C</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor D</li>
                        <li style={{ margin: '0.5rem 0' }}>
                          Total Fornecedores
                        </li>
                      </ul>
                    )}
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenu('servicos')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Serviços
                    </div>
                    {openSubMenus.servicos && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>Serviço 1</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 2</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 3</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 4</li>
                        <li style={{ margin: '0.5rem 0' }}>Total Serviços</li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={() => toggleSubMenuLan('lancamentos')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Lançamentos Entradas
              </div>
              {openSubMenusLan.lancamentos && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenuLan('Projeto1')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Projeto 1
                    </div>
                    {openSubMenusLan.Projeto1 && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>
                          Ferramentas do Projeto
                        </li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 1</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 2</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 3</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 4</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor 5</li>
                        <li style={{ margin: '0.5rem 0' }}>
                          Total Fornecedores
                        </li>
                      </ul>
                    )}
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenuLan('projeto2')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      projeto 2
                    </div>
                    {openSubMenusLan.projeto2 && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor A</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor B</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor C</li>
                        <li style={{ margin: '0.5rem 0' }}>Fornecedor D</li>
                        <li style={{ margin: '0.5rem 0' }}>
                          Total Fornecedores
                        </li>
                      </ul>
                    )}
                  </li>
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenu('projeto3')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      projeto 3
                    </div>
                    {openSubMenus.projeto3 && (
                      <ul
                        style={{
                          listStyleType: 'none',
                          paddingLeft: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <li style={{ margin: '0.5rem 0' }}>Serviço 1</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 2</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 3</li>
                        <li style={{ margin: '0.5rem 0' }}>Serviço 4</li>
                        <li style={{ margin: '0.5rem 0' }}>Total Serviços</li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li style={{ margin: '1rem 0' }}>Despesas / Custos Fixos</li>
            <li style={{ margin: '1rem 0' }}>Impostos e Comissões</li>
            <li style={{ margin: '1rem 0' }}>Financiamentos</li>
            <li style={{ margin: '1rem 0' }}>Relatórios</li>
          </ul>
        </nav>

        {/* Conteúdo principal */}
        <main style={{ flex: 1, padding: '1rem' }}>
          <h2>Bem-vindo ao Dashboard</h2>
          <div className="text-white">.</div>
          <div>Fábrica Próspera</div>
          <div>Fluxo de Caixa</div>
        </main>
      </div>
    </div>
  )
}
