import { useEffect, useState } from "react";
import { handleOnChange, handleOnSubmit } from "../validate";
import { deletedata, getdata, getdatabycategory } from "../data/data";
import deleteimage from "../Assets/Images/delete.png";
import Schema from "../Schema";

const Expense = ({ setmodalState, setmodalData, modalData }) => {
  const componentname = {
    name: "expense",
  };

  componentname.lowercase = componentname.name
    .replace("_space_", "")
    .toLowerCase();
  componentname.capitalize =
    componentname.name[0].toUpperCase() +
    componentname.name.replace("_space_", "").slice(1);
  componentname.uppercase = componentname.name
    .replace("_space_", "")
    .toUpperCase();
  componentname.spaced =
    componentname.name[0].toUpperCase() +
    componentname.name.replace("_space_", " ").slice(1);

  const [state, setstate] = useState({
    data: {
      title: "",
      category: "",
      date: "",
      amount: "",
      description: "",
    },
    errors: {
      title: "",
      category: "",
      date: "",
      amount: "",
      description: "",
    },
    submiterror: "",
  });

  const [data, setdata] = useState({});
  const [categories, setcategories] = useState({});
  const [total, settotal] = useState(0);

  const getandsetdata = () => {
    setdata(JSON.parse(getdata(componentname.lowercase)));
    setcategories(JSON.parse(getdata(componentname.lowercase + "categories")));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getandsetdata(), []);

  useEffect(() => {
    settotal(0);
    data !== {} &&
      Object.keys(data).forEach((item) => {
        settotal((total) => total + +data[item].amount);
      });
  }, [data]);

  const schema = {
    title: Schema.title,
    category: Schema.category,
    date: Schema.date,
    amount: Schema.amount,
    description: Schema.description,
  };

  const handleOnChangeIn = (e) => {
    handleOnChange(e, state, setstate, schema);
  };

  const handleOnSubmitIn = (e) => {
    let { data, errors, submiterror } = state;
    e.preventDefault();
    const res = handleOnSubmit(
      componentname.lowercase,
      state,
      setstate,
      schema
    );
    if (!res) {
      submiterror = "Fill all inputs with no errors";
      setstate({ data, errors, submiterror });
    }
    getandsetdata();
  };
  return (
    <div className={componentname.capitalize}>
      <h2 className="text-center">{componentname.spaced}</h2> <br />
      <h4 className="text-teal-500 mb-4">Add {componentname.spaced}</h4>
      <form onSubmit={handleOnSubmitIn} className="form">
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Add title"
            onChange={handleOnChangeIn}
            onBlur={handleOnChangeIn}
            onPaste={handleOnChangeIn}
          />
          <p className="errorText">{state?.errors?.title}</p>
        </div>
        <div className="flex justify-between w-full space-x-4">
          <div className="form-group">
            <input
              className="form-input"
              type="date"
              name="date"
              onChange={handleOnChangeIn}
              onBlur={handleOnChangeIn}
              onPaste={handleOnChangeIn}
            />
            <p className="errorText">{state?.errors?.date}</p>
          </div>
          <div className="form-group w-full">
            <select
              className="form-input"
              name="category"
              defaultValue={""}
              onChange={handleOnChangeIn}
              onBlur={handleOnChangeIn}
              onPaste={handleOnChangeIn}
            >
              <option value="" disabled>
                select category
              </option>
              <option value="none">none</option>
              {Object.keys(categories)
                .reverse()
                .map((category) => {
                  category = categories[category];
                  return (
                    <option value={category.title} key={"opt" + category.title}>
                      {category.title}
                    </option>
                  );
                })}
            </select>
            <p className="errorText">{state?.errors?.category}</p>
          </div>
          <div className="form-group w-full">
            <input
              className="form-input"
              type="number"
              name="amount"
              placeholder="Add amount"
              onChange={handleOnChangeIn}
              onBlur={handleOnChangeIn}
              onPaste={handleOnChangeIn}
            />
            <p className="errorText">{state?.errors?.amount}</p>
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-input"
            name="description"
            placeholder="add description"
            onChange={handleOnChangeIn}
            onBlur={handleOnChangeIn}
            onPaste={handleOnChangeIn}
          ></textarea>
          <p className="errorText">{state?.errors?.description}</p>
        </div>
        <div className="form-group">
          <input
            className="btn-primary"
            type="submit"
            value={"Add " + componentname.capitalize}
          />
          <p className="errorText">{state?.submiterror}</p>
        </div>
      </form>
      <br />
      <br />
      <h4 className="text-teal-500 mb-4">{componentname.spaced} Data</h4>
      {Object.keys(data).length ? (
        <table border="1">
          <thead>
            <tr className="border-0">
              <td colSpan="6" className="text-right px-0">
                <span className="pr-4 font-medium">Sort by category</span>
                <select
                  id="sort_category"
                  className="form-input w-auto py-2"
                  onChange={(e) => {
                    setdata(
                      JSON.parse(
                        getdatabycategory(
                          componentname.lowercase,
                          e.target.value
                        )
                      )
                    );
                  }}
                >
                  <option value="">All</option>
                  <option value="none">none</option>
                  {Object.keys(categories).map((key) => {
                    return (
                      <option key={key} value={categories[key]["title"]}>
                        {categories[key]["title"]}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              {Object.keys(schema).map((key) => {
                return <th key={"td" + key}>{key}</th>;
              })}
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data)
              .reverse()
              .map((item) => {
                return (
                  <tr key={"tr" + item}>
                    {data[item]
                      ? Object.keys(data[item]).map((i) => {
                          return (
                            <td
                              key={"td" + i}
                              className={i === "amount" ? "amount" : ""}
                            >
                              {data[item][i]}
                            </td>
                          );
                        })
                      : null}
                    <td
                      onClick={() => {
                        let modalDataIn = modalData;
                        modalDataIn.image = deleteimage;
                        modalDataIn.typeDanger = 1;
                        modalDataIn.title =
                          "Delete this " + componentname.spaced;
                        modalDataIn.content = data[item]["title"];
                        modalDataIn.buttonText = "Delete this";
                        modalDataIn.buttonFunc = () =>
                          setdata(
                            JSON.parse(
                              deletedata(componentname.lowercase, item)
                            )
                          );
                        setmodalData(modalDataIn);
                        setmodalState(true);
                      }}
                      className="text-rose-500 text-lg cursor-pointer text-center"
                    >
                      &#x2715; {/* delete */}
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td colSpan={6} className="text-right text-lg">
                Total: <span className="font-bold">{total}</span>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No {componentname.spaced} Added</p>
      )}
    </div>
  );
};

export default Expense;
