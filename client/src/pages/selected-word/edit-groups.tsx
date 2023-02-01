import { useStore } from "../../state/store";
import React, { ChangeEvent, Dispatch, FC, FormEvent, useState } from "react";
import { ExtractedWord, Store } from "../../types";
import { attemptUpdateGroup } from "../../api/update-group";
// import styles from "../styles/Styles.module.css";

export interface EditGroupsProps {
  parentWordId: number,
  wordSelected: ExtractedWord,
  setWordSelected: Dispatch<React.SetStateAction<ExtractedWord | null>>,
  setIsEditingGroup: (bool: boolean) => void
};

export const EditGroups: FC<EditGroupsProps> = (props) => {
  const { parentWordId, wordSelected, setWordSelected, setIsEditingGroup } = props;
  const { groups, setGroups } = useStore((state: Store) => state.home);
  const [ groupSelected, setGroupSelected ] = useState(true);
  const [ groupTextInput, setGroupTextInput ] = useState("");
  const [ selectedGroup, setSelectedGroup ] = useState("");

  const disableCreateArea = () => {
    console.log("CREATE AREA DISABLED")
    setGroupSelected(true);
    setGroupTextInput("");
  };
  
  const disableSelectArea = () => {
    console.log("SELECT AREA DISABLED")
    setGroupSelected(false);
    setSelectedGroup("None");
  };

  const attemptUpdate = async (event: FormEvent<HTMLFormElement>) => {
    console.log("HERE")
    event.preventDefault();
    const newGroup = groupSelected ? selectedGroup : groupTextInput;
    const { group } = await attemptUpdateGroup(parentWordId, newGroup);
    setWordSelected({ ...wordSelected, group: group });
    setGroups(group);
    setIsEditingGroup(false);
  };

  return (
    <div>
      <form onSubmit={attemptUpdate}>
      {/* className={styles["entry-form"]} */}

        <div onClick={disableCreateArea} className={`group-select-area`}>

          <label htmlFor="groups">Choose Group:</label>

          <select
            name="groups" 
            id="groups"
            defaultValue={wordSelected.group ? wordSelected.group : "None"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedGroup(e.target.value)}>
            <option value="None">None</option>
            {groups.map((group, index) => {
              return group ? <option key={index} value={group}>{group}</option> : undefined;
            })}
          </select>

        </div>

        <div onClick={disableSelectArea} className={`group-create-area`}>

          <label htmlFor="group">Create New Group</label>
          {/* className={styles["input-name"]} */}

          <input
              type="text"
              id="group"
              name="group"
              placeholder="Type Group Name Here"
              value={groupTextInput}
              onChange={(e) => setGroupTextInput(e.target.value)}
              // className={styles["username login"]}
          />

        </div>

        <button type="submit">Submit</button>

        <button type="button" onClick={() => setIsEditingGroup(false)}>Cancel</button>
      </form>
    </div>
  )
}