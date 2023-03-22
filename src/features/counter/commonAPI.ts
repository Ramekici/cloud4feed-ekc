import axios from "axios";
import { AuthData } from "./authSlice";
import { User } from "./userSlice";
import { Todos } from "./todosSlice";



// const instance = axios.create({
//   baseURL: 'https://gorest.co.in',
//   timeout: 30000,
//   headers: {
//     Authorization: `Bearer ${authTokens?.token}`
//   }
// });

const instance = axios.create({
  baseURL: 'https://gorest.co.in',
  timeout: 30000,
});

instance.interceptors.request.use(
  async config => {

    let authTokens = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") ?? '')
      : null;

    // config.headers = {
    //   Authorization: `Bearer ${authTokens?.token}`,
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    config.headers.Authorization = `Bearer ${authTokens?.token}`;
    config.headers.Accept = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error)
  });


// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


const fetchAuth = async (dtm: AuthData) => {
  try {
    console.log(dtm)
    var auth = await instance.post('/consumer/login', { 'kullanıcı adı': dtm.name, token: dtm.token })
    console.log('auth', auth)
    return auth.data
  } catch (err) {
    console.log('error', err)
    return false
  }

}

const fetchUsers = async () => {
  var user = await instance.get('/public/v2/users')
  return user.data
}

const fetchTodo = async (id: string) => {
  try {
    var todo = await instance.get(`/public/v2/users/${id}/todos`);
    return todo.data
  } catch (err) {
    return []
  }
}

const addTodo = async (todos: Todos) => {
  try {
    var todo = await instance.post(`/public/v2/users/${todos.user_id}/todos`, { ...todos })
    console.log(todo.data);
    return todo.data
  } catch (err) {
    return null
  }
}


const addUsr = async (dtm: User) => {
  console.log(dtm);
  const { id, ...rest } = dtm;
  var user = await instance.post(`/public/v2/users`, { ...rest });
  console.log(user);
  return user.data;
}

const updateUsr = async (dtm: User) => {
  try {
    console.log("update", dtm);
    var user = await instance.put(`/public/v2/users/${dtm.id}`, { ...dtm });
    console.log("updateuser", user);
    return user.data;
  } catch (err) {
    return null
  }
}

const deleteUsr = async (id: number) => {
  try {
    var del = await instance.delete(`/public/v2/users/${id}`);
    if (del.status === 204) {
      return id;
    }
    return 0;
  }
  catch (err) {

  }

}


export { fetchUsers, updateUsr, addUsr, deleteUsr, fetchTodo, addTodo, fetchAuth };