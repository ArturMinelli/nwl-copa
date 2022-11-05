import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NewPool } from '../screens/NewPool'
import { Pools } from '../screens/Pools'
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { FindPool } from '../screens/FindPool'
import { PoolDetails } from '../screens/PoolDetails'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  const iconsSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0
        }
      }}
    >
      <Screen
        name='newPool'
        component={NewPool}
        options={{
          tabBarLabel: "Novo bolão",
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={iconsSize}/>
          )
        }}
      />
      <Screen
        name='pools'
        component={Pools}
        options={{
          tabBarLabel: "Meus bolões",
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={iconsSize}/>
          )
        }}
      />
      <Screen
        name='findPool'
        component={FindPool}
        options={{
          tabBarButton: () => null
        }}
      />
      <Screen
        name='poolDetails'
        component={PoolDetails}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}