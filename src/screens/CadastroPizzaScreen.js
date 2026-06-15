import { addDoc, collection } from "firebase/firestore";
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { db } from "../firebaseConfig";

export function CadastroPizzaScreen({navigation}) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    async function salvarPizza(){
        try{
            await addDoc(
                collection(db, "pizzas"),
                {
                    nome,
                    descricao
                }
            );
            console.log("Cadastrado com sucesso!");
            navigation.goBack();
        } catch(error) {
            console.log("Erro: ", error.message);
        }
    }

    return(
        <View>
            <Text>CADASTRO DE PIZZAS</Text>

            <TextInput
                placeholder="Nome da Pizza"
                onChangeText={setNome}
                value={nome}
            />
            <TextInput
                placeholder="Descrição da Pizza"
                onChangeText={setDescricao}
                value={descricao}
            />
            <Button
                title="Salvar Pizza"
                onPress={salvarPizza}
            />
        </View>
    );
}