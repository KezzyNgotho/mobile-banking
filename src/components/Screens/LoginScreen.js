import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Text, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import checkedIconImage from '../assets/icons8-checked-50.png';
import uncheckedIconImage from '../assets/icons8-unchecked-24.png';
import eyeOffIconImage from '../assets/icons8-eye-64.png';
import eyeIconImage from '../assets/icons8-eye-32.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Splash');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Password Reset Error:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>
        Login
      </Text>
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        labelStyle={styles.label}
      />
      <Input
        label="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => setPassword(text)}
        labelStyle={styles.label}
        rightIcon={
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={showPassword ? eyeIconImage : eyeOffIconImage}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        }
      />
      <CheckBox
        title="Remember Me"
        checked={rememberMe}
        onPress={() => setRememberMe(!rememberMe)}
        containerStyle={styles.checkBoxContainer}
        textStyle={styles.checkBoxText}
        checkedIcon={<Image source={checkedIconImage} style={styles.checkboxIcon} />} // Checked image
        uncheckedIcon={<Image source={uncheckedIconImage} style={styles.checkboxIcon} />} // Unchecked image
      />
      <Button title="Login" onPress={handleLogin} buttonStyle={styles.button} />
      <Button
        title="Forgot Password"
        onPress={handleForgotPassword}
        type="clear"
        titleStyle={styles.forgotPasswordButton}
      />
      <Button
        title="Don't have an account? Register"
        onPress={handleRegister}
        type="clear"
        titleStyle={styles.registerButton}
      />
      {/* Watermark */}
      <View style={styles.watermarkContainer}>
        <Text style={styles.watermark}>zzuri bank - We are proud you!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eyeIcon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    position: 'relative',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    marginTop: 10,
  },
  forgotPasswordButton: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  registerButton: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  checkBoxText: {
    color: '#007bff',
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Background color with transparency
  },
  watermark: {
    textAlign: 'center',
    marginTop: 20,
    color: 'green',
    textDecorationColor: 'red',
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
  },
  checkboxIcon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;
