import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import { View, Text, Image, StyleSheet } from "react-native";

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`
export default function CurrentWeather({ data }) {
    const [currentWeather, setCurrentWeather] = useState(null)

    useEffect(() => {
        const currentW = data.list.filter(forecast => {
           const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
           const forecastDate = new Date(forecast.dt * 1000)
            return isSameDay(today, forecastDate) 
        })
        setCurrentWeather(currentW[0])
    }, [data])
    return (
        <View style={styles.container}>
        <Text style={styles.city}>{data?.city?.name}</Text>
        <Text style={styles.today}>Aujourd'hui</Text> 
        <Image source={{ uri: getIcon(currentWeather?.weather[0].icon) }}
                style={styles.Image} 
        />

        <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
        <Text style={styles.feels_like}>Ressenti : {Math.round(currentWeather?.main.feels_like)} °C </Text>
        <Text style={styles.description}>{currentWeather?.weather[0].description.toUpperCase()}</Text>
        </View>
    )
}
const COLOR = "#F1DBBF"

const styles = StyleSheet.create({
    container: {
        marginTop:40,
        alignItems: "center",
    },
    city: {
        fontSize: 36, 
        fontWeight: 500,
        color : COLOR,
        marginTop: 100,
    },
    today: {
        fontSize: 24, 
        fontWeight: 300,
        color : COLOR,
    },
    Image: {
        width:150,
        height:150,
        marginVertical: 20, 
    },
    temp:{
        fontSize: 80, 
        fontWeight: "bold",
        color : COLOR,
    },
    feels_like:{
        fontSize: 16, 
        fontWeight: "bold",
        color : COLOR,
        marginBottom: 2,
    },
    description:{
        fontSize: 30, 
        fontWeight: "bold",
        color : COLOR, 
        marginTop: 20,
    }
})