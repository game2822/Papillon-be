import type { Personalization } from "@/stores/account/types";
import { defaultTabs } from "@/consts/DefaultTabs";
import downloadAsBase64 from "@/utils/external/download-as-base64";

import colors from "@/utils/data/colors.json";

const defaultSmartSchoolTabs = [
  "Home",
  "Lessons",
  "Homeworks",
  "Grades",
  "News",
  "Attendance",
  "Messages",
  "Menu"
] as typeof defaultTabs[number]["tab"][];

const defaultPersonalization = async (img:string): Promise<Partial<Personalization>> => {
  return {
    color: colors[0],
    MagicHomeworks: true,
    MagicNews: true,
    profilePictureB64: img? await downloadAsBase64(img) : undefined,

    tabs: defaultTabs.filter(current => defaultSmartSchoolTabs.includes(current.tab)).map((tab, index) => ({
      name: tab.tab,
      enabled: index <= 4
    }))
  };
};

export default defaultPersonalization;
