import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Funções de autenticação
export const onLogin = async () => {
  const user = await GoogleSignin.signIn();
  return user;
};

export const onLogout = () => {
  GoogleSignin.signOut();
};

GoogleSignin.configure({
  webClientId: "CHAVE_FIREBASE_CLIENTE",
});

// Componente de indicador de carregamento
const LoadingIndicator = ({ isVisible }) => (
  isVisible && <ActivityIndicator />
);

// Tela de Login
const LoginScreen = ({ login }) => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const handleLoginUser = async () => {
    try {
      setIsSigninInProgress(true);
      const user = await onLogin();
      console.log(user);
      login(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigninInProgress(false);
    }
  };

  return (
    <View style={styles.layout}>
      <LoadingIndicator isVisible={isSigninInProgress} />
      <Text style={styles.title}>Login</Text>
      <Button
        title="Entrar"
        onPress={() => handleLoginUser()}
        color="#007AFF" // Altere a cor conforme necessário
      />
    </View>
  );
};

// Tela Inicial
const HomeScreen = ({ login }) => (
  <View style={styles.layout}>
    <Text style={styles.title}>Home</Text>
    <Button title="Sair" onPress={() => onLogout().then(() => login(false))} />
  </View>
);

// Componente principal
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={styles.container}>
      {isAuthenticated ? <HomeScreen login={setIsAuthenticated} /> : <LoginScreen login={setIsAuthenticated} />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
