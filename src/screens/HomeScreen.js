
import { Button, FlatList, Text, View } from 'react-native';
import { PizzaItem } from '../components/PizzaItem';
//import pizzas from '../data/dados';
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebaseConfig";
import { logout } from '../services/AuthService';
import { styles } from '../styles';

export function HomeScreen({ navigation }) {
  const [pizzas, setPizzas] = useState([]);

  useEffect( () => {
    const inscricao = onSnapshot(
      collection(db, "pizzas"), 
      (snapshot) => {
        const lista = [];
        
        snapshot.forEach( (doc) =>{
          lista.push( {
            id: doc.id,
            ...doc.data(),
          });
        });
  
        setPizzas(lista);
      }
    );
    return () => inscricao();
  } , []);

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

      <Button
        title="Cadastrar Pizza"
        onPress={() => navigation.navigate("CadastroPizza")}
      />

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