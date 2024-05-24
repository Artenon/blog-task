import { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { Layout } from "./components/layout/layout";
import { ScrollToTop } from "./components/scroll-to-top/scroll-to-top";
import { BlogPage } from "./pages/blog-page";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="create" element={<div>Create</div>} />
          <Route path="blog/:blogId" element={<BlogPage />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
