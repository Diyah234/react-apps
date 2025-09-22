import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
import house from '../../assets/images/House.png';
import bg from '../../assets/images/bg.png';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios'

 interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: [{
    main: string;
    description: string;
    icon: string;
  }];
}
export default function HomeScreen() {
 
   const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<Geolocation.GeoPosition | null>(null);
  const [weatherData, setWeatherData] =useState<WeatherData | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const loadedApiKey =process.env.EXPO_PUBLIC_API_KEY as string | undefined;
    if (loadedApiKey) {
      setApiKey(loadedApiKey);
    } else {
       setLoading(false);
      console.error('API key is not configured in app.config.ts');

      return;
    }
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // iOS handles permissions differently
    };

    const hasPermission = async () => {
      const result = await requestLocationPermission();
      if (result) {
        Geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation(position);
            console.log("Current Position:", position);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }else{
         setLoading(false);
      }
    };

    hasPermission();
  }, []); 

  useEffect(() =>{
    const fetchWeather=async() =>{
      
      if(currentLocation&& apiKey){
        setLoading(true)
        try{
          const lat = currentLocation?.coords.latitude;
      const lon = currentLocation?.coords.longitude;
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
          setWeatherData(response.data)
          console.log(response.data)

        }catch(error){
          console.log(error)
        }finally{
        setLoading(false)
      }
      } 
    }
    fetchWeather();
  }, [apiKey,currentLocation])
  return (
    

    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
  
        <View style={styles.weatherInfo}>
              {loading? 
              (<Text style={styles.cityName}>Loading...</Text>) :
              weatherData? (
                <>
                  <Text style={styles.cityName}>{weatherData.name}</Text>
                  <Text style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</Text>
                  <Text style={styles.condition}>{weatherData.weather[0].description}</Text>
                </>
              ) : (
            <Text style={styles.cityName}>Failed to load weather data.</Text>
            )}
       
          
           <View style={styles.houseContainer}>
          <Image source={house} style={styles.houseImage} />
        </View>
        {/* <View style={styles.button}>
        <Button title="Explore Cities" onPress={() => {}}  />
          </View> */}
          <Pressable style={styles.button} onPress={() => { navigation.navigate('explore');}}>
            <Text style={{color: 'white'}}>Explore</Text>
          </Pressable>
        </View>
        
      
       
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  bg: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    
  },
  h1: {
    color: 'white',
    fontSize: 40,
  },
   weatherInfo: {
    alignItems: 'center',
    marginTop: 100, // Adjust this to position the text properly from the top
    paddingHorizontal: 20,
  },
  cityName: {
    color: 'white',
    fontSize: 36,
    fontWeight: '300',
    marginBottom: 8,
  },
  temperature: {
    color: 'white',
    fontSize: 72,
    fontWeight: '200',
    marginBottom: 4,
  },
  condition: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.9,
    marginBottom: 4,
  },
    houseContainer: {
    alignItems: 'center',
    marginBottom: 50, 
  },
  houseImage: {
    width: 240, 
    height: 250, 
    resizeMode: 'contain',
  },
  button:{
    backgroundColor: '#48319D',
    color: '#ffff',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  }
});