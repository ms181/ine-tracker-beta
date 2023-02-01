import Joi from "joi-browser";
import { savedata } from "./data/data";

const validate = (state, schema) => {
  let errorObj = {};
  let { error } = Joi.validate(state.data, schema, { abortEarly: false });
  !error
    ? (errorObj = {})
    : error.details.map((item) => (errorObj[item.path] = item.message));
  return errorObj;
};

const handleOnChange = (e, state, setstate, schema) => {
  const target = e.target;
  const handle = target.name;
  const { data, errors } = state;
  const { error } = Joi.validate(data[handle], schema[handle], {
    abortEarly: true,
  });

  !error
    ? (errors[handle] = "")
    : (errors[handle] = error.details[0].message.replaceAll('"', ""));

  setstate({ data, errors });

  data[handle] = target.value;
  setstate({ data, errors });
};

const handleOnSubmit = (name, state, setstate, schema) => {
  let { errors } = state;
  Object.entries(errors).forEach(([key, value]) => {
    if (value === "") {
      delete errors[key];
    }
  });
  if (Object.keys(errors).length === 0 && errors.constructor === Object) {
    errors = validate(state, schema);
  }
  if (Object.keys(errors).length === 0 && errors.constructor === Object) {
    savedata(name, state.data);
    return 1;
  } else {
    return 0;
  }
};

export { handleOnChange, handleOnSubmit };
