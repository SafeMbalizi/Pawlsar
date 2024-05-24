import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, StatusBar, Animated, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  const translateX = useSharedValue(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const validateInputs = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required.');
      return false;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Password is required.');
      return false;
    }
    if (!isLoginActive) {
      if (password !== confirmPassword) {
        Alert.alert('Validation Error', 'Passwords do not match.');
        return false;
      }
      if (!isTermsAccepted) {
        Alert.alert('Validation Error', 'You must accept the terms and conditions.');
        return false;
      }
    }
    return true;
  };

  const toggleLoginSignUp = () => {
    setIsLoginActive(!isLoginActive);
    Animated.timing(slideAnim, {
      toValue: isLoginActive ? width * 0.4 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      navigation.navigate('Home');
    }
  };

  const handleGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX < -50 && isLoginActive) {
        runOnJS(setIsLoginActive)(false);
        runOnJS(toggleLoginSignUp)();
      } else if (event.translationX > 50 && !isLoginActive) {
        runOnJS(setIsLoginActive)(true);
        runOnJS(toggleLoginSignUp)();
      }
      translateX.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to Pawlsar</Text>

        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={handleGesture}>
            <Reanimated.View style={[styles.buttonContainer, animatedStyle]}>
              <TouchableOpacity style={styles.switchButton} onPress={() => !isLoginActive && toggleLoginSignUp()}>
                <Text style={[styles.switchButtonText, isLoginActive && styles.activeText]}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.switchButton} onPress={() => isLoginActive && toggleLoginSignUp()}>
                <Text style={[styles.switchButtonText, !isLoginActive && styles.activeText]}>Sign Up</Text>
              </TouchableOpacity>
              <Animated.View style={[styles.activeIndicator, { transform: [{ translateX: slideAnim }] }]} />
            </Reanimated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>

        <View style={styles.formContainer}>
          {!isLoginActive && (
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={24} color="#B0B0B0" style={styles.icon} />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#B0B0B0"
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="#B0B0B0" />
            </TouchableOpacity>
          </View>

          {!isLoginActive && (
            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#B0B0B0" style={styles.icon} />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#B0B0B0"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Feather name={passwordVisible ? "eye" : "eye-off"} size={24} color="#B0B0B0" />
              </TouchableOpacity>
            </View>
          )}

          {!isLoginActive && (
            <View style={styles.termsContainer}>
              <Checkbox
                value={isTermsAccepted}
                onValueChange={setIsTermsAccepted}
                color={isTermsAccepted ? '#CC950F' : undefined}
              />
              <Text style={styles.termsText}>
                I agree to Pawlsar's{' '}
                <Text style={styles.linkText} onPress={() => navigation.navigate('TermsOfUse')}>
                  Terms of Use
                </Text>{' '}
                and{' '}
                <Text style={styles.linkText} onPress={() => navigation.navigate('PrivacyPolicy')}>
                  Privacy Policy
                </Text>
              </Text>
            </View>
          )}

          {isLoginActive && (
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>{isLoginActive ? 'Login' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orLoginWithText}>Or {isLoginActive ? 'login' : 'sign up'} with ...</Text>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={() => console.log('Google pressed')} activeOpacity={0.6} style={styles.socialButton}>
            <Image source={require('../../assets/google-logo.png')} style={styles.googleIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Facebook pressed')} activeOpacity={0.6} style={styles.socialButton}>
            <FontAwesome name="facebook" size={32} color="#3B5998" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Twitter pressed')} activeOpacity={0.6} style={styles.socialButton}>
            <FontAwesome name="twitter" size={32} color="#1DA1F2" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Apple pressed')} activeOpacity={0.6} style={styles.socialButton}>
            <FontAwesome name="apple" size={32} color="#F5F5DC" style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    paddingTop: StatusBar.currentHeight || hp('3%'),
  },
  logo: {
    width: wp('35%'),
    height: wp('35%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  welcomeText: {
    fontSize: wp('6%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    position: 'relative',
    width: '80%',
    height: hp('6%'),
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#CC950F',
    borderRadius: 25,
    zIndex: 0,
  },
  switchButtonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 25,
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: '100%',
    height: hp('8%'),
    marginBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  icon: {
    marginRight: 10,
    color: '#B0B0B0',
  },
  eyeIcon: {
    marginLeft: 'auto',
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: wp('4%'),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  termsText: {
    color: '#FFFFFF',
    marginLeft: wp('2%'),
  },
  linkText: {
    color: '#1D9BF0',
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#CC950F',
    marginBottom: hp('2%'),
  },
  loginButton: {
    backgroundColor: '#CC950F',
    borderRadius: 25,
    width: '100%',
    height: hp('8%'),
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
    fontSize: wp('5%'),
    fontWeight: '700',
  },
  orLoginWithText: {
    color: '#FFFFFF',
    marginBottom: hp('2%'),
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('5%'),
    paddingHorizontal: wp('10%'),
  },
  socialButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CC950F',
    marginHorizontal: wp('2%'),
  },
  googleIcon: {
    width: 32,
    height: 32,
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  signUpText: {
    color: '#CC950F',
  },
});

export default LoginScreen;
