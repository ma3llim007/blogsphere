import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, storePersistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClientConfig";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={storePersistor}>
                <QueryClientProvider client={queryClient}>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                    <ToastContainer limit={4} />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
