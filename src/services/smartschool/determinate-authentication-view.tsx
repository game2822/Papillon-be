import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteParameters } from "@/router/helpers/types";
import { BadgeAlert, BadgeX, KeyRound, LockKeyhole, PlugZap } from "lucide-react-native";
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
    if (response.ok) {
      console.log("Response OK", response.status);
      info("SMARTSCHOOL->determinateAuthenticationView(): OK", "smartschool");
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

  const goToLoginENT = () => navigation.navigate("PronoteWebview", {
    instanceURL: smartschoolURL
  });

  info(JSON.stringify(instance, null, 2), (new Error()).stack!);
  if (instance.casToken && instance.casURL) {
    showAlert({
      title: `L'instance ${instance.name} nécessite une connexion ENT.`,
      message: "Tu seras redirigé vers le portail de connexion de ton ENT.",
      icon: <PlugZap />,
      actions: [
        {
          title: "Identifiants",
          onPress: () => goToLoginNoENT(),
          icon: <KeyRound />,
        },
        {
          title: "Utiliser l'ENT",
          onPress: () => goToLoginENT(),
          primary: true,
          icon: <LockKeyhole />,
        }
      ],
    });
  }
  else goToLoginNoENT();
};

export default determinateAuthenticationView;
