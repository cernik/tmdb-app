import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-google-app-auth";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

import { noop } from "utils";
import Button from "./Button";
import Row from "./Row";
import styles, { PADDING } from "../styles";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = Constants.manifest.extra.fbAppId;
const GOOGLE_IOS_CLIENT_ID = Constants.manifest.extra.googleIosClientId;
const GOOGLE_ANDROID_CLIENT_ID = Constants.manifest.extra.googleAndroidClientId;

const useProxy = Platform.select({ web: false, default: true });

const discovery = {
  authorizationEndpoint: "https://www.facebook.com/v6.0/dialog/oauth",
  tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
};

function useFacebookAuthRequest() {
  return AuthSession.useAuthRequest(
    {
      clientId: FB_APP_ID,
      scopes: ["public_profile"],
      redirectUri: AuthSession.makeRedirectUri({
        useProxy,
        native: `fb${FB_APP_ID}://authorize`,
      }),
      extraParams: {
        display: Platform.select({ web: "popup" }),
        auth_type: "rerequest",
      },
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );
}

const loginWithGoogle = async (callback = noop) => {
  try {
    const result = await Google.logInAsync({
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosStandaloneAppClientId: GOOGLE_IOS_CLIENT_ID,
      androidStandaloneAppClientId: GOOGLE_ANDROID_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      callback({
        ...result.user,
        avatar: result.user.photoUrl,
        type: "google",
      });
    } else {
      alert("Uh oh, something went wrong");
    }
  } catch (e) {
    throw e;
  }
};

const LoginButton = ({ onPress = noop, iconName = "facebook" }) => {
  return (
    <Button title="Login with" onPress={onPress}>
      <FontAwesome
        name={iconName}
        size={20}
        style={{ marginHorizontal: PADDING }}
      />
    </Button>
  );
};

export const FacebookLoginButton = ({ onLogin = noop }) => {
  const [request, response, promptAsync] = useFacebookAuthRequest();
  const handlePress = async () => {
    try {
      const result = await promptAsync({ useProxy });

      if (result.type === "success") {
        let accessToken = result.params.access_token;
        let userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();

        onLogin({
          ...userInfo,
          avatar: userInfo.picture.data.url,
          type: "facebook",
        });
      } else {
        alert("Uh oh, something went wrong");
      }
    } catch (e) {
      throw e;
    }
  };
  return <LoginButton iconName="facebook" onPress={handlePress} />;
};

export const GoogleLoginButton = ({ onLogin = noop }) => {
  const handlePress = () => loginWithGoogle(onLogin);

  return <LoginButton iconName="google" onPress={handlePress} />;
};

export default LoginButton;
