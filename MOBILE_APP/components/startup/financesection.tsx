import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  Animated, 
  Easing,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from '../../styles/startupstyle';

// Define component styles
const componentStyles = {
  container: {
    padding: 15,
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(240, 255, 240, 0.5)', // Light green background
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#4CAF50',
  },
  negativeChange: {
    color: '#F44336',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recommendationText: {
    fontSize: 13,
    color: '#666',
  },
  // New styles for interactivity
  chartTouchable: {
    borderRadius: 8,
  },
  detailModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 4,
    zIndex: 10,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  decoratorDot: {
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
};

// Chart configurations
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  // Enhanced chart config
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#fff"
  },
  propsForLabels: {
    fontSize: 11,
    fontWeight: 'bold',
  },
};

// Sample data for the charts and metrics
const sampleData = {
  revenue: {
    daily: [28000, 30000, 35000, 32000, 40000, 38000, 45000],
    weekly: [180000, 195000, 210000, 225000, 240000, 265000, 280000, 290000],
    monthly: [850000, 920000, 980000, 1050000, 1100000, 1180000],
    yearly: [9500000, 12000000, 14500000, 18000000],
  },
  expenses: {
    daily: [22000, 25000, 23000, 27000, 26000, 29000, 28000],
    weekly: [150000, 160000, 155000, 170000, 165000, 180000, 175000, 190000],
    monthly: [650000, 680000, 700000, 750000, 780000, 800000],
    yearly: [7500000, 9000000, 10000000, 12000000],
  },
  profit: {
    daily: [6000, 5000, 12000, 5000, 14000, 9000, 17000],
    weekly: [30000, 35000, 55000, 55000, 75000, 85000, 105000, 100000],
    monthly: [200000, 240000, 280000, 300000, 320000, 380000],
    yearly: [2000000, 3000000, 4500000, 6000000],
  },
  cashflow: {
    daily: [8000, 7000, 15000, 9000, 18000, 12000, 20000],
    weekly: [40000, 45000, 60000, 65000, 85000, 95000, 110000, 115000],
    monthly: [250000, 280000, 320000, 350000, 380000, 420000],
    yearly: [2500000, 3500000, 5000000, 6500000],
  },
  expenseBreakdown: [
    {
      name: 'R&D',
      amount: 350000,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Marketing',
      amount: 250000,
      color: '#8BC34A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Operations',
      amount: 200000,
      color: '#CDDC39',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Salaries',
      amount: 450000,
      color: '#009688',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      amount: 150000,
      color: '#2E7D32',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ],
  growthRate: {
    weekly: 5.8,
    monthly: 7.2,
    quarterly: 9.5,
    yearly: 12.3,
  },
  investmentOpportunities: [
    {
      sector: 'Tech',
      potential: 'High',
      risk: 'Medium',
      return: '15-20%',
    },
    {
      sector: 'Green Energy',
      potential: 'Very High',
      risk: 'Medium-High',
      return: '18-25%',
    },
    {
      sector: 'Healthcare',
      potential: 'Medium',
      risk: 'Low',
      return: '8-12%',
    },
  ],
  recommendations: [
    {
      title: 'Optimize Marketing Budget',
      description: 'Current ROI on digital marketing is 3.5x. Consider shifting 15% of budget from traditional to digital channels.',
      details: 'Digital marketing channels have shown a 3.5x ROI compared to 1.8x from traditional methods. Specifically, social media campaigns outperform print ads by 4.2x in customer acquisition cost efficiency.',
    },
    {
      title: 'Expand R&D Investments',
      description: 'R&D spending has shown 2x return over the past quarter. Recommend increasing budget by 10%.',
      details: 'Product innovation through R&D has directly correlated with market share growth. Last quarters RD projects resulted in two new product offerings that have already achieved 15% profit margins.',
    },
    {
      title: 'Reduce Operational Costs',
      description: 'Implement automation tools to decrease operational expenses by an estimated 12%.',
      details: 'Process automation opportunities exist in inventory management, customer support, and data entry. Initial investment in automation tools would be recouped within 7 months based on labor cost savings.',
    },
  ],
};

export default function FinanceManagement() {
  // State for UI interactions
  const [activeTab, setActiveTab] = useState('daily');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const cardAnimations = useRef(sampleData.recommendations.map(() => new Animated.Value(0))).current;
  
  const screenWidth = Dimensions.get('window').width - 40;

  // Time period labels based on activeTab
  const timeLabels = {
    daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weekly: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    yearly: ['2022', '2023', '2024', '2025'],
  };

  // Animation functions
  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
    ]).start();
  };

  const animateCardEntrance = () => {
    cardAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    });
  };

  // Get current data based on the active tab
  const getCurrentData = () => ({
    labels: timeLabels[activeTab],
    datasets: [
      {
        data: sampleData.revenue[activeTab],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: sampleData.expenses[activeTab],
        color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Revenue', 'Expenses'],
  });

  // Get profit data based on the active tab
  const getProfitData = () => ({
    labels: timeLabels[activeTab],
    datasets: [
      {
        data: sampleData.profit[activeTab],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Profit'],
  });

  // Get cash flow data based on the active tab
  const getCashFlowData = () => ({
    labels: timeLabels[activeTab],
    datasets: [
      {
        data: sampleData.cashflow[activeTab],
        color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Cash Flow'],
  });

  // Handle chart press - show modal with detailed information
  const handleChartPress = (type, index = 0) => {
    setModalType(type);
    
    switch (type) {
      case 'revenue-expenses':
        setSelectedItem({
          title: 'Revenue vs Expenses Details',
          data: [
            { label: 'Period', value: activeTab === 'daily' ? timeLabels[activeTab][index] : `Period ${index + 1}` },
            { label: 'Revenue', value: `$${sampleData.revenue[activeTab][index].toLocaleString()}` },
            { label: 'Expenses', value: `$${sampleData.expenses[activeTab][index].toLocaleString()}` },
            { label: 'Difference', value: `$${(sampleData.revenue[activeTab][index] - sampleData.expenses[activeTab][index]).toLocaleString()}` },
            { label: 'Profit Margin', value: `${Math.round((sampleData.revenue[activeTab][index] - sampleData.expenses[activeTab][index]) / sampleData.revenue[activeTab][index] * 100)}%` },
          ]
        });
        break;
      case 'profit':
        setSelectedItem({
          title: 'Profit Details',
          data: [
            { label: 'Period', value: activeTab === 'daily' ? timeLabels[activeTab][index] : `Period ${index + 1}` },
            { label: 'Profit Amount', value: `$${sampleData.profit[activeTab][index].toLocaleString()}` },
            { label: 'Revenue', value: `$${sampleData.revenue[activeTab][index].toLocaleString()}` },
            { label: 'Expenses', value: `$${sampleData.expenses[activeTab][index].toLocaleString()}` },
            { label: 'Profit/Revenue Ratio', value: `${Math.round(sampleData.profit[activeTab][index] / sampleData.revenue[activeTab][index] * 100)}%` },
          ]
        });
        break;
      case 'cashflow':
        setSelectedItem({
          title: 'Cash Flow Details',
          data: [
            { label: 'Period', value: activeTab === 'daily' ? timeLabels[activeTab][index] : `Period ${index + 1}` },
            { label: 'Cash Flow', value: `$${sampleData.cashflow[activeTab][index].toLocaleString()}` },
            { label: 'Operating Cash Flow', value: `$${Math.round(sampleData.cashflow[activeTab][index] * 0.7).toLocaleString()}` },
            { label: 'Investment Cash Flow', value: `$${Math.round(sampleData.cashflow[activeTab][index] * 0.2).toLocaleString()}` },
            { label: 'Financing Cash Flow', value: `$${Math.round(sampleData.cashflow[activeTab][index] * 0.1).toLocaleString()}` },
          ]
        });
        break;
      case 'expense-breakdown':
        const expenseItem = sampleData.expenseBreakdown[index];
        setSelectedItem({
          title: `${expenseItem.name} Expense Details`,
          data: [
            { label: 'Category', value: expenseItem.name },
            { label: 'Amount', value: `$${expenseItem.amount.toLocaleString()}` },
            { label: 'Percentage of Total', value: `${Math.round(expenseItem.amount / sampleData.expenseBreakdown.reduce((sum, item) => sum + item.amount, 0) * 100)}%` },
            { label: 'YoY Change', value: `+${Math.floor(Math.random() * 15) + 1}%` },
            { label: 'Budget Status', value: Math.random() > 0.5 ? 'Under Budget' : 'On Target' },
          ]
        });
        break;
      case 'recommendation':
        setSelectedItem({
          title: sampleData.recommendations[index].title,
          data: [
            { label: 'Summary', value: sampleData.recommendations[index].description },
            { label: 'Details', value: sampleData.recommendations[index].details },
            { label: 'Impact', value: `Estimated ${Math.floor(Math.random() * 15) + 5}% improvement in profitability` },
            { label: 'Implementation Time', value: `${Math.floor(Math.random() * 3) + 1} ${Math.random() > 0.5 ? 'weeks' : 'months'}` },
            { label: 'Priority', value: Math.random() > 0.5 ? 'High' : 'Medium' },
          ]
        });
        break;
      case 'investment':
        const investment = sampleData.investmentOpportunities[index];
        setSelectedItem({
          title: `${investment.sector} Investment Details`,
          data: [
            { label: 'Sector', value: investment.sector },
            { label: 'Potential', value: investment.potential },
            { label: 'Risk Level', value: investment.risk },
            { label: 'Expected Return', value: investment.return },
            { label: 'Market Trend', value: Math.random() > 0.5 ? 'Upward' : 'Stable' },
            { label: 'Recommendation', value: 'Consider allocation of available funds' },
          ]
        });
        break;
    }
    
    setModalVisible(true);
    animateScale();
  };

  // Handle hover effect for charts (tooltip)
  const handleChartHover = (event, type, index) => {
    const { locationX, locationY } = event.nativeEvent;
    
    let text = '';
    switch (type) {
      case 'revenue-expenses':
        text = `Revenue: $${sampleData.revenue[activeTab][index].toLocaleString()}\nExpenses: $${sampleData.expenses[activeTab][index].toLocaleString()}`;
        break;
      case 'profit':
        text = `Profit: $${sampleData.profit[activeTab][index].toLocaleString()}`;
        break;
      case 'cashflow':
        text = `Cash Flow: $${sampleData.cashflow[activeTab][index].toLocaleString()}`;
        break;
    }
    
    setTooltipText(text);
    setTooltipPosition({ x: locationX, y: locationY - 50 });
    setTooltipVisible(true);
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setTooltipVisible(false);
    }, 3000);
  };

  // Render custom legend
  const renderLegend = (legend, colors) => (
    <View style={componentStyles.legend}>
      {legend.map((item, index) => (
        <View key={index} style={componentStyles.legendItem}>
          <View 
            style={[
              componentStyles.legendColor, 
              { backgroundColor: typeof colors[index] === 'function' ? colors[index](1) : colors[index] }
            ]} 
          />
          <Text style={componentStyles.legendText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  // Animation when tab changes
  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    animateCardEntrance();
    
    return () => {
      opacityAnim.setValue(0);
    };
  }, [activeTab]);

  return (
    <View style={styles.sectionCard}>
      {/* Finance Management Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Finance Management</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      <ScrollView style={componentStyles.container} showsVerticalScrollIndicator={false}>
        {/* Time Period Tabs */}
        <View style={componentStyles.tabContainer}>
          {['daily', 'weekly', 'monthly', 'yearly'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                componentStyles.tab,
                activeTab === tab && componentStyles.activeTab,
              ]}
              onPress={() => {
                setActiveTab(tab);
                opacityAnim.setValue(0);
              }}
            >
              <Text
                style={[
                  componentStyles.tabText,
                  activeTab === tab && componentStyles.activeTabText,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.View style={{ opacity: opacityAnim }}>
          {/* Key Metrics */}
          <View style={componentStyles.metricsContainer}>
            <View style={componentStyles.metricCard}>
              <Text style={componentStyles.metricTitle}>Revenue</Text>
              <Text style={componentStyles.metricValue}>
                ${(sampleData.revenue[activeTab][sampleData.revenue[activeTab].length - 1] / 1000).toFixed(1)}k
              </Text>
              <Text style={[componentStyles.metricChange, componentStyles.positiveChange]}>
                +{Math.floor(Math.random() * 8) + 3}% vs last {activeTab.slice(0, -2)}
              </Text>
            </View>

            <View style={componentStyles.metricCard}>
              <Text style={componentStyles.metricTitle}>Expenses</Text>
              <Text style={componentStyles.metricValue}>
                ${(sampleData.expenses[activeTab][sampleData.expenses[activeTab].length - 1] / 1000).toFixed(1)}k
              </Text>
              <Text style={[componentStyles.metricChange, Math.random() > 0.5 ? componentStyles.positiveChange : componentStyles.negativeChange]}>
                {Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 5) + 1}% vs last {activeTab.slice(0, -2)}
              </Text>
            </View>

            <View style={componentStyles.metricCard}>
              <Text style={componentStyles.metricTitle}>Profit</Text>
              <Text style={componentStyles.metricValue}>
                ${(sampleData.profit[activeTab][sampleData.profit[activeTab].length - 1] / 1000).toFixed(1)}k
              </Text>
              <Text style={[componentStyles.metricChange, componentStyles.positiveChange]}>
                +{Math.floor(Math.random() * 10) + 5}% vs last {activeTab.slice(0, -2)}
              </Text>
            </View>

            <View style={componentStyles.metricCard}>
              <Text style={componentStyles.metricTitle}>Growth Rate</Text>
              <Text style={componentStyles.metricValue}>
                {activeTab === 'daily' ? sampleData.growthRate.weekly : 
                  activeTab === 'weekly' ? sampleData.growthRate.monthly : 
                  activeTab === 'monthly' ? sampleData.growthRate.quarterly : 
                  sampleData.growthRate.yearly}%
              </Text>
              <Text style={[componentStyles.metricChange, componentStyles.positiveChange]}>
                +{(Math.random() * 1.5).toFixed(1)}% from previous
              </Text>
            </View>
          </View>

          {/* Revenue vs Expenses Line Chart */}
          <Animated.View style={[componentStyles.chartContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={componentStyles.sectionTitle}>Revenue vs Expenses</Text>
            <TouchableWithoutFeedback 
              onPress={() => handleChartPress('revenue-expenses')} 
              onLongPress={(e) => handleChartHover(e, 'revenue-expenses', 0)}
            >
              <View style={componentStyles.chartTouchable}>
                <LineChart
                  data={getCurrentData()}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    fillShadowGradientOpacity: 0.3,
                    fillShadowGradientToOpacity: 0.1,
                  }}
                  bezier
                  style={{ borderRadius: 8 }}
                  onDataPointClick={({index}) => handleChartPress('revenue-expenses', index)}
                  renderDotContent={({x, y, index, indexData}) => (
                    <View 
                      key={index} 
                      style={[componentStyles.decoratorDot, { 
                        left: x - 6, 
                        top: y - 6,
                        width: 12,
                        height: 12,
                        backgroundColor: index % 2 === 0 ? '#4CAF50' : '#FF9800',
                      }]} 
                    />
                  )}
                  getDotColor={(dataPoint, index) => index % 2 === 0 ? '#4CAF50' : '#FF9800'}
                />
              </View>
            </TouchableWithoutFeedback>
            {renderLegend(['Revenue', 'Expenses'], [(opacity = 1) => `rgba(76, 175, 80, ${opacity})`, (opacity = 1) => `rgba(255, 152, 0, ${opacity})`])}
          </Animated.View>

          {/* Profit Bar Chart */}
          <Animated.View style={[componentStyles.chartContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={componentStyles.sectionTitle}>Profit Trend</Text>
            <TouchableWithoutFeedback 
              onPress={() => handleChartPress('profit')} 
              onLongPress={(e) => handleChartHover(e, 'profit', 0)}
            >
              <View style={componentStyles.chartTouchable}>
                <BarChart
                  data={getProfitData()}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                    fillShadowGradientFrom: '#2196F3',
                    fillShadowGradientTo: '#64B5F6',
                  }}
                  style={{ borderRadius: 8 }}
                  showValuesOnTopOfBars
                  withInnerLines={true}
                  fromZero
                  onDataPointClick={({index}) => handleChartPress('profit', index)}
                />
              </View>
            </TouchableWithoutFeedback>
            {renderLegend(['Profit'], [(opacity = 1) => `rgba(33, 150, 243, ${opacity})`])}
          </Animated.View>

          {/* Cash Flow Line Chart */}
          <Animated.View style={[componentStyles.chartContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={componentStyles.sectionTitle}>Cash Flow</Text>
            <TouchableWithoutFeedback 
              onPress={() => handleChartPress('cashflow')} 
              onLongPress={(e) => handleChartHover(e, 'cashflow', 0)}
            >
              <View style={componentStyles.chartTouchable}>
              <LineChart
                  data={getCashFlowData()}
                  width={screenWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
                    fillShadowGradientFrom: '#9C27B0',
                    fillShadowGradientTo: '#CE93D8',
                  }}
                  bezier
                  style={{ borderRadius: 8 }}
                  onDataPointClick={({index}) => handleChartPress('cashflow', index)}
                  decorator={() => {
                    return tooltipVisible ? (
                      <View style={[componentStyles.tooltip, { left: tooltipPosition.x, top: tooltipPosition.y }]}>
                        <Text style={componentStyles.tooltipText}>{tooltipText}</Text>
                      </View>
                    ) : null;
                  }}
                  renderDotContent={({x, y, index}) => (
                    <View 
                      key={index} 
                      style={[componentStyles.decoratorDot, { 
                        left: x - 6, 
                        top: y - 6,
                        width: 12,
                        height: 12,
                        backgroundColor: '#9C27B0',
                      }]} 
                    />
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
            {renderLegend(['Cash Flow'], [(opacity = 1) => `rgba(156, 39, 176, ${opacity})`])}
          </Animated.View>

          {/* Expense Breakdown */}
          <Animated.View style={componentStyles.chartContainer}>
            <Text style={componentStyles.sectionTitle}>Expense Breakdown</Text>
            <TouchableWithoutFeedback onPress={() => handleChartPress('expense-breakdown')}>
              <View style={componentStyles.chartTouchable}>
                <PieChart
                  data={sampleData.expenseBreakdown}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  center={[10, 0]}
                  absolute
                  hasLegend={false}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={componentStyles.legend}>
              {sampleData.expenseBreakdown.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={componentStyles.legendItem}
                  onPress={() => handleChartPress('expense-breakdown', index)}
                >
                  <View style={[componentStyles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={componentStyles.legendText}>
                    {item.name}: ${(item.amount / 1000).toFixed(0)}k
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Financial Recommendations */}
          <View style={componentStyles.chartContainer}>
            <Text style={componentStyles.sectionTitle}>Recommendations</Text>
            {sampleData.recommendations.map((recommendation, index) => (
              <Animated.View 
                key={index} 
                style={[
                  componentStyles.recommendationCard,
                  { 
                    opacity: cardAnimations[index],
                    transform: [{ 
                      translateY: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                      }) 
                    }]
                  }
                ]}
              >
                <TouchableOpacity onPress={() => handleChartPress('recommendation', index)}>
                  <Text style={componentStyles.recommendationTitle}>{recommendation.title}</Text>
                  <Text style={componentStyles.recommendationText}>{recommendation.description}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Investment Opportunities */}
          <View style={componentStyles.chartContainer}>
            <Text style={componentStyles.sectionTitle}>Investment Opportunities</Text>
            {sampleData.investmentOpportunities.map((opportunity, index) => (
              <Animated.View 
                key={index} 
                style={[
                  componentStyles.recommendationCard,
                  { 
                    opacity: cardAnimations[index],
                    transform: [{ 
                      translateY: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                      }) 
                    }]
                  }
                ]}
              >
                <TouchableOpacity onPress={() => handleChartPress('investment', index)}>
                  <Text style={componentStyles.recommendationTitle}>{opportunity.sector} Sector</Text>
                  <Text style={componentStyles.recommendationText}>
                    Potential: {opportunity.potential} | Risk: {opportunity.risk} | Expected Return: {opportunity.return}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={componentStyles.detailModal}>
            <TouchableWithoutFeedback>
              <Animated.View 
                style={[componentStyles.modalContent, { transform: [{ scale: scaleAnim }] }]}
              >
                {selectedItem && (
                  <>
                    <Text style={componentStyles.modalTitle}>{selectedItem.title}</Text>
                    {selectedItem.data.map((item, index) => (
                      <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#4CAF50' }}>
                          {item.label}
                        </Text>
                        <Text style={componentStyles.modalText}>{item.value}</Text>
                      </View>
                    ))}
                    <TouchableOpacity 
                      style={componentStyles.modalButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={componentStyles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}