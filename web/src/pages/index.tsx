import mobileAppPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import avatars from '../assets/avatars.png'
import checkIcon from '../assets/check-icon.svg'
import Image from 'next/image'
import { api } from '../lib/axios'

interface HomeProps {
  poolsCount: number;
  guessesCount: number;
  usersCount: number;
}

export default function Home({ poolsCount, guessesCount, usersCount }: HomeProps) {
  return (
    <div className='max-w-[1124px] mx-auto h-screen items-center flex gap-28'>
      <main>
        <Image src={logoImg} alt="NLW Copa logo" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatars} alt="Avatares de pessoas que já usam a aplicação" quality={100}/>

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form action="" className='mt-10 flex gap-2'>
          <input
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
          />
          <button
            type="submit"
            className='uppercase text-gray-900 text-sm font-bold px-6 py-4 bg-yellow-500 rounded hover:bg-yellow-700'
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between'>
          <div className='flex items-center gap-6'>
            <Image src={checkIcon} alt="" />
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-bold text-gray-100'>+{poolsCount}</span>
              <span className='text-gray-300'>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-10 bg-gray-600'/>

          <div className='flex items-center gap-6'>
            <Image src={checkIcon} alt="" />
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-bold text-gray-100'>+{guessesCount}</span>
              <span className='text-gray-300'>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={mobileAppPreviewImg}
        alt="Imagem de dois telefones mostrando um preview do app mobile"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolsCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  }
}
