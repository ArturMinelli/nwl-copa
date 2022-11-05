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
          onGuessConfirm={() => null}
        />
      )}
    />
  );
}
