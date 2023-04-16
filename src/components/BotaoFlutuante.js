import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import themes from "../themes"

const BotaoFlutuante =({onPress, icon, size, style}) => (

    <TouchableOpacity style={StyleSheet.create({...style, width: size, height: size})}
        onPress={onPress} icon={icon}>
        <MaterialCommunityIcons name={icon} size={size}
            color={themes.colors.neutral.background} />
    </TouchableOpacity>
)

export default BotaoFlutuante

