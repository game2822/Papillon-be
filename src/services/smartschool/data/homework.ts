import { type Homework } from "@/services/shared/Homework";
import { SmartschoolAccount } from "@/stores/account/types";
import { weekNumberToIsoDate } from "@/utils/epochWeekNumber";


export const getHomeworkForWeek = async (
  account: SmartschoolAccount,
  weekNumber: number
): Promise<Homework[]> => {
  const weekdays = weekNumberToIsoDate(weekNumber);

  const API_URL = "127.0.0.1:3000/api/data";

  const response = await fetch(API_URL, {
    headers: {
      "^User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0^",
      Accept: "application/json",
    },
    credentials: "include", // Include cookies for authentication
  });

  if (!response.ok) {
    console.error("Failed to fetch homework data:", response.status);
    return [];
  }

  const data = JSON.parse(await response.text());

  // Map the Smartschool data into your internal Homework structure
  const homeworkList: Homework[] = data.map((item: any) => ({
    id: item.id,
    subject: item.participants?.groups?.[0]?.name ?? "Unknown Subject",
    attachments: [], // You can populate this if attachments are provided in future
    color: "#000000", // Default color, can be customized
    content: item.name,
    due: new Date(item.period?.dateTimeFrom).getTime(),
    done: false, // not sure if that’s correct
    personalizate: false,
  }));

  return homeworkList;
};


export const toggleHomeworkState = async (
  _account: unknown,
  h: Homework
): Promise<void> => {
  console.log(
    `DEBUG->toggleHomeworkState(): Pretending to toggle homework ${h.id} to ${!h.done ? "done" : "not done"}`
  );
};
// This function is a placeholder for toggling homework state.