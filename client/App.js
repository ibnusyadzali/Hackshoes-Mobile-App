import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigators/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./config/config";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}
