import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface DataItem {
  label: string;
  value: string | number;
}

const DashboardDataTable = ({ data }: { data: any }) => {
  const dataItems: DataItem[] = [
    { label: 'Total Investment', value: data.total_invest },
    { label: 'Total Capacity', value: data.total_capacity },
    { label: 'Total Production', value: data.total_production },
    { label: 'Power Active', value: data.power_active },
    { label: 'ESG Rating', value: data.esg_rating },
    { label: 'Saving Coal', value: data.saving_coal },
    { label: 'CO2 Avoided', value: data.co2_avoid },
    { label: 'Tree Plants Equal', value: data.tree_plants_equal },
  ];

  return (
    <View style={styles.tableContainer}>
      <FlatList
        data={dataItems}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default DashboardDataTable;
