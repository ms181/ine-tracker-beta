import Joi from "joi-browser";

const Schema = {
  title: Joi.string().required().min(5).max(40).label("Title"),
  category: Joi.string().required().label("Category"),
  date: Joi.string().required().label("Date"),
  amount: Joi.number().min(1).required().label("Amount"),
  description: Joi.string().required().min(25).max(250).label("Description"),
};

export default Schema;
