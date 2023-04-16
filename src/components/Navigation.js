import { createNativeStackNavigator }
    from '@react-navigation/native-stack'
import { NavigationContainer }
    from '@react-navigation/native'
import Home from '../screens/Home'
import Scanner from '../screens/Scanner'
import themes from '../themes'

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{title: 'SCANdinavia - QR Code Scanner', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro}}}    
            />
            <Stack.Screen 
                name="Scanner" 
                component={Scanner} 
                options ={{ presentation: 'modal', headerStyle:{backgroundColor: themes.colors.brand.roxoEscuro} }} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}