import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Linking, Alert, Pressable, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import BotaoFlutuante from '../components/BotaoFlutuante';
import themes from '../themes'


export default function Scanner({navigation}) {
	const [hasPermission, setHasPermission] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [data, setData] = useState('');
	const [supported, setSupported] = useState(true)

	useEffect(() => {
		(async () => {
			const { granted } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(granted);
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});

		if (!result.canceled) {
			let scan = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri);
			if (scan.length == 0){
				// pass
			}
			else{
				handleBarCodeScanned(scan[0]);
			}
		}
	};

	const OpenURLButton = ({url, children}) => {
		const handlePress = useCallback(async () => {

		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert(`Don't know how to open this URL: ${url}`);
		}
		}, [url]);

		return <Pressable url={data} onPress={handlePress}
				style={({pressed}) => [
					{
			  			backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro,
					},
						styles.botao,
		  		]}
				><Text style={styles.btnTexto}>ABRIR LINK NO NAVEGADOR</Text></Pressable>
	};

	const handleBarCodeScanned = ({ data }) => {
		(async () => {
			const supported = await Linking.canOpenURL(data);
			setSupported(supported);
		})()
		
		setScanned(true);
		setData(data);

	};

	if (hasPermission === null) {
		return <Text style={styles.texto}>Solicitando permissão para usar a câmera</Text>;
	}
	if (hasPermission === false) {
		return <Text style={styles.texto}>Acesso negado à câmera</Text>;
	}

	return (
		
		<View style={styles.container}>
		{scanned ? (
			<View>
				<View style={styles.fundourl}>
					<Text style={styles.data}>{data}</Text>
				</View>
			{supported ? (
				<OpenURLButton url={data}>Abrir Link no navegador</OpenURLButton>
			) : (
				<></>
			)
			}

			<Pressable onPress={() => setScanned(false)}
				style={({pressed}) => [
					{backgroundColor: pressed ? themes.colors.brand.vermelhoClaro : themes.colors.brand.vermelhoEscuro},
					styles.botao]}>
                <Text style={styles.btnTexto}>ESCANEAR NOVAMENTE</Text>
            </Pressable>
			</View>
		) : ( 
		<>
				<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{
					width: Dimensions.get('screen').width * 1.5,
					height: Dimensions.get('screen').height * 1.5,
				}}>
				</BarCodeScanner>
				<BotaoFlutuante onPress={pickImage} icon="file-find-outline" size={75} style={styles.fileBtn}></BotaoFlutuante>
			</> 
		)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		backgroundColor: themes.colors.brand.roxoClaro,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fundourl: {
		backgroundColor: themes.colors.brand.roxoEscuro,
		borderRadius: 10,
		borderWidth: 1
	},
	data: {
		fontSize: 20,
		color: 'black',
		margin: 10,
		padding: 15,
		alignSelf: 'center'
	},
	texto: {
		fontSize: 30,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	botao: {
		//backgroundColor: themes.colors.brand.vermelhoEscuro,
		marginTop: 15,
		padding: 15,
		borderRadius: 8,
		borderWidth: 1
	},
	fileBtn: {
		alignSelf: "center",
		position: "absolute",
		bottom: Dimensions.get('screen').height / 8,
	},
	btnTexto: {
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontWeight: 600
	}
});

