'use client'
import { Header } from '@/components/header'
import { useEffect, useState } from 'react'

export default function AllMateriaPrima() {
  const [fornecedor, setFornecedor] = useState('')

  useEffect(() => {
    const storedFornecedor = sessionStorage.getItem('MateriaPrima')
    if (storedFornecedor) {
      setFornecedor(storedFornecedor)
    }
  }, [])

  return (
    <div className="p-4">
      <Header />
      {/* <p>Bom vindo</p> */}
      <p>Fornecedor: {fornecedor ? fornecedor : "Nenhum"}</p>
    </div>
  )
}
