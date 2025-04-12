import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/investorstyle'; // Adjust the path as necessary

const countries = [
  { label: 'India', value: 'in' },
  { label: 'USA', value: 'us' },
  { label: 'UK', value: 'gb' },
  { label: 'Australia', value: 'au' },
];

const languages = [
  { label: 'Hindi', value: 'hi' },
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
];

export default function InvestorDashboard() {
  const [query, setQuery] = useState('startup');
  const [country, setCountry] = useState('in');
  const [language, setLanguage] = useState('hi');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.95))[0];
  
  // Handle logout by returning to login screen
  const handleLogout = () => {
    router.replace('/');
  };
  
  // Fetch news from API
  const fetchNews = async () => {
    setLoading(true);
    setSearched(true);
    
    try {
      const response = await fetch(
        `https://vault-backend-vkz2.onrender.com/news?query=${query}&country=${country}&language=${language}`
      );
      const data = await response.json();
      
      if (data.success && data.data) {
        setNews(data.data);
        
        // Animate news cards
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          })
        ]).start();
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Dropdown component
  const Dropdown = ({ items, selectedValue, onValueChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedItem = items.find(item => item.value === selectedValue);
    
    return (
      <View style={{ flex: 1, marginRight: 10 }}>
        <TouchableOpacity 
          style={styles.dropdown} 
          onPress={() => setIsOpen(!isOpen)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.dropdownText}>
              {selectedItem ? selectedItem.label : placeholder}
            </Text>
            <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#555" />
          </View>
        </TouchableOpacity>
        
        {isOpen && (
          <View style={{
            position: 'absolute',
            top: 45,
            left: 0,
            right: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#E0F2E9',
            zIndex: 1000,
            elevation: 5,
          }}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0F2E9',
                }}
                onPress={() => {
                  onValueChange(item.value);
                  setIsOpen(false);
                }}
              >
                <Text style={{
                  color: item.value === selectedValue ? '#2E8B57' : '#555',
                  fontWeight: item.value === selectedValue ? 'bold' : 'normal',
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header with welcome message */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLogo}>
              <Ionicons name="leaf" size={24} color="#2E8B57" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Welcome, investor1</Text>
              <Text style={styles.headerCaption}>Investor Dashboard</Text>
            </View>
          </View>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <Animated.View 
            style={[
              styles.statCard,
              { transform: [{ scale: scaleAnim }], opacity: fadeAnim }
            ]}
          >
            <View style={styles.statIcon}>
              <Ionicons name="business-outline" size={20} color="#2E8B57" />
            </View>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statCaption}>Startups Available</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.statCard, 
              { transform: [{ scale: scaleAnim }], opacity: fadeAnim }
            ]}
          >
            <View style={styles.statIcon}>
              <Ionicons name="star-outline" size={20} color="#2E8B57" />
            </View>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statCaption}>Saved Startups</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.statCard,
              { transform: [{ scale: scaleAnim }], opacity: fadeAnim }
            ]}
          >
            <View style={styles.statIcon}>
              <Ionicons name="wallet-outline" size={20} color="#2E8B57" />
            </View>
            <Text style={styles.statNumber}>$0</Text>
            <Text style={styles.statCaption}>Investments Made</Text>
          </Animated.View>
        </View>

        {/* Featured Startups Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Startups</Text>
            <Ionicons name="arrow-forward" size={18} color="#2E8B57" />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.startupCard}>
            <View style={styles.startupHeader}>
              <Text style={styles.startupName}>Tech Innovators Inc.</Text>
              <Text style={styles.startupCategory}>AI/ML</Text>
            </View>
            <Text numberOfLines={2} style={styles.startupDescription}>
              Building the next generation of AI-powered business analytics tools for SMEs.
            </Text>
            <View style={styles.startupDetails}>
              <Text style={styles.detailText}>
                <Ionicons name="cash-outline" size={12} color="#555" /> Seeking: $2M
              </Text>
              <Text style={styles.detailText}>
                <Ionicons name="trending-up-outline" size={12} color="#555" /> Stage: Seed
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>VIEW DETAILS</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.startupCard}>
            <View style={styles.startupHeader}>
              <Text style={styles.startupName}>GreenEnergy Solutions</Text>
              <Text style={styles.startupCategory}>CleanTech</Text>
            </View>
            <Text numberOfLines={2} style={styles.startupDescription}>
              Developing affordable solar solutions for residential properties.
            </Text>
            <View style={styles.startupDetails}>
              <Text style={styles.detailText}>
                <Ionicons name="cash-outline" size={12} color="#555" /> Seeking: $1.5M
              </Text>
              <Text style={styles.detailText}>
                <Ionicons name="trending-up-outline" size={12} color="#555" /> Stage: Series A
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>VIEW DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* News Feed Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Startup News Feed</Text>
            <Ionicons name="newspaper-outline" size={18} color="#2E8B57" />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.searchContainer}>
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search news..."
                value={query}
                onChangeText={setQuery}
              />
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={fetchNews}
              >
                <Ionicons name="search" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchRow}>
              <Dropdown
                items={countries}
                selectedValue={country}
                onValueChange={setCountry}
                placeholder="Select country"
              />
              <Dropdown
                items={languages}
                selectedValue={language}
                onValueChange={setLanguage}
                placeholder="Select language"
              />
            </View>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2E8B57" />
            </View>
          ) : searched ? (
            news.length > 0 ? (
              <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                {news.slice(0, 5).map((item, index) => (
                  <View key={index} style={styles.newsCard}>
                    <Image 
                      source={{ uri: item.thumbnail || 'https://via.placeholder.com/300x150' }}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                    <View style={styles.newsContent}>
                      <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.newsDescription} numberOfLines={2}>{item.description}</Text>
                      <View style={styles.newsFooter}>
                        <Text style={styles.newsSource}>
                          {item.source && item.source.name ? item.source.name : 'Unknown Source'}
                        </Text>
                        <Text style={styles.newsDate}>{formatDate(item.date)}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </Animated.View>
            ) : (
              <Text style={styles.noResults}>No news found. Try different search terms.</Text>
            )
          ) : (
            <Text style={styles.noResults}>Search for startup news by clicking the search button.</Text>
          )}
        </View>

        {/* Investment Preferences Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Investment Preferences</Text>
            <Ionicons name="options-outline" size={18} color="#2E8B57" />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>
                <Ionicons name="trending-up" size={14} color="#555" /> Investment Stage:
              </Text>
              <Text style={styles.preferenceValue}>Seed, Series A</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>
                <Ionicons name="business" size={14} color="#555" /> Industries:
              </Text>
              <Text style={styles.preferenceValue}>Tech, FinTech, Healthcare</Text>
            </View>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>
                <Ionicons name="cash" size={14} color="#555" /> Investment Range:
              </Text>
              <Text style={styles.preferenceValue}>$100K - $2M</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>UPDATE PREFERENCES</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={16} color="#555" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}