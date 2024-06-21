import { Route, Routes } from "react-router-dom";
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
import Alert from "./Alert";
import Dashboard from "./Dashboard";
import Record from "./Record";
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
        <Routes>
          <Route path="/" exact element={<Hero />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/records" element={<Record />} />
        </Routes>
        <Alert />
      </div>
  );
}

export default App;
