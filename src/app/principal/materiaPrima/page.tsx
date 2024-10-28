'use client'
import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MateriaPrima() {
  const [nomeFornecedor, setNomeFornecedor] = useState('') // Estado para armazenar o nome do fornecedor
  const [fornecedores, setFornecedores] = useState<string[]>([]) // Estado para armazenar a lista de fornecedores

  useEffect(() => {
    const bdMateriaPrima = 'materiaPrima'
    const storedFornecedores = localStorage.getItem(bdMateriaPrima)

    if (storedFornecedores) {
      try {
        const parsedFornecedores = JSON.parse(storedFornecedores)
        if (Array.isArray(parsedFornecedores)) {
          setFornecedores(parsedFornecedores)
        }
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error)
        localStorage.removeItem(bdMateriaPrima)
      }
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const bdMateriaPrima = 'materiaPrima'

    // Adiciona o novo fornecedor à lista
    const updatedFornecedores = [...fornecedores, nomeFornecedor]
    setFornecedores(updatedFornecedores)

    // Armazenando no localStorage
    localStorage.setItem(bdMateriaPrima, JSON.stringify(updatedFornecedores))

    setNomeFornecedor('') // Limpa o campo após o envio
  }

  const handleDelete = (index: number) => {
    const updatedFornecedores = fornecedores.filter((_, i) => i !== index)
    setFornecedores(updatedFornecedores)
    localStorage.setItem('materiaPrima', JSON.stringify(updatedFornecedores)) // Atualiza o localStorage
  }

  const handleEdit = (index: number) => {
    const newFornecedor = prompt(
      'Digite o novo nome do fornecedor:',
      fornecedores[index]
    )
    if (newFornecedor) {
      const updatedFornecedores = fornecedores.map((fornecedor, i) =>
        i === index ? newFornecedor : fornecedor
      )
      setFornecedores(updatedFornecedores)
      localStorage.setItem('materiaPrima', JSON.stringify(updatedFornecedores)) // Atualiza o localStorage
    }
  }

  return (
    <div className="p-4">
      <Header />
      <div className="text-base font-bold text-center">
        Adicionar novo fornecedor de Matéria Prima.
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="nomeFornecedor"
        >
          Nome do Fornecedor da Matéria Prima:
        </label>
        <input
          type="text"
          id="nomeFornecedor"
          name="nomeFornecedor"
          value={nomeFornecedor}
          onChange={(e) => setNomeFornecedor(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o nome do fornecedor"
        />
        <Button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Criar
        </Button>
        <Button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          <Link href="/principal">Voltar</Link>
        </Button>
      </form>

      <ul className="mt-4">
        {fornecedores.map((fornecedor, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-gray-800 mt-2 bg-gray-200"
          >
            <span>{fornecedor}</span>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Apagar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
