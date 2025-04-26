import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteParameters } from "@/router/helpers/types";
import { Fingerprint, BadgeAlert, BadgeX, KeyRound, PlugZap } from "lucide-react-native";
import {info} from "@/utils/logger/logger";
import type { Alert } from "@/providers/AlertProvider";

/**
 * Va exécuter une requête pour déterminer
 * la vue d'authentification à afficher.
 *
 * Permet de savoir si l'on a besoin d'une connexion
 * par ENT ou d'une connexion par identifiants simples.
 */
const determinateAuthenticationView = async <ScreenName extends keyof RouteParameters>(
  smartschoolURL: string,
  navigation: NativeStackNavigationProp<RouteParameters, ScreenName>,
  showAlert: (alert: Alert) => void
): Promise<void> => {
  if (!smartschoolURL.startsWith("https://") && !smartschoolURL.startsWith("http://")) {
    smartschoolURL = `https://${smartschoolURL}`;
  }

  if (!smartschoolURL.includes("smartschool.be")) {
    showAlert({
      title: "Erreur",
      message: "L'URL fournie ne semble pas être une instance SMARTSCHOOL.",
      icon: <BadgeAlert />,
    });

    return;
  }

  try {
    const response = await fetch(smartschoolURL, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
      }
    });
    const loginoptionmodal =() => {
      showAlert({
        title: "Comment souhaite-tu te connecter ?",
        message: "Tu peux te connecter avec tes infos ou avec Microsoft. Pas d’inquiétude, Papillon n’est pas lié à Microsoft ou à Smartschool, et ne consulte pas tes données, il ne les enregistre pas non plus. Tu seras juste redirigé sur ton choix.",
        icon: <PlugZap />,
        actions: [
          {
            title: "Identifiants",
            onPress: () => goToLoginCredientals(),
            icon: <KeyRound />,
          },
          {
            title: "Microsoft",
            onPress: () => goToLoginMicrosoft(),
            primary: true,
            icon: <Fingerprint />,
          }
        ],
      });
    };

    if (response.ok) {
      console.log("Response OK", response.status);
      info("SMARTSCHOOL->determinateAuthenticationView(): OK", "smartschool");
      loginoptionmodal();
    } else {
      throw new Error("Network response was not ok");
    }
  }
  catch (error) {
    showAlert({
      title: "Erreur",
      message: "Impossible de récupérer les informations de l'instance SMARTSCHOOL.",
      icon: <BadgeX />,
    });

    return;
  }

  const goToLoginCredientals = () => navigation.navigate("SmartschoolWebview", {
    instanceURL: smartschoolURL
  });

  const goToLoginMicrosoft = () => navigation.navigate("SmartschoolWebview", {
    instanceURL: smartschoolURL + "/login/sso/init/office365"
  });
};


export default determinateAuthenticationView;
