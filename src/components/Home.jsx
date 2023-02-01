import React, { useEffect, useState } from "react";
import { getdata, gettotal, gettotalbycategory } from "../data/data";
import expenseimage from "../Assets/Images/expense.png";
import incomeimage from "../Assets/Images/income.png";

const Home = () => {
  const [expensecategories, setexpensecategories] = useState({});
  const [incomecategories, setincomecategories] = useState({});
  const [values, setvalues] = useState({
    income: gettotal("income"),
    expense: gettotal("expense"),
  });

  const getandsetdata = () => {
    setexpensecategories(JSON.parse(getdata("expensecategories")));
    setincomecategories(JSON.parse(getdata("incomecategories")));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getandsetdata(), []);

  return (
    <div className="Home mt-4">
      <h2>Home</h2>
      <div className="grid grid-cols-3 gap-8 py-8">
        <div className="item box flex flex-col gap-1">
          <div className="flex h-4/6 gap-1 w-full bg-white">
            <div className="flex flex-col w-4/5 gap-1">
              <select
                id="incomecalc"
                className="form-input"
                onChange={(e) => {
                  const valuesin = values;
                  valuesin["income"] = e.target.value;
                  setvalues(valuesin);
                  console.log(values);
                }}
              >
                <option value={gettotal("income")}>
                  Income: All - {gettotal("income")}
                </option>
                {Object.keys(incomecategories)
                  .reverse()
                  .map((category) => {
                    category = incomecategories[category];
                    return (
                      <option
                        value={gettotalbycategory("income", category.title)}
                        key={"opt" + category.title}
                      >
                        {category.title} -{" "}
                        {gettotalbycategory("income", category.title)}
                      </option>
                    );
                  })}
              </select>
              <select
                id="expensecalc"
                className="form-input"
                onChange={(e) => {
                  const valuesin = values;
                  valuesin["expense"] = e.target.value;
                  setvalues(valuesin);
                  console.log(values);
                }}
              >
                <option value={gettotal("expense")}>
                  Expense: All - {gettotal("expense")}
                </option>
                {Object.keys(expensecategories)
                  .reverse()
                  .map((category) => {
                    category = expensecategories[category];
                    return (
                      <option
                        value={gettotalbycategory("expense", category.title)}
                        key={"opt" + category.title}
                      >
                        {category.title} -{" "}
                        {gettotalbycategory("expense", category.title)}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-1/5 gap-1 flex flex-col">
              <button
                id="formulacalc"
                className="form-input w-full h-1/2 text-center p-0 text-xl"
              >
                -
              </button>
              <button
                className="btn-primary w-full h-1/2 text-center p-0 text-lg"
                id="submitcalc"
                onClick={() =>
                  (document.getElementById("outputcalc").value =
                    +values.income - +values.expense)
                }
              >
                calc
              </button>
            </div>
          </div>
          <div className="h-2/6">
            <input
              type="text"
              className="form-input py-2.5 border-teal-500"
              placeholder="Output"
              id="outputcalc"
              readOnly
            />
          </div>
        </div>
        <div className="item box p-4">
          <div className="flex w-full h-3/4 justify-between">
            <h1 className="font-extrabold text">{gettotal("expense")}</h1>
            <img src={expenseimage} alt="" className="h-full py-2 mr-2" />
          </div>
          <span className="text-slate-500 text-lg">Total expense</span>
        </div>
        <div className="item box p-4">
          <div className="flex w-full h-3/4 justify-between">
            <h1 className="font-extrabold text">{gettotal("income")}</h1>
            <img src={incomeimage} alt="" className="h-full py-2 mr-2" />
          </div>
          <span className="text-slate-500 text-lg">Total income</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
