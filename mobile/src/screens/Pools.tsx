import { useState, useCallback } from 'react'
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from '../components/PoolCard';
import { Octicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { api } from "../lib/api";
import { Loading } from '../components/Loading';
import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
  const [pools, setPools] = useState<PoolCardProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPools() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      setPools(response.data.pools)
    }
    catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível carregar os bolões!',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools()
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões"/>

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button
          onPress={() => navigate('findPool')}
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md"/>}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ): (
        <FlatList
          data={pools}
          keyExtractor={(pool) => pool.id}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 120
          }}
          renderItem={({ item }) => (
            <PoolCard
              onPress={() => navigate('poolDetails', { id: item.id })}
              data={item}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyPoolList />
          )}
        />
      )}

    </VStack>
  )
}