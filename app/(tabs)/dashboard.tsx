import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import MapViewComponent from '@/components/molecules/MapView';
import ChartComponent from '@/components/molecules/Chart';
import DashboardDataTable from '@/components/DashboardDataTable';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://alobro.my.id/api/v1/dashboard');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();

        if (result.rescode === 200 && result.data) {
          setData(result.data);
        } else {
          console.error('Failed to fetch data:', result.message);
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data || !data.location) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    switch (item.type) {
      case 'chart':
        return <ChartComponent data={data} />;
      case 'map':
        return (
          <View style={styles.mapContainer}>
            <MapViewComponent locations={data.location} />
          </View>
        );
      case 'table':
        return <DashboardDataTable data={data} />;
      default:
        return null;
    }
  };

  const listData = [
    { type: 'chart' },
    { type: 'map' },
    { type: 'table' },
  ];

  return (
    <FlatList
      data={listData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 40, // Ensure there's enough space at the bottom for scrolling
  },
  mapContainer: {
    height: 300, // Adjust this height as needed
    marginBottom: 20,
  },
});

export default Dashboard;
