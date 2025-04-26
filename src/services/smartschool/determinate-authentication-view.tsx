import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteParameters } from "@/router/helpers/types";
import { BadgeX, KeyRound, LockKeyhole, PlugZap } from "lucide-react-native";
import pronote from "pawnote";
import {info, warn} from "@/utils/logger/logger";
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
  let waitingInstance: pronote.Instance | undefined;
  if (!smartschoolURL.startsWith("https://") && !smartschoolURL.startsWith("http://")) {
    smartschoolURL = `https://${smartschoolURL}`;
  }
  smartschoolURL = pronote.cleanURL(smartschoolURL);

  try {
    waitingInstance = await pronote.instance(smartschoolURL);
    info("PRONOTE->determinateAuthenticationView(): OK", "pronote");
  }
  catch (error) {
    try {
      warn(`PRONOTE->determinateAuthenticationView(): Une erreur est survenue avec l'URL '${smartschoolURL}' ! Tentative avec une URL alternative (TOUTATICE)...`, "pronote");
      smartschoolURL = smartschoolURL.replace(".index-education.net", ".pronote.toutatice.fr");
      waitingInstance = await pronote.instance(smartschoolURL);
      info("PRONOTE->determinateAuthenticationView(): OK", "pronote");
    }
    catch {
      showAlert({
        title: "Erreur",
        message: "Impossible de récupérer les informations de l'instance PRONOTE.",
        icon: <BadgeX />,
      });

      return;
    }
  }

  const instance = waitingInstance as pronote.Instance;

  const goToLoginNoENT = () => navigation.navigate("PronoteCredentials", {
    instanceURL: smartschoolURL,
    information: instance
  });

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
