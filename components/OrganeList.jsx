import { server } from "../config";
import 'react-quill/dist/quill.snow.css'
import { useState } from "react";
import dynamic from "next/dynamic";
import { useFetch } from "../lib/UseQuerry";
// import { cp } from "fs/promises";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function OrganeList() {

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

  const [convertedText, setConvertedText] = useState("Some default content");

  const { data, loading, error } = useFetch("organe")

  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>error</p>
  }

  return (
    <div>
      {data && data.map((organe) => {
        console.log(organe);

        return (
          organe.name_organe
        )
      })}
    </div >
  )
}