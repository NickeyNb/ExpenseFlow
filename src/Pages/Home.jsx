import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import Graph from "../Components/Graph";
import axios from "axios";
import toast from "react-hot-toast";
import { PiArrowFatLineUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import { ImMinus, ImPlus } from "react-icons/im";
import { TbError404 } from "react-icons/tb";
import moment from "moment";
import { server } from "../App";

const Home = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allExpense, setAllExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const categoryHistoryIcons = {
    Job: <ImPlus className="text-3xl text-green-500" />,
    Freelance: <ImPlus className="text-3xl text-green-500" />,
    "Part-Time": <ImPlus className="text-3xl text-green-500" />,
    "Bank-Transfer": <ImPlus className="text-3xl text-green-500" />,
    "Other-Income": <ImPlus className="text-3xl text-green-500" />,
    Education: <ImMinus className="text-3xl text-rose-600" />,
    Health: <ImMinus className="text-3xl text-rose-600" />,
    Shopping: <ImMinus className="text-3xl text-rose-600" />,
    Travelling: <ImMinus className="text-3xl text-rose-600" />,
    "Food & Drinks": <ImMinus className="text-3xl text-rose-600" />,
    "Other-Expense": <ImMinus className="text-3xl text-rose-600" />,
  };

  // fetch all incomes
  const getAllIncomes = async () => {
    try {
      const res = await axios.get(`${server}/incomes/get-all-income`, {
        withCredentials: true,
      });
      const isSuccess = res.data.success;
      if (isSuccess) {
        setAllIncome(res.data.incomes);
      }
    } catch (error) {}
  };
  // total income
  const getTotalIncome = async () => {
    try {
      const res = await axios.get(`${server}/incomes/total-income`, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        setTotalIncome(res.data.sum);
      }
    } catch (error) {}
  };

  // fetching all expenses
  const getAllExpense = async () => {
    try {
      const res = await axios.get(`${server}/expenses/get-all-expense`, {
        withCredentials: true,
      });
      const isSuccess = res.data.success;
      if (isSuccess) {
        setAllExpense(res.data.expenses);
      }
    } catch (error) {}
  };

  // total expense
  const totalExpenseHandler = async () => {
    try {
      const res = await axios.get(`${server}/expenses/total-expense`, {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        setTotalExpense(res.data.totalExpense);
      }
    } catch (error) {
      toast.error("hehe error");
    }
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
    getAllIncomes();
    getTotalIncome();
    getAllExpense();
    totalExpenseHandler();
    getTransactionHistory();
  }, []);

  const expensePercent = Math.round((totalExpense / totalIncome) * 100);
  const savingPercent = Math.round(
    ((totalIncome - totalExpense) / totalIncome) * 100,
  );

  return (
    <Layout>
      <main className="bg-gray-100">
        <section className="mt-8 min-h-[80vh] pb-4">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="grid md:grid-cols-2">
                {/* graph */}
                <div className="flex justify-center py-4 ">
                  <Graph
                    value={totalIncome}
                    saving={savingPercent}
                    expense={expensePercent}
                  />
                </div>
                <div className="flex justify-between px-4 py-8 md:flex-col md:items-start md:justify-center md:space-y-4">
                  <div className="rounded-lg border-l-4 border-solid border-rose-500 px-2 md:flex md:w-3/5 md:justify-between md:rounded-lg md:border-l-8 md:border-solid md:border-rose-500 md:px-2 md:py-2">
                    <h1 className="text-lg font-semibold">Expenses </h1>
                    <h1 className="text-lg font-bold">
                      {expensePercent ? expensePercent : 0}%
                    </h1>
                  </div>
                  <div className="rounded-lg border-l-4 border-solid border-yellow-400 px-2 md:flex md:w-3/5 md:justify-between md:rounded-lg md:border-l-8 md:border-solid md:border-yellow-400 md:px-2 md:py-2">
                    <h1 className="text-lg font-semibold">Savings</h1>
                    <h1 className="text-lg font-bold">
                      {savingPercent ? savingPercent : 0}%
                    </h1>{" "}
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-b border-solid border-gray-300 px-4 py-8">
                <div className="rounded-lg border-b-4 border-solid border-green-400 px-2">
                  <h1 className="text-lg font-semibold">Total Income </h1>
                  <h1 className="text-lg font-bold text-green-400">
                    {"\u20B9 "}
                    {totalIncome}
                  </h1>
                </div>
                <div className="rounded-lg border-b-4 border-solid border-rose-500 px-2">
                  <h1 className="text-lg font-semibold"> Total Expense</h1>
                  <h1 className="text-lg font-bold text-rose-500">
                    {"\u20B9 "}
                    {totalExpense}
                  </h1>
                </div>
                <div className="rounded-lg border-b-4 border-solid border-yellow-400 px-2">
                  <h1 className="text-lg font-semibold">Total Saving </h1>
                  <h1 className="text-lg font-bold text-yellow-400">
                    {"\u20B9 "}
                    {totalIncome - totalExpense}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-4 px-2 md:px-4">
              <h1 className="text-center text-lg font-bold">Recent History</h1>
              {transactionHistory.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {transactionHistory.slice(0, 3).map((his, i) => {
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
                            <h1 className="text-lg font-semibold">
                              {his.title}
                            </h1>
                            <div className="flex flex-row space-x-2">
                              <h1 className="text-gray-600">
                                {"\u20B9 "}
                                {his.amount}
                              </h1>
                              <h1 className="text-gray-600">
                                {moment(his.date).format("YYYY-MM-DD")}
                              </h1>
                              <h1 className="text-gray-600">
                                {his.description}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No record found !! </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
