import { type Homework } from "@/services/shared/Homework";
import { SmartschoolAccount } from "@/stores/account/types";

const API_URL =
  "https://dbwsl.smartschool.be/planner/api/v1/planned-elements/user/5291_3679_0?from=2025-06-12T00:00:00+02:00&to=2025-07-16T23:59:59+02:00&types=planned-assignments,planned-to-dos";

export const getHomeworkForWeek = async (
  account: SmartschoolAccount,
  _epochWeekNumber: number
): Promise<Homework[]> => {
  const sessionId = "g827aio9uo87evvdas3usf0aoscg70f6jkq1s57a3fo10b1kc9";

  const response = await fetch(API_URL, {
    headers: {
      cookie: `PHPSESSID=${sessionId}`,
      "^User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0^",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch homework data:", response.status);
    return [];
  }
  const mockdata = "[\n\t{\n\t\t\"id\": \"1482e8b1-98de-4676-b9e8-e7e2f2bc2b32\",\n\t\t\"platformId\": 5291,\n\t\t\"name\": \"Préparer vos éventuelles questions sur la matière du cours et/ou les concepts\",\n\t\t\"assignmentType\": {\n\t\t\t\"id\": \"d70cd6bf-b4a8-475d-a133-a4d4af8f16eb\",\n\t\t\t\"name\": \"Préparation\",\n\t\t\t\"abbreviation\": \"P\",\n\t\t\t\"isVisible\": true,\n\t\t\t\"weight\": 0\n\t\t},\n\t\t\"period\": {\n\t\t\t\"dateTimeFrom\": \"2025-06-13T10:20:00+02:00\",\n\t\t\t\"dateTimeTo\": \"2025-06-13T11:10:00+02:00\",\n\t\t\t\"wholeDay\": false,\n\t\t\t\"deadline\": true\n\t\t},\n\t\t\"organisers\": {\n\t\t\t\"users\": [\n\t\t\t\t{\n\t\t\t\t\t\"id\": \"5291_250_0\",\n\t\t\t\t\t\"pictureHash\": \"initials_OV\",\n\t\t\t\t\t\"pictureUrl\": \"https://userpicture10.smartschool.be/User/Userimage/hashimage/hash/initials_OV/plain/1/res/128\",\n\t\t\t\t\t\"description\": {\n\t\t\t\t\t\t\"startingWithFirstName\": \"\",\n\t\t\t\t\t\t\"startingWithLastName\": \"\"\n\t\t\t\t\t},\n\t\t\t\t\t\"name\": {\n\t\t\t\t\t\t\"startingWithFirstName\": \"Olivier Vanabelle\",\n\t\t\t\t\t\t\"startingWithLastName\": \"Vanabelle Olivier\"\n\t\t\t\t\t},\n\t\t\t\t\t\"sort\": \"vanabelle-olivier\",\n\t\t\t\t\t\"deleted\": false\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t\"participants\": {\n\t\t\t\"groups\": [\n\t\t\t\t{\n\t\t\t\t\t\"identifier\": \"5291_2053\",\n\t\t\t\t\t\"id\": \"5291_2053\",\n\t\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\t\"name\": \"4GTB12\",\n\t\t\t\t\t\"type\": \"K\",\n\t\t\t\t\t\"icon\": \"briefcase\",\n\t\t\t\t\t\"sort\": \"4GTB12\"\n\t\t\t\t}\n\t\t\t],\n\t\t\t\"users\": [],\n\t\t\t\"groupFilters\": {\n\t\t\t\t\"filters\": [],\n\t\t\t\t\"additionalUsers\": []\n\t\t\t}\n\t\t},\n\t\t\"isParticipant\": true,\n\t\t\"capabilities\": {\n\t\t\t\"canUserTrash\": false,\n\t\t\t\"canUserRestoreFromTrash\": false,\n\t\t\t\"canUserDelete\": false,\n\t\t\t\"canUserEdit\": false,\n\t\t\t\"canUserReplace\": false,\n\t\t\t\"canUserEditPresence\": false,\n\t\t\t\"canUserAddReservations\": false,\n\t\t\t\"canUserReschedule\": false,\n\t\t\t\"canUserPin\": true,\n\t\t\t\"canUserResolve\": true,\n\t\t\t\"canUserChangeUserColor\": true,\n\t\t\t\"canUserChangeUserViewMetadata\": true,\n\t\t\t\"canUserCreateVideoCall\": false,\n\t\t\t\"canUserSeeVideoCall\": true,\n\t\t\t\"canUserManageVideoCall\": false,\n\t\t\t\"canUserSeeProperties\": {\n\t\t\t\t\"id\": true,\n\t\t\t\t\"platformId\": true,\n\t\t\t\t\"name\": true,\n\t\t\t\t\"assignmentType\": true,\n\t\t\t\t\"period\": true,\n\t\t\t\t\"organisers\": true,\n\t\t\t\t\"participants\": true,\n\t\t\t\t\"isParticipant\": true,\n\t\t\t\t\"capabilities\": true,\n\t\t\t\t\"plannedElementType\": true,\n\t\t\t\t\"resolvedStatus\": true,\n\t\t\t\t\"onlineSession\": true,\n\t\t\t\t\"courses\": true,\n\t\t\t\t\"locations\": true\n\t\t\t}\n\t\t},\n\t\t\"plannedElementType\": \"planned-assignments\",\n\t\t\"resolvedStatus\": \"unresolved\",\n\t\t\"onlineSession\": null,\n\t\t\"courses\": [\n\t\t\t{\n\t\t\t\t\"id\": \"2cb77fd9-d9f2-4bf9-bd41-34a26464fee5\",\n\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\"name\": \"Histoire\",\n\t\t\t\t\"scheduleCodes\": [\n\t\t\t\t\t\"HIST2\"\n\t\t\t\t],\n\t\t\t\t\"icon\": \"fortress\",\n\t\t\t\t\"courseCluster\": null,\n\t\t\t\t\"isVisible\": true\n\t\t\t}\n\t\t],\n\t\t\"locations\": [\n\t\t\t{\n\t\t\t\t\"id\": \"5d5852c0-0f81-4f2f-8f2d-29395af6f303\",\n\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\"platformName\": \"Groupe Scolaire Don Bosco ASBL\",\n\t\t\t\t\"number\": \"000\",\n\t\t\t\t\"title\": \"000\",\n\t\t\t\t\"icon\": \"\",\n\t\t\t\t\"type\": \"mini-db-item\",\n\t\t\t\t\"selectable\": true\n\t\t\t}\n\t\t],\n\t\t\"sort\": \"20250613102000_5_4GTB12_Préparer vos éventuelles questions sur la matière du cours et/ou les concepts\",\n\t\t\"unconfirmed\": false,\n\t\t\"pinned\": false,\n\t\t\"color\": \"aqua-200\",\n\t\t\"joinIds\": {\n\t\t\t\"from\": \"72306175-1d3a-518c-83fe-218e73ef0477\",\n\t\t\t\"to\": \"72306175-1d3a-518c-83fe-218e73ef0477\"\n\t\t}\n\t},\n\t{\n\t\t\"id\": \"66b2e57c-f572-42f1-be28-5e89d9dc44e5\",\n\t\t\"platformId\": 5291,\n\t\t\"name\": \"Amener de quoi réviser ET Cahier de Synthèses ET Matière d'examen ET Dossier de révision\",\n\t\t\"assignmentType\": {\n\t\t\t\"id\": \"d70cd6bf-b4a8-475d-a133-a4d4af8f16eb\",\n\t\t\t\"name\": \"Préparation\",\n\t\t\t\"abbreviation\": \"P\",\n\t\t\t\"isVisible\": true,\n\t\t\t\"weight\": 0\n\t\t},\n\t\t\"period\": {\n\t\t\t\"dateTimeFrom\": \"2025-06-13T11:10:00+02:00\",\n\t\t\t\"dateTimeTo\": \"2025-06-13T12:00:00+02:00\",\n\t\t\t\"wholeDay\": false,\n\t\t\t\"deadline\": true\n\t\t},\n\t\t\"organisers\": {\n\t\t\t\"users\": [\n\t\t\t\t{\n\t\t\t\t\t\"id\": \"5291_90_0\",\n\t\t\t\t\t\"pictureHash\": \"initials_GI\",\n\t\t\t\t\t\"pictureUrl\": \"https://userpicture10.smartschool.be/User/Userimage/hashimage/hash/initials_GI/plain/1/res/128\",\n\t\t\t\t\t\"description\": {\n\t\t\t\t\t\t\"startingWithFirstName\": \"\",\n\t\t\t\t\t\t\"startingWithLastName\": \"\"\n\t\t\t\t\t},\n\t\t\t\t\t\"name\": {\n\t\t\t\t\t\t\"startingWithFirstName\": \"Geneviève Isaac\",\n\t\t\t\t\t\t\"startingWithLastName\": \"Isaac Geneviève\"\n\t\t\t\t\t},\n\t\t\t\t\t\"sort\": \"isaac-genevieve\",\n\t\t\t\t\t\"deleted\": false\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t\"participants\": {\n\t\t\t\"groups\": [\n\t\t\t\t{\n\t\t\t\t\t\"identifier\": \"5291_2053\",\n\t\t\t\t\t\"id\": \"5291_2053\",\n\t\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\t\"name\": \"4GTB12\",\n\t\t\t\t\t\"type\": \"K\",\n\t\t\t\t\t\"icon\": \"briefcase\",\n\t\t\t\t\t\"sort\": \"4GTB12\"\n\t\t\t\t}\n\t\t\t],\n\t\t\t\"users\": [],\n\t\t\t\"groupFilters\": {\n\t\t\t\t\"filters\": [],\n\t\t\t\t\"additionalUsers\": []\n\t\t\t}\n\t\t},\n\t\t\"isParticipant\": true,\n\t\t\"capabilities\": {\n\t\t\t\"canUserTrash\": false,\n\t\t\t\"canUserRestoreFromTrash\": false,\n\t\t\t\"canUserDelete\": false,\n\t\t\t\"canUserEdit\": false,\n\t\t\t\"canUserReplace\": false,\n\t\t\t\"canUserEditPresence\": false,\n\t\t\t\"canUserAddReservations\": false,\n\t\t\t\"canUserReschedule\": false,\n\t\t\t\"canUserPin\": true,\n\t\t\t\"canUserResolve\": true,\n\t\t\t\"canUserChangeUserColor\": true,\n\t\t\t\"canUserChangeUserViewMetadata\": true,\n\t\t\t\"canUserCreateVideoCall\": false,\n\t\t\t\"canUserSeeVideoCall\": true,\n\t\t\t\"canUserManageVideoCall\": false,\n\t\t\t\"canUserSeeProperties\": {\n\t\t\t\t\"id\": true,\n\t\t\t\t\"platformId\": true,\n\t\t\t\t\"name\": true,\n\t\t\t\t\"assignmentType\": true,\n\t\t\t\t\"period\": true,\n\t\t\t\t\"organisers\": true,\n\t\t\t\t\"participants\": true,\n\t\t\t\t\"isParticipant\": true,\n\t\t\t\t\"capabilities\": true,\n\t\t\t\t\"plannedElementType\": true,\n\t\t\t\t\"resolvedStatus\": true,\n\t\t\t\t\"onlineSession\": true,\n\t\t\t\t\"courses\": true,\n\t\t\t\t\"locations\": true\n\t\t\t}\n\t\t},\n\t\t\"plannedElementType\": \"planned-assignments\",\n\t\t\"resolvedStatus\": \"unresolved\",\n\t\t\"onlineSession\": null,\n\t\t\"courses\": [\n\t\t\t{\n\t\t\t\t\"id\": \"c18babb4-6f74-43aa-a689-06e7845601b7\",\n\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\"name\": \"Mathématiques 5h\",\n\t\t\t\t\"scheduleCodes\": [\n\t\t\t\t\t\"MATH5\"\n\t\t\t\t],\n\t\t\t\t\"icon\": \"calculator\",\n\t\t\t\t\"courseCluster\": {\n\t\t\t\t\t\"id\": 100,\n\t\t\t\t\t\"name\": \"Mathématiques\"\n\t\t\t\t},\n\t\t\t\t\"isVisible\": true\n\t\t\t}\n\t\t],\n\t\t\"locations\": [\n\t\t\t{\n\t\t\t\t\"id\": \"5d5852c0-0f81-4f2f-8f2d-29395af6f303\",\n\t\t\t\t\"platformId\": 5291,\n\t\t\t\t\"platformName\": \"Groupe Scolaire Don Bosco ASBL\",\n\t\t\t\t\"number\": \"000\",\n\t\t\t\t\"title\": \"000\",\n\t\t\t\t\"icon\": \"\",\n\t\t\t\t\"type\": \"mini-db-item\",\n\t\t\t\t\"selectable\": true\n\t\t\t}\n\t\t],\n\t\t\"sort\": \"20250613111000_5_4GTB12_Amener de quoi réviser ET Cahier de Synthèses ET Matière d'examen ET Dossier de révision\",\n\t\t\"unconfirmed\": false,\n\t\t\"pinned\": false,\n\t\t\"color\": \"aqua-200\",\n\t\t\"joinIds\": {\n\t\t\t\"from\": \"c2bae551-0152-531d-a6fb-22659a8d26f6\",\n\t\t\t\"to\": \"c2bae551-0152-531d-a6fb-22659a8d26f6\"\n\t\t}\n\t}\n]";

  const data = JSON.parse(mockdata);

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