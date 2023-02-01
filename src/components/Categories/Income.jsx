import { useEffect, useState } from "react";
import { handleOnChange, handleOnSubmit } from "../../validate";
import deleteimage from "../../Assets/Images/delete.png";
import { deletedata, getdata } from "../../data/data";
import Schema from "../../Schema";

const IncomeCategories = ({ setmodalState, setmodalData, modalData }) => {
  const componentname = {
    name: "income_space_categories",
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
      description: "",
    },
    errors: {
      title: "",
      description: "",
    },
  });

  const [data, setdata] = useState({});

  const getandsetdata = () => {
    setdata(JSON.parse(getdata(componentname.lowercase)));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getandsetdata(), []);

  const schema = {
    title: Schema.title,
    description: Schema.description,
  };

  const handleOnChangeIn = (e) => {
    handleOnChange(e, state, setstate, schema);
  };

  const handleOnSubmitIn = (e) => {
    e.preventDefault();
    handleOnSubmit(componentname.lowercase, state, setstate, schema);
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
            value={"Add " + componentname.spaced}
          />
        </div>
      </form>
      <br />
      <br />
      <h4 className="text-teal-500 mb-4">{componentname.spaced} Data</h4>
      {Object.keys(data).length ? (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(schema).map((key) => {
                return <th key={"td" + key}>{key}</th>;
              })}
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
                      className="text-rose-500 text-lg cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p>No {componentname.spaced} Added</p>
      )}
    </div>
  );
};

export default IncomeCategories;
