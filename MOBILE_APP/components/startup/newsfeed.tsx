import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { styles } from '../../styles/startupstyle';
import { MaterialIcons } from '@expo/vector-icons';

export default function NewsFeed() {
  const newsData = [
    {
      id: '1',
      title: 'Tech Startup Raises $10M in Series A Funding',
      description: 'A promising tech startup has secured $10M in funding to expand its operations globally.',
      icon: 'trending-up',
    },
    {
      id: '2',
      title: 'AI Revolutionizing the Finance Industry',
      description: 'Discover how AI is transforming financial services and creating new opportunities.',
      icon: 'insights',
    },
    {
      id: '3',
      title: 'Top 5 Investment Trends for 2025',
      description: 'Here are the top trends investors are focusing on this year.',
      icon: 'analytics',
    },
  ];

  // Animations
  const fadeAnim = new Animated.Value(0); // Initial opacity value

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderNewsItem = ({ item }) => (
    <Animated.View style={[styles.newsItem, { opacity: fadeAnim }]}>
      <MaterialIcons name={item.icon} size={32} color="#4CAF50" style={styles.newsIcon} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.sectionCard}>
      {/* News Feed Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>AI-Powered News Feed</Text>
        <MaterialIcons name="article" size={24} color="#212121" />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* News List */}
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={renderNewsItem}
        contentContainerStyle={styles.newsList}
      />
    </View>
  );
}
