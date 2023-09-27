import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import toast from "react-hot-toast";
import { GiNotebook } from "react-icons/gi";
import {
  RiMentalHealthFill,
  RiBusFill,
  RiDeleteBin3Fill,
} from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdLunchDining } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { TbError404 } from "react-icons/tb";
import moment from "moment";
import { server } from "../App";
const Expense = () => {
  const options = [
    "Education",
    "Health",
    "Shopping",
    "Travelling",
    "Food & Drinks",
    "Other-Expense",
  ];
  const categoryExpenseIcons = {
    Education: <GiNotebook />,
    Health: <RiMentalHealthFill />,
    Shopping: <AiOutlineShoppingCart />,
    Travelling: <RiBusFill />,
    "Food & Drinks": <MdLunchDining />,
    "Other-Expense": <ImExit />,
  };
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Select a category");
  const [description, setDescription] = useState("");

  const [allExpense, setAllExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  // expense form submission handler
  const submitExpenseHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/expenses/add-expense`,
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
        getAllExpense();
        totalExpenseHandler();

        // navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong in expense");
    }
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

  // delete Expense
  const deleteExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
        `${server}/expenses/remove-expense/${expenseId}`,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(res.data.message);
        getAllExpense();
        totalExpenseHandler();
      }
    } catch (error) {
      toast.error("Expense delete error");
    }
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

  // initial fetch of expenses
  useEffect(() => {
    getAllExpense();
    totalExpenseHandler();
  }, []);
  return (
    <Layout>
      <main>
        <section className="mb-4 min-h-[80vh] w-full">
          <div className="mt-2 flex flex-col">
            <div className="rounded-md  px-2 py-2 text-center shadow-md">
              <h1 className="mb-2 text-2xl font-semibold">Total Expense</h1>
              <div className="text-3xl font-bold text-rose-400">
                {"\u20B9 "}
                {totalExpense}
              </div>
            </div>
            <div className="flex flex-col px-4 py-2 md:flex-row">
              <div className="flex items-center justify-center rounded px-1 md:w-2/5 md:items-start md:justify-start">
                <form
                  className="mt-2 flex w-full max-w-md flex-col space-y-4 md:mt-16 md:w-full"
                  onSubmit={submitExpenseHandler}
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
                    placeholder="Enter the amount"
                    value={amount}
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
                  <button className="rounded-md border border-solid border-rose-500 bg-rose-400 py-2 font-bold text-slate-100 hover:bg-rose-500">
                    Add Expense
                  </button>
                </form>
              </div>
              <div className="p-4 md:w-3/5">
                <h1 className="text-center text-2xl font-semibold">
                  Recent-History
                </h1>
                {allExpense.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {allExpense.slice(0, 5).map((exp, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded border border-solid border-gray-300 p-4 shadow-md"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="">
                              <i className="text-3xl text-black">
                                {categoryExpenseIcons[exp.category] || (
                                  <TbError404 />
                                )}
                              </i>
                            </div>
                            <div className="flex flex-col">
                              <h1 className="text-lg font-semibold">
                                {exp.title}
                              </h1>
                              <div className="flex flex-row space-x-2">
                                <h1 className="text-gray-600">
                                  {"\u20B9 "}
                                  {exp.amount}
                                </h1>
                                <h1 className="text-gray-600">
                                  {moment(exp.date).format("YYYY-MM-DD")}
                                </h1>
                                <h1 className="text-gray-600">
                                  {exp.description}
                                </h1>
                              </div>
                            </div>
                          </div>
                          <div>
                            <i
                              className="cursor-pointer text-2xl text-red-500"
                              onClick={() => deleteExpenseHandler(exp._id)}
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

export default Expense;
