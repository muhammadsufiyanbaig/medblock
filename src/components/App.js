import { Route, Routes } from "react-router-dom";
import Data from "./Data";
import Form from "./Form";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";
import config from "../config.json";
import Option from './Option'
import Alert from "./Alert";
function App() {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const medical_config = config[chainId].medical;
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);
  };
  useEffect(() => {
    loadBlockchainData();
  });
  return (
      <div className="">
        <Navbar />
        <Option />
        <Routes>
          <Route path="/" exact element={<Hero />} />
          <Route path="/form" exact element={<Form />} />
          <Route path="/data" element={<Data />} />
        </Routes>
        <Alert />
      </div>
  );
}

export default App;
