import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { PiArrowFatLineUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import { TbError404 } from "react-icons/tb";
import moment from "moment";
import { server } from "../App";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  const categoryHistoryIcons = {
    Job: <PiArrowFatLineUpFill className="text-3xl text-green-500" />,
    Freelance: <PiArrowFatLineUpFill className="text-3xl text-green-500" />,
    "Part-Time": <PiArrowFatLineUpFill className="text-3xl text-green-500" />,
    "Bank-Transfer": (
      <PiArrowFatLineUpFill className="text-3xl text-green-500" />
    ),
    "Other-Income": (
      <PiArrowFatLineUpFill className="text-3xl text-green-500" />
    ),
    Education: <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />,
    Health: <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />,
    Shopping: <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />,
    Travelling: <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />,
    "Food & Drinks": (
      <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />
    ),
    "Other-Expense": (
      <PiArrowFatLinesDownFill className="text-3xl text-rose-600" />
    ),
  };
  const getTransactionHistory = async () => {
    try {
      const res = await axios.get(`${server}/incomes/transaciton-history`, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        setTransactionHistory(res.data.history);
      }
    } catch (error) {
      toast.error("Some error in history");
    }
  };
  // initial fetch of incomes
  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <Layout>
      <main>
        <section className="mb-4 min-h-[80vh] w-full">
          <div className="w-full p-4">
            <h1 className="text-center text-2xl font-semibold">History</h1>
            {transactionHistory.length > 0 ? (
              <div className="mt-4 space-y-4">
                {transactionHistory.map((his, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded border border-solid border-gray-300 p-4 shadow-md"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <i className="text-gray-500">
                            {categoryHistoryIcons[his.category] || (
                              <TbError404 />
                            )}
                          </i>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-lg font-semibold">{his.title}</h1>
                          <div className="flex flex-row space-x-2">
                            <h1 className="text-gray-600">
                              {"\u20B9 "}
                              {his.amount}
                            </h1>
                            <h1 className="text-gray-600">
                              {moment(his.date).format("YYYY-MM-DD")}
                            </h1>
                            <h1 className="text-gray-600">{his.description}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center"> No record found !! </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default History;
