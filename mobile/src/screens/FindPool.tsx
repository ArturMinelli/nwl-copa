import { useState } from 'react'
import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../lib/api";
import { useNavigation } from '@react-navigation/native';

export function FindPool() {
  const [poolCode, setPoolCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toast = useToast()
  const { navigate } = useNavigation()

  async function handleJoinPool() {
    try {

      setIsLoading(true)

      if(!poolCode.trim()) {
        return toast.show({
          title: 'Informe o código do bolão!',
          placement: 'top',
          bgColor: 'green.500'
        })
      }

      await api.post('/pools/join', {
        code: poolCode,
      })

      toast.show({
        title: 'Você está agora participando desse bolão!',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('pools')

    } catch (err) {

      console.log(err)
      setIsLoading(false)

      if(err.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: 'Não foi possível encontrar esse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if(err.response?.data?.message === "You've already have joined this pool") {
        return toast.show({
          title: 'Você já está participando desse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      return toast.show({
        title: 'Não foi possível buscar por esse bolão!',
        placement: 'top',
        bgColor: 'red.500'
      })

    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton/>

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          onChangeText={setPoolCode}
          autoCapitalize="characters"
          value={poolCode}
          placeholder="Qual o código do bolão?"
        />

        <Button
          title="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}