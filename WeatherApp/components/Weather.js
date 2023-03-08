import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

export default function Weather({ forecast }) {
return (
<View style={styles.container}>
    <Text>{forecast.hour}</Text>
    <Image source={{ uri: getIcon(forecast?.icon) }}
                style={styles.Image} 
        />
    <Text>{forecast.temp}°C</Text>
</View> 
)}

const styles = {
    container : {
        backgroundColor: "#698269",
        height: 140, 
        width: 75,
        paddingVertical:6, 
        justifyContent:"center", 
        alignItems:"center",
        marginRight: 10, 
        borderRadius: 50,
    },
    Image: {
        width:50,
        height:50,
    },
}