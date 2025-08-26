import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "./components/provider/theme-provider.tsx";
import { RouterProvider } from "react-router";
import { route } from "./routes/route.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={route} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
