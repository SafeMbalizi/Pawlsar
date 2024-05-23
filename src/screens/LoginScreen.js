import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const animatedStyle = {
    opacity: animation,
  };

  const isSmallScreen = width < 600;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="#B0B0B0" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButton} onPress={ () => navigation.navigate('Home')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orLoginWithText}>Or login with ...</Text>
        
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={() => console.log('Google login pressed')} activeOpacity={0.6}>
            <Image source={require('../../assets/google-logo.png')} style={styles.googleIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Facebook login pressed')} activeOpacity={0.6}>
            <FontAwesome name="facebook" size={32} color="#3B5998" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Twitter login pressed')} activeOpacity={0.6}>
            <FontAwesome name="twitter" size={32} color="#1DA1F2" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Apple login pressed')} activeOpacity={0.6}>
            <FontAwesome name="apple" size={32} color="#F5F5DC" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {isSmallScreen ? (
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Animated.Text style={[styles.signUpText, animatedStyle]}>
              Don't have an account?
            </Animated.Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020202',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    paddingTop: StatusBar.currentHeight || height * 0.03, // Ensure padding for status bar
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#1C1C1E', // Different color shade
    borderRadius: 25,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Smokey white background
    borderRadius: 25,
    width: '100%',
    height: height * 0.08, // Adjusted height
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  icon: {
    marginRight: 10,
    color: '#B0B0B0', // Light grey color for icons
  },
  eyeIcon: {
    marginLeft: 'auto',
    padding: 10, // Increased padding for better touch area
  },
  input: {
    flex: 1,
    color: '#FFFFFF', // White text color
    fontSize: 16,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#CC950F',
    marginBottom: height * 0.02,
  },
  loginButton: {
    backgroundColor: '#CC950F',
    borderRadius: 25,
    width: '100%',
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  orLoginWithText: {
    color: '#FFFFFF',
    marginBottom: height * 0.02,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: height * 0.05,
  },
  googleIcon: {
    width: 32,
    height: 32,
    marginHorizontal: width * 0.02,
  },
  socialIcon: {
    marginHorizontal: width * 0.02,
  },
  signUpText: {
    color: '#CC950F',
  },
});

export default LoginScreen;
