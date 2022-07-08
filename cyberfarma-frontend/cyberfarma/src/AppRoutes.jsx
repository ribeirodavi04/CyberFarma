import React, { useContext } from "react";
import Login from "./views/Login";
import Home from "./views/Home";
import Vendas from "./views/Vendas";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/auth";
import { TablesContextProvider } from "./contexts/tables";

export default function AppRoutes() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <h1>Carregando...</h1>;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/home/*"
            element={
              <Private>
                <TablesContextProvider>
                  <Home />
                </TablesContextProvider>
              </Private>
            }
          />
          <Route
            exact
            path="/vendas"
            element={
              <Private>
                <Vendas />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
