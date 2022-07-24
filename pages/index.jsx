import { useState } from 'react'
import Header from '../components/Header'
import OrganeList from '../components/OrganeList'
import SystemeList from '../components/SystemeList'
import styles from '../styles/Home.module.scss'

const Home = () => {
  const [tab, setTab] = useState("")
  const handleTab = (value) => {
    setTab(value)
  }
  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button onClick={() => handleTab("systeme")}>Systeme</button>
        <button onClick={() => handleTab("organe")}>Organe</button>
        <button onClick={() => handleTab("maladie")}>Maladie</button>
        <button onClick={() => handleTab("traitement")}>Traitement</button>
      </div>
      {tab === "systeme" && <SystemeList />}
      {tab === "organe" && <OrganeList />}
    </>
  )
}

export default Home
