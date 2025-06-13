import type { SmartschoolAccount } from "@/stores/account/types";
import { weekNumberToDateRange } from "@/utils/epochWeekNumber";
import { type TimetableClass } from "@/services/shared/Timetable";

interface PlannedElement {
  id: string;
  name: string;
  period: {
    dateTimeFrom: string;
    dateTimeTo: string;
    wholeDay: boolean;
    deadline: boolean;
  };
  courses?: Array<{ id: string; name: string }>;
  locations?: Array<{ id: string; title: string }>;
  organisers?: {
    users: Array<{ id: string; name: { startingWithFirstName: string; startingWithLastName: string } }>;
  };
  plannedElementType: string;
  // add other fields as needed
}

const decodePlannedElement = (el: PlannedElement): TimetableClass => {
  const startTimestamp = new Date(el.period.dateTimeFrom).getTime();
  const endTimestamp = new Date(el.period.dateTimeTo).getTime();
  const room = el.locations?.map(loc => loc.title).join(", ") || undefined;
  const teacher = el.organisers?.users.map(u => u.name.startingWithFirstName + " " + u.name.startingWithLastName).join(", ") || undefined;
  return {
    id: el.id,
    type: "activity",
    title: el.name,
    startTimestamp,
    subject: el.courses && el.courses.length > 0 ? el.courses[0].name : "Activity",
    endTimestamp,
    room,
    teacher,
    backgroundColor: undefined, // no color info in API response snippet
    status: undefined,
    additionalNotes: undefined,
  };
};

export const getTimetableForWeek = async (account: SmartschoolAccount, epochWeekNumber: number): Promise<TimetableClass[]> => {
  const { start, end } = weekNumberToDateRange(epochWeekNumber);

  // Format dates as ISO strings with timezone offset
  const fromDate = start.toISOString();
  const toDate = end.toISOString();

  const url = new URL(`https://dbwsl.smartschool.be/planner/api/v1/planned-elements/user/${account.authentication.userID}`);
  url.searchParams.set("from", fromDate);
  url.searchParams.set("to", toDate);
  url.searchParams.set("types", "planned-assignments,planned-to-dos");

  const res = await fetch(url.toString(), {
    headers: {
      "Cookie": `PHPSESSID=${account.authentication.session};`, // add the session cookie for auth
      "Accept": "application/json",
    },
    credentials: "include", // ensure cookies sent
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch planner data: ${res.statusText}`);
  }

  const json = await res.json();
  const plannedElements: PlannedElement[] = json.plannedElements || json; // depends on actual API structure

  return plannedElements.map(decodePlannedElement);
};
