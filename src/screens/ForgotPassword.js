import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleResetPassword = () => {
    if (email === '') {
      setAlertMessage('Confirm your email for reset password');
      setAlertVisible(true);
    } else {
      setAlertMessage('Your email does not exist. Please confirm the email. For more support, please contact our customer care: 0700000000 / customercare@pawlsar.co.ke');
      setAlertVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
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
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      {alertVisible && (
        <View style={[styles.alertContainer, { backgroundColor: alertMessage.includes('does not exist') ? '#FFCDD2' : '#F5F5F5' }]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
          <TouchableOpacity onPress={() => setAlertVisible(false)}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
  input: {
    flex: 1,
    color: '#FFFFFF', // White text color
    fontSize: 16,
  },
  resetButton: {
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
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  alertContainer: {
    width: '90%',
    borderRadius: 25,
    padding: width * 0.05,
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
  alertText: {
    color: '#000',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  okText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
