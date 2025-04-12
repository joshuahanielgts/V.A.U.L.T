import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import FinanceManagement from '../components/startup/financesection';
import NewsFeed from '../components/startup/newsfeed';
import InvestorRecommendations from '../components/startup/investorrecommend';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/startupstyle'; // Adjust the import path as necessary

const { width } = Dimensions.get('window');

export default function StartupDashboard() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];
  
  // Sample data for the startup
  const startupData = {
    name: 'TechNova',
    headline: 'AI-powered solutions for sustainable manufacturing',
    completionScore: 72,
    campaigns: {
      active: 5,
      completed: 3,
      draft: 2
    },
    metrics: {
      investorViews: 42,
      bookmarks: 28,
      contactRequests: 16
    },
    fundingGoal: 1500000,
    fundsRaised: 350000,
    upcomingMeetings: [
      { id: 1, title: 'Blume Ventures Demo Day', time: '18 Apr, 02:00 PM', status: 'confirmed' },
      { id: 2, title: 'Meeting with Kalaari Capital', time: '20 Apr, 11:30 AM', status: 'pending' }
    ]
  };
  
  // Handle logout by returning to login screen
  const handleLogout = () => {
    // Animation effect before logout
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      router.replace('/');
    });
  };
  
  // Calculate funding progress
  const fundingProgress = (startupData.fundsRaised / startupData.fundingGoal) * 100;
  
  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Custom Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.navLogo}
            resizeMode="contain"
          />
          <Text style={styles.navTitle}>StartupHub</Text>
        </View>
        
        <View style={styles.navRight}>
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navIcon}>
            <Ionicons name="mail-outline" size={24} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navProfile}
            onPress={() => setShowProfileOptions(!showProfileOptions)}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.navProfileImage}
            />
          </TouchableOpacity>
        </View>
        
        {/* Profile dropdown */}
        {showProfileOptions && (
          <View style={styles.profileDropdown}>
            <TouchableOpacity style={styles.profileOption}>
              <Ionicons name="person-outline" size={18} color="#333" />
              <Text style={styles.profileOptionText}>My Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileOption}>
              <Ionicons name="settings-outline" size={18} color="#333" />
              <Text style={styles.profileOptionText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileOption}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={18} color="#ff3b30" />
              <Text style={[styles.profileOptionText, {color: '#ff3b30'}]}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with welcome message */}
        <ImageBackground
          source={{ uri: 'https://via.placeholder.com/800x400' }}
          style={styles.headerBackground}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.headerTitle}>Welcome, {startupData.name}</Text>
                <Text style={styles.headerCaption}>{startupData.headline}</Text>
              </View>
              
              <View style={styles.profileCompletionContainer}>
                <Text style={styles.profileCompletionText}>Profile Completion</Text>
                <View style={styles.profileCompletionBar}>
                  <View 
                    style={[
                      styles.profileCompletionFill, 
                      { width: `${startupData.completionScore}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.profileCompletionPercent}>
                  {startupData.completionScore}%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, {backgroundColor: '#3a86ff'}]}>
              <FontAwesome5 name="edit" size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Update Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, {backgroundColor: '#00A86B'}]}>
              <FontAwesome5 name="file-upload" size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Upload Pitch</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, {backgroundColor: '#FF9500'}]}>
              <FontAwesome5 name="search-dollar" size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Find Investors</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <View style={[styles.quickActionIcon, {backgroundColor: '#FF2D55'}]}>
              <FontAwesome5 name="chart-line" size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, {backgroundColor: '#E0F7FA'}]}>
                <MaterialCommunityIcons name="rocket-launch" size={24} color="#00B8D4" />
              </View>
              <Text style={styles.metricTitle}>Campaigns</Text>
            </View>
            <View style={styles.metricStatsContainer}>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.campaigns.active}</Text>
                <Text style={styles.metricStatLabel}>Active</Text>
              </View>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.campaigns.completed}</Text>
                <Text style={styles.metricStatLabel}>Completed</Text>
              </View>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.campaigns.draft}</Text>
                <Text style={styles.metricStatLabel}>Draft</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, {backgroundColor: '#FFF3E0'}]}>
                <MaterialCommunityIcons name="eye-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.metricTitle}>Engagement</Text>
            </View>
            <View style={styles.metricStatsContainer}>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.metrics.investorViews}</Text>
                <Text style={styles.metricStatLabel}>Views</Text>
              </View>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.metrics.bookmarks}</Text>
                <Text style={styles.metricStatLabel}>Bookmarks</Text>
              </View>
              <View style={styles.metricStat}>
                <Text style={styles.metricStatValue}>{startupData.metrics.contactRequests}</Text>
                <Text style={styles.metricStatLabel}>Requests</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Funding Progress */}
        <View style={styles.fundingContainer}>
          <View style={styles.fundingHeader}>
            <Text style={styles.fundingTitle}>Funding Progress</Text>
            <TouchableOpacity style={styles.fundingMoreButton}>
              <Text style={styles.fundingMoreText}>Details</Text>
              <AntDesign name="right" size={14} color="#3a86ff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.fundingCard}>
            <View style={styles.fundingInfoContainer}>
              <View>
                <Text style={styles.fundingLabel}>Raised</Text>
                <Text style={styles.fundingRaisedValue}>
                  {formatCurrency(startupData.fundsRaised)}
                </Text>
              </View>
              <View>
                <Text style={styles.fundingLabel}>Goal</Text>
                <Text style={styles.fundingGoalValue}>
                  {formatCurrency(startupData.fundingGoal)}
                </Text>
              </View>
            </View>
            
            <View style={styles.fundingProgressContainer}>
              <View style={styles.fundingProgressBar}>
                <View 
                  style={[
                    styles.fundingProgressFill, 
                    { width: `${fundingProgress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.fundingProgressPercent}>
                {fundingProgress.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Upcoming Meetings */}
        <View style={styles.meetingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
            <TouchableOpacity style={styles.sectionMoreButton}>
              <Text style={styles.sectionMoreText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {startupData.upcomingMeetings.map(meeting => (
            <View key={meeting.id} style={styles.meetingCard}>
              <View style={styles.meetingLeftSection}>
                <View style={[styles.meetingStatusIndicator, 
                  { backgroundColor: meeting.status === 'confirmed' ? '#00A86B' : '#FF9500' }]} 
                />
                <View>
                  <Text style={styles.meetingTitle}>{meeting.title}</Text>
                  <View style={styles.meetingTimeContainer}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.meetingTime}>{meeting.time}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.meetingActions}>
                <TouchableOpacity style={styles.meetingActionButton}>
                  <Ionicons name="calendar-outline" size={18} color="#3a86ff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.meetingActionButton}>
                  <Ionicons name="videocam-outline" size={18} color="#3a86ff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addMeetingButton}>
          <AntDesign name="plus" size={16} color="#fff" />
            <Text style={styles.addMeetingButtonText}>Schedule Meeting</Text>
          </TouchableOpacity>
        </View>

        {/* Finance Management Section */}
        <FinanceManagement />

        {/* Investor Recommendations Section */}
        <InvestorRecommendations />

        {/* AI-Powered News Feed */}
        <NewsFeed />

        {/* Profile Actions */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryActionButton}>
            <FontAwesome5 name="user-edit" size={18} color="#fff" />
            <Text style={styles.primaryActionButtonText}>EDIT STARTUP PROFILE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryActionButton}>
            <MaterialCommunityIcons name="file-document-edit-outline" size={18} color="#fff" />
            <Text style={styles.secondaryActionButtonText}>UPDATE PITCH DECK</Text>
          </TouchableOpacity>
        </View>

        {/* Help & Support Section */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            Our team is here to assist you with any questions or issues.
          </Text>
          
          <View style={styles.supportOptions}>
            <TouchableOpacity style={styles.supportOption}>
              <View style={[styles.supportOptionIcon, {backgroundColor: '#E3F2FD'}]}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2196F3" />
              </View>
              <Text style={styles.supportOptionText}>Chat Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportOption}>
              <View style={[styles.supportOptionIcon, {backgroundColor: '#E8F5E9'}]}>
                <Ionicons name="call-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.supportOptionText}>Call Us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.supportOption}>
              <View style={[styles.supportOptionIcon, {backgroundColor: '#FFF3E0'}]}>
                <Ionicons name="book-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.supportOptionText}>Resources</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text style={styles.footerText}>© 2025 StartupHub. All rights reserved.</Text>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#ff3b30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}