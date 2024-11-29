import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface ChartProps {
  data: {
    total_invest: number;
    total_capacity: number;
    total_production: number;
  };
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Total Invest', 'Total Capacity', 'Total Production'],
    datasets: [
      {
        data: [data.total_invest, data.total_capacity, data.total_production],
      },
    ],
  };

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Dashboard Overview</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=''
        yAxisSuffix= '' 
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#1cc910',
          backgroundGradientTo: '#1cc910',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        }}
        style={{ marginVertical: 8 }}
      />
    </View>
  );
};

export default ChartComponent;
