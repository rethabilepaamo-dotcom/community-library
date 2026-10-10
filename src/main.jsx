import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { LibraryProvider } from "./context/LibraryContext";
import "./styles.css";

// HashRouter keeps page refreshes working on GitHub Pages
createRoot(document.getElementById("app")).render(
  <StrictMode>
    <HashRouter>
      <LibraryProvider>
        <App />
      </LibraryProvider>
    </HashRouter>
  </StrictMode>
);
