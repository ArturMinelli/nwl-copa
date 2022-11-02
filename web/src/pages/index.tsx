import mobileAppPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import avatars from '../assets/avatars.png'
import checkIcon from '../assets/check-icon.svg'
import Image from 'next/image'

interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa logo" />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image src={avatars} alt="Avatares de pessoas que já usam a aplicação" />

          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form action="">
          <input type="text" required placeholder="Qual o nome do seu bolão?" />
          <button type="submit">Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div>
          <div>
            <Image src={checkIcon} alt="" />
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={checkIcon} alt="" />
            <div>
              <span>+192.847</span>
              <span>Palpites enviados</span>
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

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()

//   console.log(data)

//   return {
//     props: {
//       count: data.count
//     },
//   }
// }
