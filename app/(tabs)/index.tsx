
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function HomeScreen() {
  const [valorInput, setValorInput] = useState('');
  const [valorInputpassword, setValorInputpassword] = useState('');

  return (
    <ThemedView style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg height="2700" width="150%" viewBox=" -4 -50 60 1050" preserveAspectRatio="none">
          <Path
            d="M -1,-100 C 0,350 200,110 -40,510 Z"
            fill="#00162F"
            opacity="1"
          />
        </Svg>
      </View>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>Log in </ThemedText>

      </View>

      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Correo electrónico</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Escriba su correo electrónico:"
          placeholderTextColor="#888"
          value={valorInput}
          onChangeText={setValorInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Contraseña</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Escriba su contraseña:"
          placeholderTextColor="#888"
          value={valorInputpassword}
          onChangeText={setValorInputpassword}
          secureTextEntry
        />
      </View>
      <Link href="/modal" style={styles.link}>
        <ThemedText>¿Olvidaste tu contraseña?</ThemedText>
      </Link>
      <View style={styles.buttom}>
        <Button
          title="Log in"
          color="#004695"
          onPress={() => {alert("se ha presionado el boton")}}
        />
      </View>
      <ThemedText type="subtitle" style={styles.text}>¿No tienes cuenta?</ThemedText>
      <Link href="/modal" style={styles.link2}>
        <ThemedText type='link'>Registrate</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginBottom: -170,
    
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30,
    height: 90,
  },
  titleText: {
    fontSize: 70, 
    fontWeight: 'bold',
    height: 80,
    paddingBottom: -200,
    paddingTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttom: {
    borderWidth: 10,
    borderColor: '#004695',
    backgroundColor: '#004695',
    borderRadius: 100,
    fontSize: 20,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 80,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  link: {
    marginTop: 5,
    paddingVertical: 15,
    alignSelf: 'center',
    color: '#fff', 
    fontWeight: 'bold',
  },
  link2: {
    marginTop: 5,
    paddingVertical: 15,
    alignSelf: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 25,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
  },
});

