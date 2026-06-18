
import { Button, FlatList, Text, View } from 'react-native';
import { PizzaItem } from '../components/PizzaItem';
import pizzas from '../data/dados';
import { logout } from '../services/AuthService';
import { styles } from '../styles';

export function HomeScreen({ navigation }) {
  async function sair(){
    console.log("Usuário saiu!");
    await logout();
  }

  return (
    <View>
      <Text>Tela Home</Text>
      <View>
        <Text>Usuário Logado </Text>
        <Button
          title="Sair"
          onPress={sair}
        />
      </View>

      <FlatList
        style={{flex: 1}}
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PizzaItem
            pizza={item}
            onPress={ () =>
          navigation.navigate("Detail", {pizza: item})}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.subtitulo}>Nenhuma pizza encontrada</Text>
        }
       
      />

      <Button
        title="Ir para Tela Sobre"
        onPress={() => navigation.navigate("About")}
      />
    </View>
  )
}