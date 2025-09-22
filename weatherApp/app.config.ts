import 'dotenv/config';

console.log('Environment API Key:', process.env.OPENWEATHERMAP_API_KEY);
export default {
  "expo": {
    "name": "weatherApp",
    "slug": "weatherApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "weatherapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
       "bundleIdentifier": 'com.anonymous.weatherapp',
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs your location to display the current weather."
      }
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "package": "com.anonymous.weatherApp",
      "permissions": [
        "ACCESS_FINE_LOCATION"
      ],
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    //  "extra": {
    //   "openWeatherMapApiKey": process.env.OPENWEATHERMAP_API_KEY
    // }
  }
}
