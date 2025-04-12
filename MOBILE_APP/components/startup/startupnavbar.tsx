import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');

  const handlePress = (tabName) => {
    setActiveTab(tabName);
    console.log(tabName);
  };

  const renderNavItem = (name, iconName) => {
    const isActive = activeTab === name;
    return (
      <TouchableOpacity 
        style={styles.navItemContainer} 
        onPress={() => handlePress(name)}
      >
        <Ionicons 
          name={iconName} 
          size={22} 
          color={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)'} 
        />
        <Text style={[
          styles.navItemText,
          isActive ? styles.activeNavText : null
        ]}>
          {name}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navbar}>
      {renderNavItem('Home', 'home-outline')}
      {renderNavItem('Finance', 'wallet-outline')}
      {renderNavItem('News', 'newspaper-outline')}
      {renderNavItem('Profile', 'person-outline')}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2E7D32', // Green background - match your COLORS.primary
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'relative',
    minWidth: 80,
  },
  navItemText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    height: 3,
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  }
});