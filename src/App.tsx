import { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { Layout } from "./components/layout/layout";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/create" element={<div>Create</div>} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
