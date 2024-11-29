import React from 'react';
import { View, Text, Platform } from 'react-native';

// Import MapView only if not on the web
let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
}

interface Location {
  lat: number;
  lng: number;
  nameproject: string;
}

interface MapViewProps {
  locations: Location[];
}

const MapViewComponent: React.FC<MapViewProps> = ({ locations }) => {
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <Text>Maps are not supported on the web.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: locations[0]?.lat || 0,
          longitude: locations[0]?.lng || 0,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {locations.map((loc, index) => (
          <Marker key={index} coordinate={{ latitude: loc.lat, longitude: loc.lng }}>
            <Text>{loc.nameproject}</Text>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapViewComponent;
