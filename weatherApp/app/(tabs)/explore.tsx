import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { cities } from "./cities";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, Search } from "lucide-react";
import { useNavigation } from "@react-navigation/native";
interface WeatherDataItem {
  id: string;
  name: string;
  state: string;
  temp: number;
  description: string;
  icon: string;
}

export default function TabTwoScreen() {
  const [weatherData, setWeatherData] = useState<WeatherDataItem[]>([]);
  const [originalWeatherData, setOriginalWeatherData] = useState<WeatherDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [input, setInput] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(false);
     const [searchLoading, setSearchLoading] = useState(false);
     const nagivation =  useNavigation();

  useEffect(() => {
    // Get the API key from environment variables
    const loadedApiKey = process.env.EXPO_PUBLIC_API_KEY as string | undefined;
    if (loadedApiKey) {
      setApiKey(loadedApiKey);
    } else {
      console.error("API key is not configured.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllWeather = async () => {
      if (apiKey) {
        setLoading(true);
        try {
          // Flatten the city data into a single array of objects
          const allCities = cities.flatMap((state) =>
            state.cities.map((city) => ({
              id: `${state.name}-${city}`,
              name: city,
              state: state.name,
              queryName: state.name,
            }))
          );

          // Create an array of promises for all API calls
          const promises = allCities.map((cityInfo) =>
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityInfo.name}&appid=${apiKey}&units=metric`
              )
              .then((response) => {
                const data = response.data;
                // Return a structured object with relevant weather data
                return {
                  id: cityInfo.id,
                  name: data.name,
                  state: cityInfo.state,
                  temp: data.main.temp,
                  description: data.weather[0].description,
                  icon: data.weather[0].icon,
                };
              })
              .catch((error) => {
                console.error(
                  `Error fetching weather for ${cityInfo.name}:`,
                  error
                );
                return null; // Return null on error so Promise.all doesn't fail
              })
          );

          // Wait for all promises to resolve
          const results = await Promise.all(promises);
          // Filter out any failed requests and update the state
          const validResults = results.filter(
            (item) => item !== null
          ) as WeatherDataItem[];
          setWeatherData(validResults);
          setOriginalWeatherData(validResults)
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAllWeather();
  }, [apiKey]);


 
  const handleSearch = (text: string) => {
    setInput(text);
    
    // If input is cleared, restore original data
    if (text.trim() === '' && isSearchMode) {
      setWeatherData(originalWeatherData);
      setIsSearchMode(false);
    }
  };

  const searchCityWeather = async (cityName: string) => {
    if (!apiKey) {
      console.log("Error", "API key not configured");
      return;
    }

    if (!cityName.trim()) {
      console.log("Error", "Please enter a city name");
      return;
    }

    setSearchLoading(true);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      
      const data = response.data;
      console.log("API response data:", data);
      // Create weather data object for searched city
      const searchResult: WeatherDataItem = {
        id: `search-${data.id}`,
        name: data.name,
        state: data.sys.country, // Use country code as state for international cities
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      // Replace current weather data with search result
      setWeatherData([searchResult]);
      setIsSearchMode(true);
      console.log("Search successful:", searchResult);
      
    } catch (error) {
      console.error("Error searching for city:", error);
      
      // // Handle different error types
      // if (axios.isAxiosError(error)) {
      //   if (error.response?.status === 404) {
      //     Alert.alert("City Not Found", `No weather data found for "${cityName}". Please check the spelling and try again.`);
      //   } else if (error.response?.status === 401) {
      //     Alert.alert("API Error", "Invalid API key. Please check your configuration.");
      //   } else {
      //     Alert.alert("Network Error", "Failed to fetch weather data. Please check your internet connection.");
      //   }
      // } else {
      //   Alert.alert("Error", "An unexpected error occurred while searching for the city.");
      // }
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmitEditing = () => {
    if (input.trim()) {
      searchCityWeather(input.trim());
    }
  };

  const clearSearch = () => {
    setInput('');
    setWeatherData(originalWeatherData);
    setIsSearchMode(false);
  };
  const handleGoBack = () => {
    nagivation.goBack();
  }
  const renderItem = ({ item }: { item: WeatherDataItem }) => (
    <View>
      <View style={styles.cards}>
        <View>
          <Text style={styles.temp}>{Math.round(item.temp)}°C</Text>
          <Text style={styles.state}>
            {item.name}, {item.state}
          </Text>
        </View>
        <View style={styles.descriptionBox}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
            }}
            style={styles.weatherIcon}
          />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#2b2f54", "#272b4dff"]}
        locations={[0.8, 0.2]}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.container}
      >
        <SafeAreaView>
          <View style={styles.back}>
             <TouchableOpacity onPress={handleGoBack}>
              <ChevronLeft color='gray' size={30}/>
            </TouchableOpacity>
            <View>
              <Text style={styles.backText}>Weather Forecasts</Text>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Search size={15} />
            <TextInput
              placeholder="Search city"
              style={[
                styles.input,
                Platform.OS === "web" && ({ outlineStyle: "none" } as any),
              ]}
              placeholderTextColor="Search for a city"
              underlineColorAndroid="transparent"
              value={input}
              onChangeText={handleSearch}
              onSubmitEditing={handleSubmitEditing}
              returnKeyType="search"
              editable={!searchLoading}
            />
           {isSearchMode && (
              <Text 
                style={styles.clearButton}
                onPress={clearSearch}
              >
                Clear
              </Text>
            )}
          </View>
          {/* Search status indicator */}
          {isSearchMode && !searchLoading && (
            <View style={styles.searchStatus}>
              <Text style={styles.searchStatusText}>
                Showing results for: &quot;{input}&quot;
              </Text>
              <Text style={styles.searchHint}>
                Clear search to see all cities
              </Text>
            </View>
          )}
         {/* Loading states */}
          {(loading || searchLoading) ? (
            <View style={styles.loadingContainer}>
              <Text style={{ color: "white", fontSize: 16 }}>
                {searchLoading ? `Searching for "${input}"...` : "Loading weather for all cities..."}
              </Text>
            </View>
          ) : (
             <FlatList
              data={weatherData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.weathers}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No weather data available</Text>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    color: "white",
    height: "100%",
    width: "100%",
    overflowY: "scroll",
  },
  cards: {
    backgroundColor: "#5936B4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
    color: "white",
  },
  weathers: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    gap: 20,
  },
  back: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },
  weatherIcon: {
    width: 150,
    height: 100,
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1B33",
    gap: 5,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    borderWidth: 0,
    borderColor: "transparent",
    color: "white",
    width: "90%",
    fontSize: 15,
  },
  temp: {
    fontSize: 35,
    fontWeight: "600",
    color: "white",
    paddingBottom: 10,
  },
  description: {
    fontSize: 13,
    textTransform: "capitalize",
    color: "white",
    paddingBottom: 8,
  },
  state: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  descriptionBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  clearButton: {
    color: "#5936B4",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchStatus: {
    backgroundColor: "rgba(89, 54, 180, 0.2)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  searchStatusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  searchHint: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    opacity: 0.7,
  },
});
