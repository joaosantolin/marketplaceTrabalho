import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CadastroPizzaScreen } from '../screens/CadastroPizzaScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Lista de Pizzas" }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="CadastroPizza"
        component={CadastroPizzaScreen} />
    </Stack.Navigator>
  );
}
