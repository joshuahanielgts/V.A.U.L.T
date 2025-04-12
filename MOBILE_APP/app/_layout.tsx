import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.background,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: COLORS.background }
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Login",
            headerShown: false // Hide header on the login screen
          }} 
        />
        <Stack.Screen 
          name="startup-dashboard" 
          options={{ 
            title: "Startup Dashboard",
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="investor-dashboard" 
          options={{ 
            title: "Investor Dashboard",
            headerShown: true
          }} 
        />
      </Stack>
    </>
  );
}