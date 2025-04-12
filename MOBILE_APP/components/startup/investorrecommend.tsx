import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InvestorRecommendations = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  // Sample Indian investors data
  const investors = [
    {
      id: 1,
      name: 'JOSHUA HANIAL',
      company: 'HANIAL VENTURES',
      image: 'https://via.placeholder.com/150',
      sectors: ['Technology', 'Healthcare', 'Automotive'],
      description: 'Joshua Hanial is one of India\'s most respected industrialists and philanthropists. Through his investment firm RNT Associates, he has backed numerous startups across various sectors.',
      matchScore: 87,
      previousInvestments: ['Ola Electric', 'Lenskart', 'Urban Ladder'],
      investmentRange: '$100K - $1M',
      contact: 'Available upon request',
    },
    {
      id: 2,
      name: 'Kunal Shah',
      company: 'CRED',
      image: 'https://via.placeholder.com/150',
      sectors: ['Fintech', 'Consumer Tech', 'SaaS'],
      description: 'Serial entrepreneur and investor, Kunal Shah founded CRED after his successful venture FreeCharge. He is an active angel investor in the Indian startup ecosystem.',
      matchScore: 92,
      previousInvestments: ['Razorpay', 'Unacademy', 'Khatabook'],
      investmentRange: '$50K - $500K',
      contact: 'Available upon request',
    },
    {
      id: 3,
      name: 'Kalaari Capital',
      company: 'Kalaari Capital',
      image: 'https://via.placeholder.com/150',
      sectors: ['E-commerce', 'EdTech', 'Healthtech'],
      description: 'Kalaari Capital is an early-stage, technology-focused venture capital firm with Vani Kola as its managing director. They focus on investing in Indian startups.',
      matchScore: 76,
      previousInvestments: ['Dream11', 'Myntra', 'Urban Ladder'],
      investmentRange: '$1M - $10M',
      contact: 'Available upon request',
    },
    {
      id: 4,
      name: 'Vijay Shekhar Sharma',
      company: 'Paytm',
      image: 'https://via.placeholder.com/150',
      sectors: ['Fintech', 'Digital Services', 'E-commerce'],
      description: 'Founder of Paytm, Vijay Shekhar Sharma is one of India\'s leading tech entrepreneurs and investors. He backs innovative startups disrupting traditional markets.',
      matchScore: 83,
      previousInvestments: ['Innov8', 'GOQii', 'Unacademy'],
      investmentRange: '$100K - $2M',
      contact: 'Available upon request',
    },
    {
      id: 5,
      name: 'Blume Ventures',
      company: 'Blume Ventures',
      image: 'https://via.placeholder.com/150',
      sectors: ['SaaS', 'Consumer Tech', 'DeepTech'],
      description: 'Blume Ventures is one of India\'s leading early-stage venture funds. They invest in tech-led startups with both domestic and cross-border market opportunities.',
      matchScore: 89,
      previousInvestments: ['Unacademy', 'Purplle', 'Dunzo'],
      investmentRange: '$500K - $5M',
      contact: 'Available upon request',
    },
  ];

  const openModal = (investor) => {
    setSelectedInvestor(investor);
    setModalVisible(true);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return '#00A86B'; // High match - green
    if (score >= 75) return '#FFA500'; // Medium match - orange
    return '#FF4500'; // Low match - red
  };

  const renderMatchIndicator = (score) => {
    const color = getMatchColor(score);
    return (
      <View style={styles.matchContainer}>
        <Text style={styles.matchLabel}>AI Match Score</Text>
        <View style={styles.matchScoreContainer}>
          <Text style={[styles.matchScore, { color }]}>{score}%</Text>
          <View style={[styles.matchBar, { backgroundColor: '#e0e0e0' }]}>
            <View
              style={[
                styles.matchFill,
                { width: `${score}%`, backgroundColor: color },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Investors</Text>
        <Text style={styles.headerSubtitle}>AI-matched for your startup profile</Text>
      </View>

      <View style={styles.investorsContainer}>
        {investors.map((investor) => (
          <TouchableOpacity
            key={investor.id}
            style={styles.investorCard}
            onPress={() => openModal(investor)}
          >
            <View style={styles.investorInfo}>
              <Image
                source={{ uri: investor.image }}
                style={styles.investorImage}
              />
              <View style={styles.investorDetails}>
                <Text style={styles.investorName}>{investor.name}</Text>
                <Text style={styles.investorCompany}>{investor.company}</Text>
                <View style={styles.sectorContainer}>
                  {investor.sectors.slice(0, 2).map((sector, index) => (
                    <View key={index} style={styles.sectorTag}>
                      <Text style={styles.sectorText}>{sector}</Text>
                    </View>
                  ))}
                  {investor.sectors.length > 2 && (
                    <View style={styles.sectorTag}>
                      <Text style={styles.sectorText}>+{investor.sectors.length - 2}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.matchScoreCircle}>
              <Text style={[styles.matchScoreText, { color: getMatchColor(investor.matchScore) }]}>
                {investor.matchScore}%
              </Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => openModal(investor)}
            >
              <Text style={styles.detailsButtonText}>Get Details</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Investor Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedInvestor && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalInvestorHeader}>
                  <Image
                    source={{ uri: selectedInvestor.image }}
                    style={styles.modalInvestorImage}
                  />
                  <View>
                    <Text style={styles.modalInvestorName}>{selectedInvestor.name}</Text>
                    <Text style={styles.modalInvestorCompany}>{selectedInvestor.company}</Text>
                    {renderMatchIndicator(selectedInvestor.matchScore)}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>About</Text>
                  <Text style={styles.modalDescription}>{selectedInvestor.description}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Investment Sectors</Text>
                  <View style={styles.modalSectorContainer}>
                    {selectedInvestor.sectors.map((sector, index) => (
                      <View key={index} style={styles.modalSectorTag}>
                        <Text style={styles.modalSectorText}>{sector}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Previous Investments</Text>
                  <View style={styles.previousInvestmentsList}>
                    {selectedInvestor.previousInvestments.map((investment, index) => (
                      <Text key={index} style={styles.previousInvestmentItem}>
                        • {investment}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Investment Range</Text>
                  <Text style={styles.modalInfoText}>{selectedInvestor.investmentRange}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Why This Match?</Text>
                  <Text style={styles.modalInfoText}>
                    Based on your startup profile, business model, and growth trajectory, our AI
                    has determined a {selectedInvestor.matchScore}% match with {selectedInvestor.name}'s
                    investment preferences and portfolio strategy.
                  </Text>
                </View>

                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Request Introduction</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  investorsContainer: {
    padding: 8,
  },
  investorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  investorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  investorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  investorDetails: {
    flex: 1,
  },
  investorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  investorCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  sectorContainer: {
    flexDirection: 'row',
  },
  sectorTag: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
  },
  sectorText: {
    fontSize: 12,
    color: '#3a86ff',
  },
  matchScoreCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  matchScoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#3a86ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalInvestorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalInvestorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  modalInvestorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalInvestorCompany: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  matchContainer: {
    marginTop: 8,
  },
  matchLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  matchScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  matchBar: {
    height: 8,
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  matchFill: {
    height: '100%',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  modalSectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalSectorTag: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  modalSectorText: {
    fontSize: 14,
    color: '#3a86ff',
  },
  previousInvestmentsList: {
    marginTop: 8,
  },
  previousInvestmentItem: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  connectButton: {
    backgroundColor: '#00A86B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InvestorRecommendations;