import React, { createRef, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useAccounts, useCurrentAccount } from "@/stores/account";
import { WebView } from "react-native-webview";
import type { Screen } from "@/router/helpers/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePapillonTheme as useTheme } from "@/utils/ui/theme";
import MaskStars from "@/components/FirstInstallation/MaskStars";
//import CookieManager from "@react-native-cookies/cookies";
import { Account, AccountService } from "@/stores/account/types";
import Reanimated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

import PapillonSpinner from "@/components/Global/PapillonSpinner";
import { animPapillon } from "@/utils/ui/animations";
import { useAlert } from "@/providers/AlertProvider";
import uuid from "@/utils/uuid-v4";
import useSoundHapticsWrapper from "@/utils/native/playSoundHaptics";
import defaultPersonalization from "@/services/smartschool/default-personalization";
import CookieManager from "@react-native-cookies/cookies";

const SmartschoolWebview: Screen<"SmartschoolWebview"> = ({ route, navigation }) => {
  const theme = useTheme();
  const { showAlert } = useAlert();

  const [, setLoading] = useState(true);
  const [, setLoadProgress] = useState(0);
  const [showWebView, setShowWebView] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [PHPSESSID, setPHPSESSID] = useState("");
  const [, setCurrentURL] = useState("");
  const [deviceUUID] = useState(uuid());
  const [name, setName] = useState("Jhon Doe");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [img, setImg] = useState("");
  const [userID, setUserID] = useState("");

  const [loginStep, setLoginStep] = useState("Préparation de la connexion");

  const { playSound } = useSoundHapticsWrapper();
  const LEson3 = require("@/../assets/sound/3.wav");
  const LEson4 = require("@/../assets/sound/4.wav");

  const instanceURL = route.params.instanceURL.toLowerCase();

  const ServerURL =
    instanceURL.match(/https?:\/\/([^/]+)\.smartschool\.be/)?.[0] || "";

  let webViewRef = createRef<WebView>();
  let currentLoginStateIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  const INJECT_USER_DATA_FETCHER = `
    (function () {
  const interval = setInterval(() => {
    try {
      const user = SMSC?.vars?.currentUser;
      if (user && user.name) {
        console.log("Name found:", user.name);

         window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "USER_INFO",
          name: user.name,
          firstName: user.name.split(" ")[0] || "",
          lastName: user.name.split(" ")[1] || "",
          img: user.userPictureUrl || "",
          userID: user.userIdentifier || ""
        }));
        clearInterval(interval); // Done waiting!
      } else {
        console.log("Waiting for SMSC.vars.currentUser");
      }
    } catch (err) {
      console.error("Error while accessing SMSC:", err);
      clearInterval(interval); // Avoid infinite loop on error
    }
  }, 500); // Check every 500ms
})();`.trim();

  const createStoredAccount = useAccounts((store) => store.create);
  const switchTo = useCurrentAccount((store) => store.switchTo);

  useEffect(() => {
    playSound(LEson3);
  }, []);

  const handleNavigationStateChange = async (navState) => {
    if (navState.url.endsWith(".smartschool.be/")) {
      const cookies = await CookieManager.get(navState.url);

      if (cookies?.PHPSESSID?.value) {
        console.log("PHPSESSID:", cookies.PHPSESSID.value);
        setPHPSESSID(cookies.PHPSESSID.value);
        setShowWebView(false);
        setLoginStep("Obtention des informations");
        setLoggingIn(true);

        if (currentLoginStateIntervalRef.current)
          clearInterval(currentLoginStateIntervalRef.current);

        setLoading(false);

        const account: Account = {
          instanceurl: ServerURL,
          service: AccountService.Smartschool,
          isExternal: false,
          linkedExternalLocalIDs: [],
          localID: deviceUUID,

          studentName: {
            first: firstName,
            last: lastName,
          },
          name,
          authentication: {
            session: cookies.PHPSESSID.value,
            account: cookies.PHPSESSID.value,
            userID: userID,
          },

          identity: {},
          serviceData: {},
          providers: [],
          personalization: await defaultPersonalization(
            img
          ),
        };

        createStoredAccount(account);
        setLoading(false);
        switchTo(account);

        // We need to wait a tick to make sure the account is set before navigating.
        queueMicrotask(() => {
          // Reset the navigation stack to the "Home" screen.
          // Prevents the user from going back to the login screen.
          playSound(LEson4);
          navigation.reset({
            index: 0,
            routes: [{ name: "AccountCreated" }],
          });
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <MaskStars />
      <KeyboardAvoidingView behavior="padding">
        <View
          style={[
            {
              flex: 1,
              marginTop: Platform.OS === "ios" ? 46 : 56,
              marginBottom: 10,
              width: Dimensions.get("window").width - 20,
              borderRadius: 10,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              shadowColor: theme.colors.border,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 0,
            },
            Platform.OS === "android" && {
              overflow: "hidden",
              elevation: 4,
            },
          ]}
        >
          {!showWebView && (
            <Reanimated.View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                backgroundColor: theme.colors.card,
              }}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
            >
              <PapillonSpinner
                animated={true}
                size={48}
                color={theme.colors.primary}
                strokeWidth={6}
                entering={!showWebView && FadeInUp.duration(200)}
                exiting={FadeOutDown.duration(100)}
              />

              <Reanimated.Text
                style={{
                  color: theme.colors.text,
                  marginTop: 10,
                  fontSize: 18,
                  fontFamily: "semibold",
                  textAlign: "center",
                }}
                entering={!showWebView && FadeInUp.duration(200)}
                exiting={FadeOutDown.duration(100)}
                layout={animPapillon(LinearTransition)}
              >
                Connexion à Smartschool
              </Reanimated.Text>

              <Reanimated.View
                layout={animPapillon(LinearTransition)}
                entering={!showWebView && FadeInUp.duration(200)}
                exiting={FadeOutDown.duration(100)}
                key={loginStep + "stp"}
              >
                <Reanimated.Text
                  style={{
                    color: theme.colors.text,
                    marginTop: 6,
                    fontSize: 16,
                    lineHeight: 20,
                    fontFamily: "medium",
                    opacity: 0.5,
                    textAlign: "center",
                  }}
                >
                  {loginStep}
                </Reanimated.Text>
              </Reanimated.View>
            </Reanimated.View>
          )}

          <WebView
            ref={webViewRef}
            onNavigationStateChange={handleNavigationStateChange}
            style={[
              styles.webview,
              {
                width: "100%",
                height: "100%",
                opacity: showWebView ? 1 : 0,
                borderRadius: 10,
                borderCurve: "continuous",
                overflow: "hidden",
                zIndex: 1,
              },
            ]}
            source={{ uri: instanceURL }}
            setSupportMultipleWindows={false}
            onLoadProgress={({ nativeEvent }) => {
              setLoadProgress(nativeEvent.progress);
            }}
            onMessage={async ({ nativeEvent }) => {
              const data = JSON.parse(nativeEvent.data);
              if (data.type === "USER_INFO") {
                console.log("User info received:", data);
                setName(data.name);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setImg(data.img);
                setUserID(data.userID);
              } else {
                console.warn("Unknown message type:", data.type);
              }
            }}
            onError={(e) => {
              console.error("Smartschool webview error", e);
            }}
            onLoadStart={(e) => {
              const { url } = e.nativeEvent;
              setCurrentURL(url);
              setLoading(true);
            }}
            onLoadEnd={(e) => {
              setShowWebView(true);
              webViewRef.current?.injectJavaScript(INJECT_USER_DATA_FETCHER);
            }
            }
            incognito={true} // prevent to keep cookies on webview load
            userAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  webview: {
    flex: 1,
  },
});

export default SmartschoolWebview;
