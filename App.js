import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App() {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle login button press
  const handleLogin = async () => {
    // Trim inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Check if any field is empty
    if (!trimmedUsername || !trimmedPassword) {
      setMessage('Please fill in all fields');
      setModalVisible(true);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (trimmedUsername === 'admin' && trimmedPassword === '1234') {
        setMessage('Login Successful! Welcome back!');
        setModalVisible(true);
        // Clear input fields after successful login
        setUsername('');
        setPassword('');
      } else {
        setMessage('Wrong Password. Please try again.');
        setModalVisible(true);
      }
      setIsLoading(false);
    }, 800);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Reset form
  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  // Responsive scaling function
  const scaleSize = (size) => {
    const scaleFactor = Math.min(width / 375, height / 812);
    return Math.max(size * scaleFactor, size * 0.8); // Minimum scaling
  };

  // Get responsive styles
  const responsiveStyles = {
    title: { fontSize: scaleSize(32) },
    label: { fontSize: scaleSize(16) },
    input: {
      height: scaleSize(50),
      fontSize: scaleSize(16),
      paddingHorizontal: scaleSize(12)
    },
    button: {
      height: scaleSize(56),
      marginTop: scaleSize(24)
    },
    buttonText: { fontSize: scaleSize(18) },
    instructionsText: { fontSize: scaleSize(14) },
    instructionsMargin: { marginTop: scaleSize(32) },
    modalContent: {
      width: width * 0.85,
      padding: scaleSize(20),
      borderRadius: scaleSize(16)
    },
    modalMessage: {
      fontSize: scaleSize(18),
      marginVertical: scaleSize(20)
    },
    modalButton: {
      height: scaleSize(44)
    },
    modalButtonText: { fontSize: scaleSize(16) }
  };

  // Get modal color based on message
  const getModalColor = () => {
    if (message.includes('Login Successful')) return '#4CAF50';
    if (message.includes('Please fill')) return '#FF9800';
    return '#f44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* App Title */}
            <Text style={[styles.title, responsiveStyles.title]}>
              Welcome Back
            </Text>
            
            <Text style={[styles.subtitle, { fontSize: scaleSize(16) }]}>
              login to your account
            </Text>

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, responsiveStyles.label]}>
                Username
              </Text>
              <TextInput
                style={[styles.input, responsiveStyles.input]}
                placeholder="Enter your username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                editable={!isLoading}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, responsiveStyles.label]}>
                Password
              </Text>
              <TextInput
                style={[styles.input, responsiveStyles.input]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                editable={!isLoading}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.button, responsiveStyles.button]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, responsiveStyles.buttonText]}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Reset Button */}
            <TouchableOpacity
              style={[styles.resetButton, { marginTop: scaleSize(16) }]}
              onPress={resetForm}
              disabled={isLoading}
            >
              <Text style={[styles.resetButtonText, { fontSize: scaleSize(14) }]}>
                Clear Form
              </Text>
            </TouchableOpacity>

            {/* Info Text */}
            <Text style={[styles.infoText, { fontSize: scaleSize(12), marginTop: scaleSize(16) }]}>
              Fill both fields and press Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal for messages */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, responsiveStyles.modalContent]}>
            {/* Modal Close Button */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeModal}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>

            {/* Modal Icon */}
            <View style={[
              styles.modalIcon,
              { backgroundColor: getModalColor() + '20' }
            ]}>
              <Text style={[
                styles.modalIconText,
                { color: getModalColor(), fontSize: scaleSize(32) }
              ]}>
                {message.includes('Login Successful') ? '✓' : '!'}
              </Text>
            </View>

            {/* Modal Message */}
            <Text style={[
              styles.modalMessage,
              responsiveStyles.modalMessage,
              { color: '#333' }
            ]}>
              {message}
            </Text>

            {/* Modal Button */}
            <TouchableOpacity
              style={[
                styles.modalButton,
                responsiveStyles.modalButton,
                { backgroundColor: getModalColor() }
              ]}
              onPress={closeModal}
              activeOpacity={0.8}
            >
              <Text style={[styles.modalButtonText, responsiveStyles.modalButtonText]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#34495e',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetButtonText: {
    color: '#7f8c8d',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 28,
    color: '#95a5a6',
    fontWeight: '300',
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  modalIconText: {
    fontWeight: 'bold',
  },
  modalMessage: {
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  modalButton: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});