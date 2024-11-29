import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Button, Linking, Platform } from 'react-native';
import axios from 'axios';
import { getAccessToken } from '@/api/login';

type PowerPlantData = {
  id: number;
  name: string;
  project_cost: number;
  developer: string;
  coordinate: string;
  commercial_operation_date: string;
  location: string;
  phase: string;
  power_plants: Array<{
    interconnection: string;
    capacity: string;
    type: string;
    lat: number;
    lng: number;
  }>;
  status_operation: {
    maximum_power_output: string;
    date: string;
    power_output: {
      desktop: number;
      mobile: number;
    };
  };
  employee: {
    tugas_karya: number;
    internal_jvc: number;
  };
  tariff: {
    jsd_one: number;
    jsd_two: number;
  };
  cumulative_electricity_production: {
    daily: number;
    monthly: number;
    unit: string;
  };
};

const Overview = ({ route }: { route: any }) => {
//   const { projectSlug } = route.params; // Get dynamic project slug (e.g., "pltu-jawa-7", "plts-ikn")
  const [data, setData] = useState<PowerPlantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()

      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://alobro.my.id/api/v1/overview/pltu-jawa-7`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in Authorization header
            },
          }
        );

        if (response.data.status) {
          setData(response.data.data); // Store the response data
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching project data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, ['pltu-jawa-7']); // Re-fetch when projectSlug changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!data) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{data.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Developer: {data.developer}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Location: {data.location}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Operation Phase: {data.phase}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Commercial Operation Date: {new Date(data.commercial_operation_date).toLocaleDateString()}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Power Plants:</Text>
      {data.power_plants.map((plant, index) => (
        <View key={index}>
          <Text>Interconnection: {plant.interconnection}</Text>
          <Text>Capacity: {plant.capacity}</Text>
          <Text>Type: {plant.type}</Text>
        </View>
      ))}

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Status Operation:</Text>
      <Text>Max Power Output: {data.status_operation.maximum_power_output}</Text>
      <Text>Power Output (Desktop): {data.status_operation.power_output.desktop} MW</Text>
      <Text>Power Output (Mobile): {data.status_operation.power_output.mobile} MW</Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Employee Info:</Text>
      <Text>Tugas Karya: {data.employee.tugas_karya}</Text>
      <Text>Internal JVC: {data.employee.internal_jvc}</Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Tariff:</Text>
      <Text>JSD One: {data.tariff.jsd_one} IDR/kWh</Text>
      <Text>JSD Two: {data.tariff.jsd_two} IDR/kWh</Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Electricity Production:</Text>
      <Text>Daily Production: {data.cumulative_electricity_production.daily} MWh</Text>
      <Text>Monthly Production: {data.cumulative_electricity_production.monthly} MWh</Text>

      {/* Link to Google Maps */}
      <Button
        title="View on Google Maps"
        onPress={() => Linking.openURL(data.coordinate)}
      />
    </View>
  );
};

export default Overview;
