import axios from "axios";
import { AuthData } from "./authSlice";
import { User } from "./counterSlice";


const instance = axios.create({
  baseURL: 'https://gorest.co.in',
  timeout: 30000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: 'Bearer '
  }
});


// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


export function fetchAuth(dtm: AuthData) {
  return new Promise<{ data: boolean }>((resolve, reject) => {
    setTimeout(() => resolve({ data: true }), 500);
  })
}

const fetchUsers = async () => {
  var user = await instance.get('/public/v2/users')
  console.log(user.data);

  return user.data
}

const fetchTodo = async (id: string) => {
  var todo = await instance.get(`/public/v2/users/${id}/todos`)
  console.log(todo.data);

  return todo.data
}

const addTodo = async (id: string, todos: string) => {
  var todo = await instance.post(`/public/v2/users/${id}/todos` ,  {'todo': todos})
  console.log(todo.data);

  return todo.data
}


const addUsr = async (dtm: User) => {
  console.log(dtm);
  const { id, ...rest } = dtm;
  var user = await instance.post(`/public/v2/users`, { rest });

  return new Promise<{ data: boolean }>((resolve, reject) => {
    setTimeout(() => resolve({ data: true }), 500);
  })
}

const updateUsr = async (dtm: User) => {
  console.log("update", dtm);
  var user = await instance.put(`/public/v2/users/${dtm.id}`);
  console.log("updateuser", user);
  return new Promise<{ data: boolean }>((resolve, reject) => {
    setTimeout(() => resolve({ data: true }), 500);
  })
}

const deleteUsr = async (id: string) => {

  var del = await instance.delete(`/public/v2/users/${id}`);
  return new Promise<{ data: boolean }>((resolve, reject) => {
    setTimeout(() => resolve({ data: true }), 500);
  })
}


export { fetchUsers, updateUsr, addUsr, deleteUsr, fetchTodo, addTodo };