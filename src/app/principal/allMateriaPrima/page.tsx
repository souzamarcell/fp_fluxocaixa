'use client'
import { Header } from '@/components/header'
import { useSearchParams } from 'next/navigation'

export default function AllMateriaPrima() {
  const searchParams = useSearchParams()
  const fornecedor = searchParams.get('fornecedor')

  return (
    <div className="p-4">
      <Header />
      <p>Fornecedor: {fornecedor ? fornecedor : "Nenhum fornecedor selecionado"}</p>
    </div>
  )
}
