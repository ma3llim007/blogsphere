import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store, storePersistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./services/queryClientConfig";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={storePersistor}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </HelmetProvider>
    </StrictMode>
);
