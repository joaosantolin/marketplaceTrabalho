import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { cadastrar, login } from '../services/AuthService';
import { styles } from '../styles';

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function fazerLogin() {
        try {
            validaCredenciais();
            await login(email, senha);
            console.log("Usuário autenticado com sucesso!");
        } catch (error) {
            console.log("Erro", error.message);
        }
    }

    async function fazerCadastro() {
        try {
            await cadastrar(email, senha);
            console.log("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.log("Erro", error.message);
        }
    }

    function validaCredenciais() {
        if (email === '' || senha === '') {
            return alert("Informe um e-mail e uma senha.");
        }

    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>TELA DE LOGIN</Text>
                <Text style={styles.paragraph}>Digite seu e-mail:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="example@gmail.com"
                    placeholderTextColor="gray"
                    onChangeText={setEmail}
                //value={email}
                />
                <Text style={styles.paragraph}>Digite sua senha:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="********"
                    placeholderTextColor="gray"
                    onChangeText={setSenha}
                    value={senha}
                />
                <Button title="CADASTRAR" onPress={fazerCadastro} />
                <Button title="LOGIN" onPress={fazerLogin} />
            </View>

        </View>
    );
}


/*
 <View>
          <Text style={styles.title}>Seu e-mail e sua senha são:</Text>
          <Text style={styles.paragraph}>E-mail: {email}</Text>
          <Text style={styles.paragraph}>Senha: {senha}</Text>

          <Button
            title="Voltar"
            onPress={() => setCredencial(false)}
          />
        </View>

*/