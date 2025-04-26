import createScreen from "@/router/helpers/create-screen";

import SmartschoolManualURL from "@/views/login/smartschool/SmartschoolManualURL";
import SmartschoolWebview from "@/views/login/smartschool/SmartschoolWebview";

export default [
  createScreen("SmartschoolManualURL", SmartschoolManualURL, {
    headerTitle: "",
    headerTransparent: true,
    headerBackVisible: true
  }),
  createScreen("SmartschoolWebview", SmartschoolWebview, {
    headerTitle: "",
    headerTransparent: true,
    headerBackVisible: true
  })

] as const;
