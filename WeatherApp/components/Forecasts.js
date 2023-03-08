import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Weather from "./Weather";

export default function Forecasts({ data }) {
   const [forecasts, setForecasts] = useState([])

    useEffect(() => {
        console.log(data);
    const forecastsData = data.list.map(f => {
        const dt = new Date(f.dt * 1000)
        return ({
            hour: dt.getHours() + "H",
            temp: Math.round(f.main.temp),
            icon: f.weather[0].icon, 
            name: format(dt, "EEEE", {locale: fr }),
        })
    })
    //logique pour regrouper les éléments par journée - name
    let newForecastsData = forecastsData.map(forecast => {
        return forecast.name
    }).filter((day, index, self) => {
        return self.indexOf(day) === index
    }).map((day) => {
        return {
            day,
            data: forecastsData.filter((forecast) => forecast.name === day)
        }
    })
    console.log(forecastsData);
    setForecasts(newForecastsData)
   }, [data])
   
   
    return (
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
            {forecasts.map(f => (
        <View>
        <Text style={styles.day}>{f.day.toUpperCase()}</Text>
        <View style={styles.container}>
        {f.data.map(w => <Weather forecast={w} />)}
        </View>
        </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
scroll:{
    width: "100%",
    height:"35%",
    marginTop: 80, 
},
container: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 15,
},
day: {
    fontsize:16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5
},

})