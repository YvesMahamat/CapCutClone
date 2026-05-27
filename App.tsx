import React from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/auth/AuthScreen';

function NavigationWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007FFF" />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <View style={styles.placeholderContainer}>
      {/* Zone DÉV 2 Navigation */}
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <StatusBar barStyle="light-content" />
        <NavigationWrapper />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  placeholderContainer: { flex: 1, backgroundColor: '#121212' }
});
