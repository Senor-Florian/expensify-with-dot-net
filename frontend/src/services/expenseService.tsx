import Expense from "../interfaces/Expense";
import axios from "axios";

// todo add api key and userId in header
// todo maybe add different interfaces for POST and PUT and not use Expense

const list = (userId: string) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-type": "application/json",
      "Api-Key": process.env.API_KEY,
      "User-Id": userId
    }
  }).get<Array<Expense>>("/expenses");
};
const create = (data: Expense, userId: string) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-type": "application/json",
      "Api-Key": process.env.API_KEY,
      "User-Id": userId
    }
  }).post<Expense>("/expenses", data);
};

const update = (id: string, data: Expense, userId: string) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-type": "application/json",
      "Api-Key": process.env.API_KEY,
      "User-Id": userId
    }
  }).put(`/expenses/${id}`, data);
};

const remove = (id: string, userId: string) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-type": "application/json",
      "Api-Key": process.env.API_KEY,
      "User-Id": userId
    }
  }).delete(`/expenses/${id}`);
};

const expenseService = {
  list,
  create,
  update,
  remove
};

export default expenseService;