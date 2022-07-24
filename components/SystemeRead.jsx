import { server } from "../config";
import 'react-quill/dist/quill.snow.css'
import { useState } from "react";
import dynamic from "next/dynamic";
import { ISysteme, useFetch } from "../lib/UseQuerry";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function SystemeRead(systeme) {
  const [convertedText, setConvertedText] = useState("Some default content");

  return (
    <div>
      <h2>{systeme?.name_systeme}</h2>
      <p>{systeme?.desc_systeme}</p>
      <ReactQuill
        value={convertedText}
        onChange={setConvertedText}
      />
    </div>
  )
}