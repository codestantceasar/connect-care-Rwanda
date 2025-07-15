import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import logo from './assets/logo.png';  // <-- Import your logo here

const Tab = createBottomTabNavigator();

// Dashboard Screen with logo added
function DashboardScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome to HealthLink Dashboard</Text>
      <Text style={styles.subtitle}>Use the tabs below to access features</Text>
    </LinearGradient>
  );
}

// Symptoms Checker
function SymptomsScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>📝 Symptom Checker</Text>
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

// Appointment Booking
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

// Doctor Search Placeholder
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
        <Text style={styles.subtitle}>Feature coming soon — powered by our doctor API</Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Mental Health Chatbot Placeholder
function ChatbotScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>💬 Mental Health Chatbot</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="How are you feeling today?"
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>AI-guided support coming soon ❤️</Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Call Doctor Page
function CallDoctorScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Text style={styles.title}>📞 Call a Doctor</Text>
      <Text style={styles.subtitle}>Phone: +250 792041765</Text>
      <Text style={styles.subtitle}>Click-to-call feature coming soon</Text>
    </LinearGradient>
  );
}

// Main App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Symptoms" component={SymptomsScreen} />
        <Tab.Screen name="Appointments" component={AppointmentsScreen} />
        <Tab.Screen name="Doctor Search" component={DoctorSearchScreen} />
        <Tab.Screen name="Chatbot" component={ChatbotScreen} />
        <Tab.Screen name="Call" component={CallDoctorScreen} />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

// Shared Styles
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
});
