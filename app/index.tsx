import HomeStack from "../src/navigation/HomeStack";

export default function AppEntry() {
  // Como o Expo Router já engloba o app em um NavigationContainer, 
  // basta renderizarmos o nosso Stack customizado aqui.
  return <HomeStack />;
}