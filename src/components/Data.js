import React from "react";
import { dataBookSelector } from "../store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../store/interactions";

const Data = () => {
  const orderData = useSelector(dataBookSelector);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const dispatch = useDispatch();

  const deleteHandler = (e, data) => {
    if (window.confirm("Do you want to delete the record?")) {
      deleteData(medical, data.recordId, dispatch, provider);
    } else {
      console.log("Data not delete");
    }
  };

  return (
    <div className="">
      {account ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Record ID</th>
                <th className="py-2 px-4">Date and Time</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Blood Type</th>
                <th className="py-2 px-4">Allergies</th>
                <th className="py-2 px-4">Diagnosis</th>
                <th className="py-2 px-4">Treatment</th>
                <th className="py-2 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orderData &&
                orderData.map((data, index) => {
                  return (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{data.formattedTimestamp}</td>
                      <td className="py-2 px-4">{data.name}</td>
                      <td className="py-2 px-4">{data.ageNew}</td>
                      <td className="py-2 px-4">{data.gender}</td>
                      <td className="py-2 px-4">{data.bloodType}</td>
                      <td className="py-2 px-4">{data.allergies}</td>
                      <td className="py-2 px-4">{data.diagnosis}</td>
                      <td className="py-2 px-4">{data.treatment}</td>
                      <td className="py-2 px-4">
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                          onClick={(e) => deleteHandler(e, data)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Connect the account
        </h1>
      )}
    </div>
  );
};

export default Data;
