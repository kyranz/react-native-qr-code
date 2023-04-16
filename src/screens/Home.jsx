import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import BotaoFlutuante from '../components/BotaoFlutuante'
import themes from '../themes'
import { MotiView } from 'moti';

function Animate(props) {
  return (
    <MotiView
      from={{
        rotate: "10deg",
      }}
      animate={{
        rotate: "-10deg",
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 1500,
        delay: 100,
      }}
      style={styles.shape}
    >{props.children}</MotiView>
  );
}

export default function Home({navigation}){
    return (
        <View style={styles.container}>
          <View style={styles.logo_fundo}>   
            <Text style={styles.texto}>SCAN<Text style={styles.subtexto}>dinavia</Text></Text>
          </View>
            <Image
              source={require('../../assets/viking128px.png')}
              style={styles.button}/>
            <MotiView style={styles.container}>
              <Animate>
                <BotaoFlutuante onPress={()=> navigation.navigate("Scanner")}
                                icon="qrcode-scan" size={150} style={styles.button}/> 
              </Animate>
            </MotiView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themes.colors.brand.roxoClaro,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo_fundo: {
      backgroundColor: themes.colors.brand.roxoEscuro,
      marginTop: 20,
      padding: 10,
      borderRadius: 16
    },
    data: {
      fontSize: 20,
      marginVertical: 10,
      alignSelf: 'center'
    },
    texto: {
      color: '#e2e6e7',
      fontSize: 30,
      fontWeight: 800,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    subtexto: {
      color: "#000000",
      fontSize: 30,
      fontWeight: 800,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    button: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    shape: {
      justifyContent: 'center',
      borderRadius: 25,
      marginRight: 10,
    },
  });
