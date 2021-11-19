import React from "react";
import "./SelectParticipants.css";
import Select from "react-select";
import { useState, useEffect } from "react";
export default function SelectParticipants(setParticipants) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);
  
  const options = []
  for(const user of users){
   options.push({ value: user.id, label: user.username }    )
  }
  
  return (
    <>
      <Select isMulti onChange={setParticipants} options={options}/>
    </>
  );
}
