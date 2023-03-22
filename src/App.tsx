import React from 'react';
import './App.scss';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import Layout from './app/layout/Layout';
import Auth from './app/components/login/Auth';
import { useAppSelector } from './app/hooks';
import { selectAuth } from './features/counter/authSlice';
import Users from './app/components/user/Users';
import TodoList from './app/components/todo/TodoList';

function App() {
  return (
    <div className='container h-100'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/details"
            element={
              <RequireAuth>
                <TodoList />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;





interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}



// function AuthProvider({ children }: { children: React.ReactNode }) {
//   let [user, setUser] = React.useState<any>(null);

//   let signin = (newUser: string, callback: VoidFunction) => {
//     return fakeAuthProvider.signin(() => {
//       setUser(newUser);
//       callback();
//     });
//   };

//   let signout = (callback: VoidFunction) => {
//     return fakeAuthProvider.signout(() => {
//       setUser(null);
//       callback();
//     });
//   };

//   let value = { user, signin, signout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }


function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAppSelector(selectAuth);
  let location = useLocation();
  console.log("auth", auth);

  if (!auth.valueOf) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}





function ProtectedPage() {
  return <h3>Protected</h3>;
}
