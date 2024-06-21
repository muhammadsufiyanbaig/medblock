import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAccount, submitRecord } from '../store/interactions';
import Blockies from 'react-blockies';
import { Link } from 'react-router-dom';
import healthReport from '../assets/health-report.png'


const Dashboard = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);

  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [submittedRecords, setSubmittedRecords] = useState([]);

  const connectHandler = async () => {
    await loadAccount(provider, dispatch);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log( "provider",provider);
    console.log( "medical",medical);
    if (!provider || !medical) {
      console.error("Provider or medical contract not initialized.");
      return;
    }
    try {
      await submitRecord(
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
      setName('');
      setAge('');
      setGender('');
      setBloodType('');
      setAllergies('');
      setDiagnosis('');
      setTreatment('');
    } catch (error) {
      console.error("Error submitting record:", error);
    }
    const newRecord = {
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
    };
    dispatch(setSubmittedRecords([...submittedRecords, newRecord]));

  };
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 md:py-4 bg-blue-800 shadow-md w-full z-10">
        <Link to="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-white md:text-3xl" aria-label="logo">
          <img src={healthReport} alt="Health Report" className="w-10 h-10 mr-3" />
          <h2 className="text-xl font-bold">MedBlock</h2>
        </Link>
        <div className="flex items-center">
          {balance && (
            <p className="text-white mr-4">
              <small className="mr-1">My Balance:</small>
              {Number(balance).toFixed(4)} ETH
            </p>
          )}
          {!account ? (
            <button className="p-2 bg-blue-600 rounded hover:bg-blue-700 mr-4" onClick={connectHandler}>
              Connect
            </button>
          ) : (
            <a
              className="flex items-center"
              target="_blank"
              href="https://portfolio.metamask.io/"
              rel="noopener noreferrer"
            >
              {account.slice(0, 5) + '....' + account.slice(38, 42)}
              <Blockies seed={account} size={10} scale={3} color="#2187D0" bgColor="#F1F2F9" spotColor="#767F92" className="ml-2 rounded-full" />
            </a>
          )}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex md:items-center md:ml-6 md:space-x-8`}
        >
          <Link to="/" className="text-white hover:text-blue-300">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-blue-300">
            Dashboard
          </Link>
          <Link to="/records" className="text-white hover:text-blue-300">
          Records
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 pt-20">
        <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4">Patient Medical Record Form</h1>
          <form onSubmit={submitHandler} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                Blood Type
              </label>
              <input
                type="text"
                id="bloodType"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies
              </label>
              <input
                type="text"
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                Diagnosis
              </label>
              <input
                type="text"
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
                Treatment
              </label>
              <input
                type="text"
                id="treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
