import createScreen from "@/router/helpers/create-screen";

import IdentityProviderSelector from "@/views/login/IdentityProvider/IdentityProviderSelector";
import UnivRennes1_Login from "@/views/login/IdentityProvider/providers/UnivRennes1";
import UnivRennes2_Login from "@/views/login/IdentityProvider/providers/UnivRennes2";
import UnivSorbonneParisNord_login from "@/views/login/IdentityProvider/providers/UnivSorbonneParisNord";
//import UnivUphf_Login from "@/views/login/IdentityProvider/providers/UnivUphf";
import { UnivIUTLannion_Login } from "@/views/login/IdentityProvider/providers/UnivIUTLannion";
import Muli_Login from "@/views/login/IdentityProvider/providers/Multi";

export default [
  createScreen("IdentityProviderSelector", IdentityProviderSelector, {
    headerTitle: "Universités et autres",
    headerBackVisible: true,
  }),

  createScreen("UnivRennes1_Login", UnivRennes1_Login, {
    headerBackVisible: true,
    headerTitle: "Université de Rennes",
  }),

  createScreen("UnivRennes2_Login", UnivRennes2_Login, {
    headerBackVisible: true,
    headerTitle: "Université de Rennes 2",
  }),

  createScreen("UnivIUTLannion_Login", UnivIUTLannion_Login, {
    headerBackVisible: true,
    headerTitle: "IUT de Lannion",
  }),

<<<<<<< HEAD

=======
>>>>>>> upstream/main
  createScreen("UnivSorbonneParisNord_login", UnivSorbonneParisNord_login, {
    headerBackVisible: true,
    headerTitle: "Université Sorbonne Paris Nord",
  }),

  createScreen("Multi_Login", Muli_Login, {
    headerBackVisible: true,
    headerTitle: "ESUP Multi",
  }),
] as const;
