'use client'
import { Header } from '@/components/header'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function AllMateriaPrima() {
  const searchParams = useSearchParams()
  const fornecedor = searchParams.get('fornecedor')

  return (
    <div className="p-4">
      <Header />
      <Suspense fallback={<p>Carregando...</p>}>
        <p>Fornecedor: {fornecedor}</p>
      </Suspense>
    </div>
  )
}
