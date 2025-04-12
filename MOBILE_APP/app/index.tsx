import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
  Dimensions,
  StatusBar,
  ImageBackground
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from './colors';
import { Ionicons } from '@expo/vector-icons';

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get('window');

// Sample user credentials for demonstration
const VALID_USERS = [
  { username: 'startup1', password: 'password123', role: 'startup' },
  { username: 'investor1', password: 'password123', role: 'investor' },
];

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validate input fields
  const validateForm = () => {
    let isValid = true;
    
    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }
    
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleLogin = () => {
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check credentials
    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );
    
    if (user) {
      // Navigate based on role
      if (user.role === 'startup') {
        router.replace('/startup-dashboard');
      } else if (user.role === 'investor') {
        router.replace('/investor-dashboard');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={require('@/assets/images/background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/icon.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.appName}>V A U L T</Text>
              <Text style={styles.appName1}>Value-driven AI Universe for Lending & Tech-funding</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.title}>
                Welcome Back
              </Text>
              <Text style={styles.subtitle}>
                Sign in to your account
              </Text>
              
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    style={[
                      styles.input,
                      usernameError ? styles.inputError : null
                    ]}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                </View>
                {usernameError ? (
                  <Text style={styles.errorText}>{usernameError}</Text>
                ) : null}
                
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[
                      styles.input,
                      passwordError ? styles.inputError : null
                    ]}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                  <TouchableOpacity 
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color={COLORS.textSecondary} 
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>SIGN IN</Text>
              </TouchableOpacity>
              
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
              
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-linkedin" size={20} color={COLORS.text} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.helpContainer}>
                <Text style={styles.helpTitle}>
                  Sample Credentials
                </Text>
                <Text style={styles.helpText}>For demonstration purposes:</Text>
                <View style={styles.credentialContainer}>
                  <Text style={styles.credentialLabel}>Startup:</Text>
                  <Text style={styles.credentialText}>username "startup1", password "password123"</Text>
                </View>
                <View style={styles.credentialContainer}>
                  <Text style={styles.credentialLabel}>Investor:</Text>
                  <Text style={styles.credentialText}>username "investor1", password "password123"</Text>
                </View>
              </View>
              
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 25,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    textShadowColor: 'rgba(68, 64, 64, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  appName1: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    textShadowColor: 'rgba(17, 211, 94, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  card: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  passwordToggle: {
    padding: 8,
  },
  errorText: {
    color: COLORS.danger,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  helpContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  helpTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.primary,
    fontSize: 16,
  },
  helpText: {
    color: COLORS.text,
    marginBottom: 12,
    fontSize: 14,
  },
  credentialContainer: {
    marginTop: 8,
  },
  credentialLabel: {
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  credentialText: {
    color: COLORS.textSecondary,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});