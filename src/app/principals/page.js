'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Principal() {
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token === '311@#') {
      console.log('Validou token: ' + token);
      setIsLoading(false); // Token válido, podemos parar de carregar e mostrar a página
    } else {
      sessionStorage.clear();
      localStorage.clear();
      console.log('Token inválido');
      router.push('/');
      toast.error('Favor fazer login!')
    }
  }, [router]);

  // Se estiver carregando, não renderiza nada até que a verificação do token seja feita
  if (isLoading) {
    return null;
    // return <div>
    //   carregando
    // </div>
  }

  return (
    <div>
      Principal
    </div>
  );
}
