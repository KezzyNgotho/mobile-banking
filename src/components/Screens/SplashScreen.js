import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  // Function to navigate to the main screen after animation
  const navigateToMain = () => {
    setIsLoading(false);
    navigation.navigate('Main');
  };

  useEffect(() => {
    // Start the animation on component mount
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Use react-native-animatable library for animations
    if (logoRef && mottoRef && welcomeRef) {
      // You can customize the animation types and durations
      logoRef.fadeIn(1500);
      mottoRef.fadeIn(1500, 1000);
      welcomeRef.fadeIn(1500, 2000).then(navigateToMain);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        ref={(ref) => (logoRef = ref)}
        source={require('../assets/zzuri.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animatable.Text
        ref={(ref) => (mottoRef = ref)}
        style={styles.motto}
        animation="fadeIn"
      >
        zzuri bank - We are proud you!
      </Animatable.Text>
      <Animatable.Text
        ref={(ref) => (welcomeRef = ref)}
        style={styles.welcomeMessage}
        animation="fadeIn"
      >
        Welcome to zzuri bank!
      </Animatable.Text>
      {isLoading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#007bff" // Customize loading indicator color
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize background color
  },
  logo: {
    width: 200, // Customize logo width
    height: 200, // Customize logo height
  },
  motto: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
    textDecorationColor: 'red',
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
  },
  welcomeMessage: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Customize welcome message color
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default SplashScreen;
