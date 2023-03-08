import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';
import * as Location from "expo-location";
import axios from 'axios';

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c0526873bd2aaf4e98ead041cf09c76c&lang=fr&units=metric`

export default function App() {
 // récuperer les coordonnées de l'utilisateur 
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      return
    }
    const userlocation = await Location.getCurrentPositionAsync()
    getWeather(userlocation)
    }
    getCoordinates()
  }, [])
  
  // réaliser requête au serveur
  const getWeather = async (location) => {
    try {
    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

    setData(response.data)
    setLoading(false)
   } catch(e) {
    console.log("Erreur récupération API" + e)
   }
  }
 
  if (loading){
    return  (
    <View style={styles.container}>
    <ActivityIndicator />
    <StatusBar style="auto" />
  </View>
    )
  }


  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <StatusBar style="auto" />
      <Forecasts data={data} />
    </View>
  );
}

const BACKCOLOR = "#A64B2A";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
