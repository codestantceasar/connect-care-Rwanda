import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import logo from './assets/logo.png'; // Add your logo image here

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dashboard
function DashboardScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Murakaza neza kuri ConnectCare ( Welcome) </Text>
      <Text style={styles.subtitle}>Twishimiye kukwakira!</Text>
    </LinearGradient>
  );
}

// Symptoms
function SymptomsScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>📝 Igenzura ry’Ibimenyetso (Urwaye Iki?)</Text>
        <TextInput
          style={styles.input}
          placeholder="Sobanura ibimenyetso byawe..."
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>Uzatanga ibisubizo nyuma (API irimo kuza)</Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Appointments with Calendar
function AppointmentsScreen() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>📅 Gusaba Rendez-vous</Text>
        <TextInput
          style={styles.input}
          placeholder="Amazina yawe"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#333"
        />
        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: '#333' }}>
            Itariki: {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Impamvu y’urugendo kwa muganga"
          value={reason}
          onChangeText={setReason}
          multiline
          placeholderTextColor="#333"
        />
        <View style={{ marginTop: 10 }}>
          <Button title="Ohereza" onPress={() => alert("Ibisabwa byakiriwe!")} color="#333" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Doctor Search
function DoctorSearchScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>🔍 Shakisha Muganga</Text>
        <TextInput
          style={styles.input}
          placeholder="Andika izina, specialization cyangwa aho aherereye"
          placeholderTextColor="#333"
        />
        <Text style={styles.subtitle}>Ibirimo kuza — API izongerwamo vuba ( Working on API, stay tuned )</Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Mental Health Chatbot
function ChatbotScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>💬 Chatbot y’Ubuzima bwo mu Mutwe ( Mental health )</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Umeze ute uyu munsi?"
          placeholderTextColor="#333"
          multiline
        />
        <Text style={styles.subtitle}>AI chatbot coming soon (AI)</Text>
      </ScrollView>
    </LinearGradient>
  );
}

// Call Doctor
function CallDoctorScreen() {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.container}>
      <Text style={styles.title}>📞 Hamagara Muganga ( Call )</Text>
      <Text style={styles.subtitle}>+250 792041765</Text>
      <Text style={styles.subtitle}>Kanda kugira ngo uhamagare (coming soon)</Text>
    </LinearGradient>
  );
}

// Login
function LoginScreen({ navigation }) {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>Injira ( Login )</Text>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Ijambo ry’ibanga" placeholderTextColor="#333" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
          <Text style={styles.buttonText}>Injira</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Nta konti ufite? ( No account ? )</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.subtitle, { textDecorationLine: 'underline' }]}>Funguza konti hano ( SignUp)</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// ✅ Signup with phone number added
function SignupScreen({ navigation }) {
  return (
    <LinearGradient colors={['#FFC0CB', '#ADD8E6']} style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.innerScroll}>
        <Text style={styles.title}>Funguza  ( Sign up )</Text>
        <TextInput style={styles.input} placeholder="Amazina" placeholderTextColor="#333" />
        <TextInput style={styles.input} placeholder="Imeyili" placeholderTextColor="#333" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Telefoni" placeholderTextColor="#333" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Ijambo ry’ibanga" placeholderTextColor="#333" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
          <Text style={styles.buttonText}>Emeza</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

// Tabs
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
