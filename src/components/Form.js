import React, { useState } from "react";
import { submitRecord } from "../store/interactions";
import { useDispatch, useSelector } from "react-redux";


import { ethers } from "ethers";
// import MEDICAL_ABI from "../abis/MedicalRecords.json";
import MedicalRecords from "../abis/MedicalRecords.json";
const counterAddress = "0x8e413842b8A71F56a2f2dE13753E88396AfA5688"

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    submitRecord(
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
    );
    setName("");
    setAge("");
    setGender("");
    setBloodType("");
    setAllergies("");
    setDiagnosis("");
    setTreatment("");
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

const getData = async() => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    console.log("provider", provider);

    const contract = new ethers.Contract(
        counterAddress,
        MedicalRecords.abi,
        provider
    );

    console.log("contract", contract);

    try {
        const data = await contract.getRecord(1);
        console.log("====================>DATA",data);
        console.log("==================>data: ", parseInt(data.toString()));
        // setCount(parseInt(data.toString()));
    } catch (err) {
        console.log("Error: ", err);
        alert(
            "Switch your MetaMask network to Polygon zkEVM Testnet and refresh this page!"
        );
    }
}
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {account ? (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-700">Patient Data</h1>

          <label htmlFor="name" className="block text-gray-600 mb-2">
            Patient Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Muhammad Sufiyan Baig"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="age" className="block text-gray-600 mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            placeholder="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="gender" className="block text-gray-600 mb-2">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            required
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="bloodType" className="block text-gray-600 mb-2">
            Blood Type:
          </label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            required
            placeholder="B positive"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="allergies" className="block text-gray-600 mb-2">
            Allergies:
          </label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            required
            placeholder="asthma"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="diagnosis" className="block text-gray-600 mb-2">
            Diagnosis:
          </label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            required
            placeholder="spirometry "
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="treatment" className="block text-gray-600 mb-2">
            Treatment:
          </label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            required
            placeholder="Inhalers"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <input
            type="submit"
            value="Submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
          />
          

      <button onClick={getData}>get Data</button>
        </form>
      ) : (
        <div className="flex justify-center items-center min-h-fit">
        <h1 className="text-2xl font-semibold  text-center text-gray-700">
          Connect the account from MetaMask
        </h1>
        </div>
      )}

    </div>
  );
};

export default Form;
