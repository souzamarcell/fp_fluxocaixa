import { Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export default function Sales() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-x1 text-gray-800 select-nome">
            Produção
          </CardTitle>
          <Users className="ml-auto w-4 h-4" />
        </div>
        <CardDescription>Novas Bobinas fabricadas</CardDescription>
      </CardHeader>

      <CardContent>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/souzamarcell.png" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Marcell Souza</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              marcell@9net.com.br
            </span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/mllsouza.png" />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Marcell Souza</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              marcell@9net.com.br
            </span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="w-full h-full rounded-full"
              src="https://github.com/mllsouza.png"
            />
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Marcell Souza</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              marcell@9net.com.br
            </span>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
