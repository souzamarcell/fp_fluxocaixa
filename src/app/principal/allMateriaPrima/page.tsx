'use client'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'

export default function AllMateriaPrima() {
  const searchParams = useSearchParams()
  const fornecedor = searchParams.get('fornecedor')

  return (
    <div className="p-4">
      <Header />
      <p>Fornecedor: {fornecedor}</p>
    </div>
  )
}
