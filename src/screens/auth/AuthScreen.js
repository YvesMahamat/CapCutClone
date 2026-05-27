import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setAuthLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        Alert.alert('Succès', 'Inscription réussie !');
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CapCut Clone</Text>
      <Text style={styles.subtitle}>{isSignUp ? 'Création de compte' : 'Connexion'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={authLoading}>
        {authLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isSignUp ? "S'inscrire" : 'Se connecter'}</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.switchLink}>
        <Text style={styles.switchText}>
          {isSignUp ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Créez-en un'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 18, color: '#888', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007FFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  switchLink: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#007FFF', fontSize: 14 }
});
