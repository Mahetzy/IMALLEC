import React, { useState } from 'react'; 
import { Platform, StyleSheet, TextInput, Button } from 'react-native'; 
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [valorInput, setValorInput] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" >Log in </ThemedText>
        
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Correo electrónico</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="tu correo @email.com"
          placeholderTextColor="#888"
          value={valorInput}
          onChangeText={setValorInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Contraseña</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#888"
          value={valorInput}
          onChangeText={setValorInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </ThemedView>
      <ThemedView style={styles.buttom}>
        <Button 
          title="Log in" 
          color="#004695"
          onPress={() => alert('¡Botón presionado!')} 
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: -200,
  
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttom:{
    borderWidth: 10,
    borderColor: '#004695',
    backgroundColor: '#004695',
    borderRadius: 100,
    fontSize: 16,
    marginLeft: 100,
    marginRight: 100,
  }
});