import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function App({marker, index}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const initialRegion = {
    latitude: -6.175392,
    longitude: 106.827153,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0021,
  };

  const getData = async () => {
    try {
      const response = await fetch(
        'https://covid19.mathdro.id/api/countries/ID',
      );
      const result = await response.json();
      const confirmed = result.confirmed.value;
      const recovered = result.recovered.value;
      const deaths = result.deaths.value;
      const arrayData = [confirmed, recovered, deaths];
      setData(arrayData);
    } catch {}
  };

  const getAllData = async => {
    return Promise.all([getData()]);
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={initialRegion}>
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}>
          <Callout tooltip>
            <View>
              <View style={styles.kontolodon}>
                <Text style={styles.name}>Confirmed : {data[0]}</Text>
                <Text style={styles.desc}>Recovered : {data[1]}</Text>
                <Text style={styles.desc}>Death : {data[2]}</Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  kontolodon: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 20,
    width: '100%',
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  desc: {},
});
