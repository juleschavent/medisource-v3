import { server } from "../config";
import 'react-quill/dist/quill.snow.css'
import { useState } from "react";
import dynamic from "next/dynamic";
import { useFetch } from "../lib/UseQuerry";
import SystemeRead from "./SystemeRead";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SystemeList() {

  const newSysteme = {
    name_systeme: "respiratoir",
    desc_systeme: "lorem",
  }

  const createSysteme = async () => {
    const response = await fetch(`${server}/api/systeme`, {
      method: "POST",
      body: JSON.stringify({ newSysteme }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.ok ? console.log("success")
        : console.log('error')
    );
  };

  const deleteSysteme = async () => {

    const idSysteme = 5
    const response = await fetch(`${server}/api/systeme/${idSysteme}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.ok ? console.log("success")
        : console.log('error')
    );
  };


  const modifySysteme = {
    name_systeme: "nerveux",
    desc_systeme: "lorem",
    image_systeme: "none",
  }

  const updateSysteme = async () => {

    const idSysteme = 5
    const response = await fetch(`${server}/api/systeme/${idSysteme}`, {
      method: "PUT",
      body: JSON.stringify({ modifySysteme }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.ok ? console.log("success")
        : console.log('error')
    );
  };

  const { data, loading, error } = useFetch("systeme")

  const [currentSysteme, setCurrentSysteme] = useState()
  const handleChange = (e) => {
    data.forEach(element => {
      Object.values(element).includes(e.target.value) ? setCurrentSysteme(element) : null
    });
  };


  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>error</p>
  }
  return (
    <div>
      <Select
        onChange={handleChange}
        label="Systeme"
        value="none"
      >
        <MenuItem value={"none"}>Sélectionner un système</MenuItem>
        {data && data.map((systeme) => (
          <MenuItem key={systeme.id_systeme} value={systeme.name_systeme}>{systeme.name_systeme}</MenuItem>
        ))}
      </Select>
      {/* {currentSysteme && <SystemeRead systeme={currentSysteme} />} */}
      {currentSysteme && <SystemeRead {...currentSysteme} />}
    </div>
  )
}