import { useState, useEffect } from 'react'
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '../lib/api';
import { Loading } from '../components/Loading';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';

interface RouteParams {
  id: string;
}

export function PoolDetails() {
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { params } = useRoute()
  const { id } = params as RouteParams

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPoolDetails() {
    try {

      setIsLoading(true)
      const poolDetailsResponse = await api.get(`/pools/${id}`)
      setPoolDetails(poolDetailsResponse.data.pool)

    }
    catch (err) {

      console.log(err)
      toast.show({
        title: "Houve um erro ao buscar pelo bolão solicitado!",
        placement: 'top',
        bgColor: "red.500"
      })
      return navigate('pools')

    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [])

  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Titulo do Bolão" showBackButton showShareButton/>

      {poolDetails._count.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails}/>

          <HStack bgColor="gray.800" p={1} mb={5} rounded="sm">
            <Option
              title='Seus bolões'
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title='Ranking do grupo'
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}

    </VStack>
  )
}