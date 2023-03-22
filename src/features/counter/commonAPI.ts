import axios, { AxiosError, AxiosHeaders } from "axios";
import { AuthData } from "./authSlice";
import { User } from "./userSlice";
import { Todos } from "./todosSlice";


const instance = axios.create({
  baseURL: 'https://gorest.co.in',
  timeout: 30000,
});

instance.interceptors.request.use(
  async config => {

    let authTokens = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") ?? '')
      : null;

    config.headers.Authorization = `Bearer ${authTokens?.token}`;
    config.headers.Accept = 'application/json';
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    Promise.reject(error)
  });



const fetchAuth = async (dtm: AuthData) => {
  // try {
  //   // var auth = await instance.post('/consumer/login', { 'kullanıcı adı': dtm.name, token: dtm.token })
  //   // return auth.data
  // } catch (err) {
  //   return false
  // }

  return new Promise<{ data: boolean }>((resolve) =>
    setTimeout(() => resolve({ data: true }), 500)
  );
}

const fetchUsers = async (page: number, per_page: number) => {
  try {
    var user = await instance.get(`/public/v2/users/?page=${page}&per_page=${per_page}`)
    return user.data
  } catch (err) {
    return []
  }

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
    return todo.data
  } catch (err) {
    return errMsg(err)
  }
}


const addUsr = async (dtm: User) => {
  try {
    const { id, ...rest } = dtm;
    var user = await instance.post(`/public/v2/users`, { ...rest });
    return user.data;
  } catch (err) {
    return errMsg(err)
  }

}

const updateUsr = async (dtm: User) => {
  try {
    var user = await instance.put(`/public/v2/users/${dtm.id}`, { ...dtm });
    return user.data;
  } catch (err) {
    return errMsg(err)
  }
}

const errMsg = (err: any) => {

  if(err.code === AxiosError.ERR_BAD_REQUEST) {
    return {'token': 'Token is invalid'}
  }
}

const deleteUsr = async (id: number) => {
  try {
    var del = await instance.delete(`/public/v2/users/${id}`);
    if (del.status === 204) {
      return id;
    }
    return -1;
  }
  catch (err) {

    return errMsg(err)
  }

}


export { fetchUsers, updateUsr, addUsr, deleteUsr, fetchTodo, addTodo, fetchAuth };