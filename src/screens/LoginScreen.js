import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabase/supabaseClient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction de connexion
  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Erreur de connexion', error.message);
    setLoading(false);
  }

  // Fonction d'inscription
  async function handleSignUp() {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Erreur d\'inscription', error.message);
    else Alert.alert('Succès', 'Vérifie ta boîte mail pour valider ton compte !');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CapCut Clone</Text>
      <Text style={styles.subtitle}>Espace Développeur</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Mot de passe" 
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Chargement...' : 'Se connecter'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#1a1a24' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#6366f1', textAlign: 'center', marginBottom: 40, uppercase: true },
  input: { backgroundColor: '#2e2e3d', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#6366f1', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  signUpButton: { backgroundColor: '#475569', marginTop: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
