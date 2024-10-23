'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Image from 'next/image'
import colaboradorImage2 from '../image/colaboradores/rodrigo.martins.jpg'
import { Avatar } from '@radix-ui/react-avatar'

type MenuKeys_a = 'fornecedores' | 'materiaPrima' | 'equipamento' | 'servicos'
type MenuKeys_b = 'lancamentos'
type MenuKeys_c = 'despesasCustos'


export default function Principal() {
  const [isLoading, setIsLoading] = useState(true) // Estado de carregamento
  const [name, setName] = useState('') // Estado para armazenar o nome do usuário
  const [nameTwo, setNameTwo] = useState('') // Estado para armazenar o nome do usuário
  const router = useRouter()

  // Estado para controlar submenus
  const [openSubMenus_a, setopenSubMenus_a] = useState({
    fornecedores: false,
    materiaPrima: false,
    equipamento: false,
    servicos: false,
  })

  const [openSubMenus_b, setopenSubMenus_b] = useState({
    lancamentos: false,
  })

  const [openSubMenus_c, setopenSubMenus_c] = useState({
    despesasCustos: false,
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

  if (isLoading) {
    return null
  }

  const toggleSubMenu_a = (menu: MenuKeys_a) => {
    setopenSubMenus_a((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const toggleSubMenu_b = (menu: MenuKeys_b) => {
    setopenSubMenus_b((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const toggleSubMenu_c = (menu: MenuKeys_c) => {
    setopenSubMenus_c((prev) => ({
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
            {/* *** Fornecedores *** */}
            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={() => toggleSubMenu_a('fornecedores')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Fornecedores
              </div>
              {openSubMenus_a.fornecedores && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>
                    <div
                      onClick={() => toggleSubMenu_a('materiaPrima')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Matéria Prima
                    </div>
                    {openSubMenus_a.materiaPrima && (
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
                      onClick={() => toggleSubMenu_a('equipamento')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Equipamento
                    </div>
                    {openSubMenus_a.equipamento && (
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
                      onClick={() => toggleSubMenu_a('servicos')}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Serviços
                    </div>
                    {openSubMenus_a.servicos && (
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
            {/* *** Lançamentos Entradas *** */}
            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={() => toggleSubMenu_b('lancamentos')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Lançamentos Entradas
              </div>
              {openSubMenus_b.lancamentos && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>Projeto1</li>
                  <li style={{ margin: '0.5rem 0' }}>Setor B</li>
                  <li style={{ margin: '0.5rem 0' }}>Setor C</li>
                  <li style={{ margin: '0.5rem 0' }}>Ferias</li>
                  <li style={{ margin: '0.5rem 0' }}>Internet</li>
                  <li style={{ margin: '0.5rem 0' }}>Revendas</li>
                  <li style={{ margin: '0.5rem 0' }}>Total Entradas</li>
                </ul>
              )}
            </li>
            {/* *** Despesas / Custos Fixos *** */}
            <li style={{ margin: '1rem 0' }}>
              <div
                onClick={() => toggleSubMenu_c('despesasCustos')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                Despesas / Custos Fixos
              </div>
              {openSubMenus_c.despesasCustos && (
                <ul
                  style={{
                    listStyleType: 'none',
                    paddingLeft: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <li style={{ margin: '0.5rem 0' }}>Salário Adiantamento</li>
                  <li style={{ margin: '0.5rem 0' }}>Obrigações e Enc Sociais</li>
                  <li style={{ margin: '0.5rem 0' }}>Água</li>
                  <li style={{ margin: '0.5rem 0' }}>Energia Elétrica</li>
                  <li style={{ margin: '0.5rem 0' }}>Telefone / Internet</li>
                  <li style={{ margin: '0.5rem 0' }}>Aluguel / IPTU / Cond</li>
                  <li style={{ margin: '0.5rem 0' }}>Material Esc. Mercado</li>
                  <li style={{ margin: '0.5rem 0' }}>Gás</li>
                  <li style={{ margin: '0.5rem 0' }}>Vale Refeição</li>
                  <li style={{ margin: '0.5rem 0' }}>Vale Transporte</li>
                  <li style={{ margin: '0.5rem 0' }}>Sistemas</li>
                  <li style={{ margin: '0.5rem 0' }}>Sindicato + Med</li>
                  <li style={{ margin: '0.5rem 0' }}>Contador</li>
                  <li style={{ margin: '0.5rem 0' }}>Estacionamento</li>
                  <li style={{ margin: '0.5rem 0' }}>Despesas Bancárias</li>
                  <li style={{ margin: '0.5rem 0' }}>pró-labore</li>
                  <li style={{ margin: '0.5rem 0' }}>Prêmios Confr</li>
                  <li style={{ margin: '0.5rem 0' }}>Treinamentos</li>
                  <li style={{ margin: '0.5rem 0' }}>Seguros</li>
                  <li style={{ margin: '0.5rem 0' }}>Limpeza</li>
                  <li style={{ margin: '0.5rem 0' }}>Reservas</li>
                  <li style={{ margin: '0.5rem 0' }}>Jurídico</li>
                  <li style={{ margin: '0.5rem 0' }}>Total Despesas</li>
                </ul>
              )}
            </li>
            {/* **************** */}
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
