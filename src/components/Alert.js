import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { myEventsSelector } from "../store/selectors";
import config from "../config.json";

const Alert = () => {
  const alertRef = useRef(null);
  const event = useSelector(myEventsSelector);
  const overlayRef = useRef(null);
  const isPending = useSelector((state) => state.medical.transaction.isPending);
  const isError = useSelector((state) => state.medical.transaction.isError);
  const chainId = useSelector((state) => state.provider.chainId);

  const removeHandler = async (e) => {
    alertRef.current.classList.add("opacity-0", "transform", "scale-90");
    overlayRef.current.classList.add("opacity-0");
    setTimeout(() => {
      alertRef.current.classList.add("hidden");
      overlayRef.current.classList.add("hidden");
    }, 300);
  };

  useEffect(() => {
    if (isPending || isError || event[0]) {
      alertRef.current.classList.remove("opacity-0", "transform", "scale-90", "hidden");
      overlayRef.current.classList.remove("opacity-0", "hidden");
    }
  }, [isPending, isError, event]);

  return (
    <div>
      {(isPending || isError || event[0]) && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            ref={overlayRef}
            onClick={removeHandler}
          ></div>
          <div
            className="bg-white rounded-lg p-6 shadow-lg transition-transform transform duration-300 opacity-0 scale-90"
            ref={alertRef}
          >
            {isPending ? (
              <h2 className="text-2xl font-bold text-gray-700">Action Pending...</h2>
            ) : isError ? (
              <h2 className="text-2xl font-bold text-red-600">Action Will Fail</h2>
            ) : (
              event[0] && (
                <>
                  <h2 className="text-2xl font-bold text-green-600">Action Successful</h2>
                  <div className="mt-4">
                    <a
                      className="text-blue-600 underline"
                      href={
                        config[chainId]
                          ? `${config[chainId].explorerURL}tx/${event[0].transactionHash}`
                          : `#`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {event[0].transactionHash.slice(0, 6) +
                        "..." +
                        event[0].transactionHash.slice(60, 66)}
                    </a>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
