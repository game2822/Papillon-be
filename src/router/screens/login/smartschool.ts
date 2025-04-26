import createScreen from "@/router/helpers/create-screen";

import SmartschoolManualURL from "@/views/login/smartschool/SmartschoolManualURL";


export default [
  createScreen("SmartschoolManualURL", SmartschoolManualURL, {
    headerTitle: "",
    headerTransparent: true,
    headerBackVisible: true
  })

] as const;
