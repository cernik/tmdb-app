import {
  TMDB_API_KEY,
  FB_APP_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from "react-native-dotenv";

export default ({ config }) => ({
  ...config,
  extra: {
    fbAppId: FB_APP_ID,
    googleIosClientId: GOOGLE_IOS_CLIENT_ID,
    googleAndroidClientId: GOOGLE_ANDROID_CLIENT_ID,
    apiUrl: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`,
    imageUrlPrefix: "http://image.tmdb.org/t/p/",
  },
  ios: {
    ...config.ios,
    config: {
      googleSignIn: {
        reservedClientId: GOOGLE_IOS_CLIENT_ID,
      },
    },
  },
  facebookScheme: `fb${FB_APP_ID}`,
});
