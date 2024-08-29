import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routers.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import 'antd/dist/reset.css'; // Import Ant Design CSS

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
