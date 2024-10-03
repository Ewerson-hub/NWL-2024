import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'

import logo from '../assets/logo-in-orbit.svg'
import letsStartIllustration from '../assets/lets-start-illustrition.svg'

export function EmptyGoals() {
  return (
    <div className="max-h-full flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo" />
      <img src={letsStartIllustration} alt="letsStartIllustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar Meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
