import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const SlashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login'); // Navigate to Login after the splash screen
        }, 5000); // Adjust the duration as needed
    
        return () => clearTimeout(timer);
      }, [navigation]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.mainTitle}>PAWLSAR</Text>
      <Text style={styles.subTitle}>Your Pup's companion 🐾🐕</Text>
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/dog3.png')} style={styles.mainImage} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() =>navigation.replace('Login') }>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020202',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  logoContainer: {
    marginVertical: height * 0.03,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
  },
  mainTitle: {
    fontFamily: 'Roboto',
    fontSize: width * 0.09,
    fontWeight: '700',
    color: '#CC950F',
    textAlign: 'center',
    marginVertical: height * 0.01,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    width: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: width * 0.9,
    height: width * 0.9 * 0.7, // Increased aspect ratio
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10, // For Android shadow
    marginBottom: height * 0.02, // Adjusted to attach the button
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    width: width * 0.7,
    height: height * 0.08,
    backgroundColor: '#CC950F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10, // For Android shadow
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: width * 0.07,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default SlashScreen;
