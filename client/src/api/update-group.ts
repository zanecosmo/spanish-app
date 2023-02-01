import { GroupDTO } from "../types";
import { executeFetch } from "../utils";

export const attemptUpdateGroup = async (
  parentWordId: number,
  group: string
): Promise<{ group: string, groups: string[] }> => {
  const groupDTO: GroupDTO = { group: group, parentWordId: parentWordId };

  const response = await executeFetch("PUT", "http://localhost:8000/update-group", groupDTO);
  const { data: groupArray, error, message } = await response.json();

  if (!([200, 201, 204].includes(response.status))) {
    throw Error(`
      RESPONSE:
      STATUS -- ${response.status} \n
      ERROR -- ${error ? error : "NONE"} \n
      MESSAGE -- ${message ? message : "NONE"}
    `);
  };

  return {
    group: group,
    groups: groupArray
  };
};