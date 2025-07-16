import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import logo from './assets/logo.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DashboardScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome to ConnectCare Dashboard</Text>
      <Text style={styles.subtitle}>We are happy to have you</Text>
    </LinearGradient>
  );
}

function SymptomsScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>📝 Symptom Checker (Urwaye Iki)</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your symptoms..."
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>Submit to get results (API will be added later)</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function AppointmentsScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>📅 Appointment Requests</Text>
        <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Preferred Date" placeholderTextColor="#333" />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Reason"
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>Submit button will trigger API call later</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function DoctorSearchScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>🔍 Find a Doctor</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by name, specialization, or location"
          placeholderTextColor="#333"
        />
        <Text style={styles.subtitle}>Feature coming soon — Will use API</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function ChatbotScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>💬 Mental Health Chatbot</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="How are you feeling today? (Umeze Ute)"
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>AI support will add later on</Text>
      </ScrollView>
    </LinearGradient>
  );
}

function CallDoctorScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Text style={styles.title}>📞 Call a Doctor (Guhamagara muganga)</Text>
      <Text style={styles.subtitle}>Phone: +250 792041765</Text>
      <Text style={styles.subtitle}>Click-to-call feature will be added soon</Text>
    </LinearGradient>
  );
}

function LoginScreen({ navigation }) {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>Hey, Login</Text>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#333" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.subtitle, { textDecorationLine: 'underline' }]}>Create one here</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function SignupScreen({ navigation }) {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}> Sign Up(Funguza konti)</Text>
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#333" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// Tab navigator wrapped in function
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Doctor Search" component={DoctorSearchScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Call" component={CallDoctorScreen} />
    </Tab.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  innerScroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

