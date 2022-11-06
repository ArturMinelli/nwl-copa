import { useState, useEffect } from 'react'
import { Box, FlatList, Text, useToast } from 'native-base';
import { api } from '../lib/api';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [games, setGames] = useState<GameProps[]>([] as GameProps[])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const toast = useToast()

  async function getGames() {

    try {

      setIsLoading(true)
      const gamesResponse = await api.get(`/pools/${poolId}/games`);
      console.log(gamesResponse.data.games)
      setGames(gamesResponse.data.games)

    }
    catch (err) {

      console.log(err)
      toast.show({
        title: "Não foi possível carregar os jogos desse bolão!",
        placement: 'top',
        color: 'red.500'
      })
      throw err

    }
    finally {

      setIsLoading(false)

    }
  }

  async function handleConfirmGuess(gameId: string) {

    try {

      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe a pontuação para ambos os times!",
          placement: 'top',
          color: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: "O seu palpite foi registrado com sucesso!",
        placement: 'top',
        color: 'green.500'
      })

      getGames()

    }
    catch (err) {

      console.log(err)
      toast.show({
        title: "Não foi possível registrar o seu palpite!",
        placement: 'top',
        color: 'red.500'
      })
      throw err

    }
    finally {

    }
  }

  useEffect(() => {
    getGames()
  }, [])

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(game) => game.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
        />
      )}
    />
  );
}
