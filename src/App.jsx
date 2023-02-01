import Expense from "./components/Expense";
import Income from "./components/Income";
import Categories from "./components/Categories/Categories";
import image from "./Assets/Images/image.png";
import backupimage from "./Assets/Images/backup.png";
import logo from "./Assets/Images/logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { useState } from "react";
import { backup } from "./data/data";
import Modal from "./components/Modal";
import Home from "./components/Home";
import HomeNew from "./components/HomeNew";
import Import from "./components/Import";

function App() {
  let [modalState, setmodalState] = useState(false);
  let [modalData, setmodalData] = useState({
    image: image,
    title: "New title",
    content: "Some content",
    buttonText: "Click!",
    buttonFunc: () => {
      console.log("first");
    },
    typeDanger: 0,
    showConfirmaionBox: setmodalState,
  });

  const menu = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Expense",
      path: "/expense",
    },
    {
      title: "Income",
      path: "/income",
    },
    {
      title: "Categories",
      path: "/categories",
    },
  ];

  return (
    <div className="body-container App w-full min-h-screen font-sans text-slate-800">
      {/* Used BrowserRouter as Router */}
      <Router>
        <div className="flex items-center justify-between py-6 mx-auto sm:flex-row flex-col space-y-6">
          <Link
            className="text-4xl font-bold tracking-wide hover:text-teal-500"
            to="/"
          >
            <img src={logo} alt="" className="h-10"/>
          </Link>
          <div className="flex items-center">
            <ul
              // style={{
              //   display: "flex",
              //   gap: "1rem",
              //   listStyle: "none",
              // }}
              className="flex gap-4 list-none"
            >
              {menu.map((item) => {
                return (
                  <li
                    key={item.title}
                    className="group flex flex-col items-left"
                  >
                    <NavLink
                      to={item.path}
                      className={(navData) => {
                        return (
                          "text font-medium " +
                          (navData.isActive ? "text-teal-500" : "none")
                        );
                      }}
                    >
                      {item.title}
                    </NavLink>
                    <div className="h-0.5 bg-teal-500 w-0 transition-width group-hover:w-full rounded-full duration-300 ease-out"></div>
                  </li>
                );
              })}
            </ul>
            <button
              className="btn-primary ml-6"
              onClick={() => {
                let modalDataIn = modalData;
                modalDataIn.image = backupimage;
                modalDataIn.title = "Backup Your Data!";
                modalDataIn.content = (
                  <>
                    You can now backup your data and{" "}
                    <Router>
                      <button
                        onClick={() => {
                          window.location.href = "/import";
                        }}
                        className="link"
                      >
                        import
                      </button>
                    </Router>{" "}
                    it again.
                  </>
                );
                modalDataIn.buttonText = "Download Backup File";
                modalDataIn.buttonFunc = backup;
                setmodalData(modalDataIn);
                setmodalState(true);
              }}
            >
              Backup & restore
            </button>
          </div>
        </div>
        {/*Routes*/}
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route
            path="/import"
            element={
              <div className="box-container">
                <Import />
              </div>
            }
          />
          <Route
            path="expense"
            element={
              <div className="box-container">
                <Expense
                  setmodalState={setmodalState}
                  setmodalData={setmodalData}
                  modalData={modalData}
                />
              </div>
            }
          />
          <Route
            path="income"
            element={
              <div className="box-container">
                <Income
                  setmodalState={setmodalState}
                  setmodalData={setmodalData}
                  modalData={modalData}
                />
              </div>
            }
          />
          <Route
            path="categories"
            element={
              <div className="box-container">
                <Categories
                  setmodalState={setmodalState}
                  setmodalData={setmodalData}
                  modalData={modalData}
                />
              </div>
            }
          />
        </Routes>
      </Router>
      {modalState && <Modal data={modalData} />}
    </div>
  );
}

export default App;
