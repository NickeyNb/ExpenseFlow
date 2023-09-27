import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsBriefcaseFill, BsCalendar2Event } from "react-icons/bs";
import { FaLaptopCode, FaCcVisa } from "react-icons/fa";
import { TbCurrencyRupee, TbError404 } from "react-icons/tb";
import { PiClockCountdownFill } from "react-icons/pi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import moment from "moment";
import { server } from "../App";

const Income = () => {
  const options = [
    "Job",
    "Freelance",
    "Part-Time",
    "Bank-Transfer",
    "Other-Income",
  ];

  const categoryIncomeIcons = {
    Job: <BsBriefcaseFill />,
    Freelance: <FaLaptopCode />,
    "Part-Time": <PiClockCountdownFill />,
    "Bank-Transfer": <FaCcVisa />,
    "Other-Income": <TbCurrencyRupee />,
  };

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Select a category");
  const [description, setDescription] = useState("");

  const [allIncome, setAllIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  // income form submission handler
  const submitIncomeHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/incomes/add-income`,
        { userId: user._id, title, amount, category, description },
        {
          withCredentials: true,
        },
      );
      const success = res.data.success;
      if (success) {
        toast.success(res.data.message);
        setTitle("");
        setAmount(0);
        setCategory("Select a category");
        setDescription("");
        getAllIncomes();
        getTotalIncome();
        // navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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

  // delete income
  const deleteIncomeHandler = async (incomeId) => {
    try {
      const res = await axios.delete(
        `${server}/incomes/remove-income/${incomeId}`,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(res.data.message);
        getAllIncomes();
        getTotalIncome();
      }
    } catch (error) {
      toast.error("Somehting wrong delete");
    }
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
  // initial fetch of incomes
  useEffect(() => {
    getAllIncomes();
    getTotalIncome();
  }, []);

  return (
    <Layout>
      <main>
        <section className="mb-4  min-h-[80vh] w-full">
          <div className="flex flex-col ">
            <div className="rounded-md px-2 py-2 text-center shadow-md">
              <h1 className="mb-1 text-2xl font-semibold">Total Income</h1>
              <div className="text-3xl font-bold text-green-500">
                {"\u20B9 "}
                {totalIncome}
              </div>
            </div>
            <div className="flex flex-col px-4 py-2 md:flex-row">
              <div className="flex items-center justify-center rounded  px-1 md:w-2/5   md:items-start md:justify-start">
                <form
                  className="mt-2 flex w-full max-w-md flex-col space-y-4 md:mt-16 md:w-full"
                  onSubmit={submitIncomeHandler}
                >
                  <input
                    className="rounded-md border-b border-solid border-gray-400 px-2 py-1 outline-none"
                    required
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="rounded-md border-b border-solid border-gray-400 px-2 py-1 outline-none"
                    required
                    type="number"
                    value={amount}
                    placeholder="Enter the amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <select
                    className="cursor-pointer rounded-md border-b border-solid border-gray-400 px-2 py-1 outline-none"
                    required
                    name="selectedCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={"Select a category"} disabled>
                      Select a category
                    </option>
                    {options.map((opt, ind) => {
                      return (
                        <option key={ind} value={opt}>
                          {opt}
                        </option>
                      );
                    })}
                  </select>
                  <textarea
                    className="resize-none rounded-md border border-solid border-gray-400 px-2 py-1 outline-none"
                    required
                    type="text"
                    placeholder="Enter the Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <button className="rounded-md border border-solid border-green-400 bg-green-500 py-2 font-bold text-slate-100 hover:bg-green-600">
                    Add Income
                  </button>
                </form>
              </div>
              <div className=" p-4 md:w-3/5 ">
                <h1 className="text-center text-2xl font-semibold">
                  Recent-History
                </h1>
                {allIncome.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {allIncome.slice(0, 5).map((income, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded border border-solid border-gray-300 p-4 shadow-md"
                        >
                          <div className="flex items-center space-x-4 ">
                            <div className="">
                              <i className="text-3xl text-black">
                                {categoryIncomeIcons[income.category] || (
                                  <TbError404 />
                                )}
                              </i>
                            </div>
                            <div className="flex flex-col">
                              <h1 className="text-lg font-semibold">
                                {income.title}
                              </h1>
                              <div className="flex flex-row space-x-2">
                                <h1 className="text-gray-600">
                                  {"\u20B9 "}
                                  {income.amount}
                                </h1>
                                <h1 className="text-gray-600">
                                  {" "}
                                  {moment(income.date).format("YYYY-MM-DD")}
                                </h1>
                                <h1 className="text-gray-600">
                                  {income.description}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div>
                            <i
                              className="cursor-pointer text-2xl text-red-500"
                              onClick={() => deleteIncomeHandler(income._id)}
                            >
                              <RiDeleteBin3Fill />
                            </i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center">No record found !</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Income;
