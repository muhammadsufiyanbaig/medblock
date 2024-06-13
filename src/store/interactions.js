import { ethers } from "ethers";
// import MEDICAL_ABI from "../abis/MedicalRecords.json";
import MedicalRecords from "../abis/MedicalRecords.json";
const counterAddress = "0x8e413842b8A71F56a2f2dE13753E88396AfA5688"

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });
  return connection;
};
export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });
  return chainId;
};
export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: "ACCOUNT_LOADED", account });
  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);
  dispatch({ type: "ETHER_BALANCE_LOADED", balance });
  return account;
};
export const loadMedical = (provider, address, dispatch) => {
  const medical = new ethers.Contract(address, MedicalRecords.abi, provider);
  dispatch({ type: "MEDICAL_LOADED", medical });
  return medical;
};
export const loadAllData = async (provider, medical, dispatch) => {
  const block = await provider.getBlockNumber();
  const medicalStream = await medical.queryFilter(
    "MedicalRecords__AddRecord",
    0,
    block
  );
  const medicalRecords = medicalStream.map((event) => event.args);
  dispatch({ type: "ALL_MEDICAL_RECORDS", MedicalRecords });
  const deleteStream = await medical.queryFilter(
    "MedicalRecords__DeleteRecord",
    0,
    block
  );
  const deleteRecords = deleteStream.map((event) => event.args);
  dispatch({ type: "ALL_DELETED_RECORDS", deleteRecords });
};

export const submitRecord = async (
  name,
  age,
  gender,
  bloodType,
  allergies,
  diagnosis,
  treatment,
  provider,
  medical,
  dispatch
) => {
  let transaction;
  dispatch({ type: "NEW_RECORD_LOADED" });
  try {
    // const signer = await provider.getSigner();

    // transaction = await medical
    //   .connect(signer)
    //   .addRecord(name, age, gender, bloodType, allergies, diagnosis, treatment);

    // await transaction.wait();


    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(counterAddress, MedicalRecords.abi, signer);
    // console.log("=================>contract", contract)
    const transaction = await contract.addRecord(name, age, gender, bloodType, allergies, diagnosis, treatment);
    console.log("=================>transaction", transaction)
    
    // setIsLoading(true);
    await transaction.wait();
  } catch (error) {
    console.log("=================>ERROR", error)
    dispatch({ type: "NEW_RECORD_FAIL" });
  }
};

export const deleteData = async (medical, recordId, dispatch, provider) => {
  let transaction;
  dispatch({ type: "DELETE_REQUEST_INNITIALIZED" });
  try {
    const signer = await provider.getSigner();
    transaction = await medical.connect(signer).deleteRecord(recordId);
    await transaction.wait();
  } catch (error) {
    dispatch({ type: "DELETE_REQUEST_FAILED" });
  }
};

export const subscribeToEvents = async (medical, dispatch) => {
  medical.on(
    "MedicalRecords__AddRecord",
    (
      recordId,
      timestamp,
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      event
    ) => {
      const medicalOrder = event.args;
      dispatch({ type: "NEW_RECORD_SUCCESS", medicalOrder, event });
    }
  );
  medical.on(
    "MedicalRecords__DeleteRecord",
    (
      recordId,
      timestamp,
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      event
    ) => {
      const deleteOrder = event.args;
      dispatch({ type: "DELETE_REQUEST_SUCCESS", deleteOrder, event });
    }
  );
};
