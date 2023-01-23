import { useStore } from "../state/store";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Store } from "../types";
// import styles from "../styles/Styles.module.css";

interface EditGroupsProps { setGroupBeingEdited: (bool: boolean) => void };

export const EditGroups: FC<EditGroupsProps> = (props) => {
  const groups = useStore((state: Store) => state.home.groups);
  const [ groupBeingSelected, setGroupBeingSelected ] = useState(true);
  const [ groupTextInput, setGroupTextInput ] = useState("");
  const [ selectedGroup, setSelectedGroup ] = useState("");
  const attemptUpdateGroup = useStore((state: Store) => state.home.attemptUpdateGroup)

  const disableCreateArea = () => {
    console.log("CREATE AREA DISABLED")
    setGroupBeingSelected(true);
    setGroupTextInput("");
  };
  
  const disableSelectArea = () => {
    console.log("SELECT AREA DISABLED")
    setGroupBeingSelected(false);
    setSelectedGroup("None");
  };

  const attemptUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (groupBeingSelected) attemptUpdateGroup(selectedGroup);
    else attemptUpdateGroup(groupTextInput);
    // add error handling here
    props.setGroupBeingEdited(false);
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
            value={selectedGroup}
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

        <button type="button" onClick={() => props.setGroupBeingEdited(false)}>Cancel</button>
      </form>
    </div>
  )
}