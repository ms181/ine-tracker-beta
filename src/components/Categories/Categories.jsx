import { useState } from "react";
import ExpenseCategories from "./Expense";
import IncomeCategories from "./Income";

const Categories = ({ setmodalState, setmodalData, modalData }) => {
  const [component, setcomponent] = useState(0);
  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX > touchstartX) setcomponent(0);
    if (touchendX < touchstartX) setcomponent(1);
  }

  document.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
  return (
    <div className="Categories">
      <div className="toggle">
        <div
          className={"toggle-btn " + (component === 0 ? "active" : "")}
          onClick={() => setcomponent(0)}
        >
          Income
        </div>
        <div
          className={"toggle-btn " + (component === 1 ? "active" : "")}
          onClick={() => setcomponent(1)}
        >
          Expense
        </div>
      </div>
      <br />
      <div className="bg-slate-50 px-8 py-6 rounded-lg border-2">
        {component === 0 ? (
          <IncomeCategories
            setmodalState={setmodalState}
            setmodalData={setmodalData}
            modalData={modalData}
          />
        ) : (
          <ExpenseCategories
            setmodalState={setmodalState}
            setmodalData={setmodalData}
            modalData={modalData}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
