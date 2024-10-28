'use client'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MateriaPrima() {
  return (
    <div className="p-4">
      <Header />
      <div className="text-base font-bold text-center">
  Adicionar novo fornecedor de Matéria Prima.
</div>


      <form className="mt-6">
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
          className="w-full px-3 py-2 mb-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o nome do fornecedor"
        />
        <div className="flex gap-4 mt-4">
          <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <Link href="/principal">Criar</Link>
          </Button>
          <Button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            <Link href="/principal">Voltar</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
