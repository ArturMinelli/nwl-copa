import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/nlw-copa-logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../lib/api";
import { useState } from "react";
import { Alert } from "react-native";

export function NewPool() {
  const [poolTitle, setPoolTitle] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()

  async function handleCreatePool() {
    if(!poolTitle.trim()) {
      return toast.show({
        title: "Informe um nome para seu bolão!",
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)
      await api.post('/pools', {
        title: poolTitle,
      })
    }
    catch (err) {
      console.log(err)

      toast.show({
        title: "Não foi possível criar seu bolão!",
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    finally {
      setPoolTitle('')
      setIsLoading(false)

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: 'top',
        bgColor: 'green.500',
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão"/>

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          onChangeText={setPoolTitle}
          value={poolTitle}
          placeholder="Qual o nome do seu bolão?"
        />

        <Button
          title="Cirar meu bolão"
          onPress={handleCreatePool}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}