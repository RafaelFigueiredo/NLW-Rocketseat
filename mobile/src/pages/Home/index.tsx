import React, {useState} from 'react'
import {Alert, View, ImageBackground, Image, StyleSheet, Text, KeyboardAvoidingView, Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Feather as Icon} from '@expo/vector-icons'
import {RectButton} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select';

const Home = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

  function handleNavigationToPoints(){
    console.log(`navigating to points >> ${city}-${uf}`)
    navigation.navigate('Points',{
      uf,
      city
    })
  }
  return(
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS ==='ios'? 'padding': undefined}>
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/home-background.png')}
      imageStyle={{width: 274, height:368}}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <View>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <>
        <View style={styles.input}>
        <RNPickerSelect
            placeholder={{label:"Selecione a UF", value:''}}
            onValueChange={(uf) => {setUf(uf)}}
            value={uf}
            items={[
                { label: 'RJ', value: 'RJ' },
                { label: 'SP', value: 'SP' },
                { label: 'SC', value: 'SC' },
            ]}
        />
        </View>
        <View style={styles.input}>
        <RNPickerSelect
            placeholder={{label:"Selecione a Cidade", value:''}}
            onValueChange={(city) => {setCity(city)}}
            value={city}
            items={[
                { label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
                { label: 'Niterói', value: 'Niteroó' },
                { label: 'Caxias', value: 'Caxias' },
            ]}
        />
        </View>
        </>

        <RectButton style={styles.button} onPress={handleNavigationToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24}/>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>

    </ImageBackground>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


export default Home