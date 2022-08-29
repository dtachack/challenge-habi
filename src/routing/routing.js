import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout/layout";
import NotFound from "../shared/pages/not-found";
import Home from "../home/home";
import configuration from "../configuration";
import Form from "../form/form";
import FormFinish from "../form/finish";

export const RouteFinish = "/finish";
export const RouteHome = "/";

const Routing = ({ toggleTheme }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme}></Layout>}>
          <Route exact path={RouteHome} element={<Home></Home>}></Route>
          {configuration.map((conf, id) => (
            <Route
              key={id}
              exact
              path={conf.path}
              element={<Form></Form>}
            ></Route>
          ))}
          <Route
            exact
            path={RouteFinish}
            element={<FormFinish></FormFinish>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
