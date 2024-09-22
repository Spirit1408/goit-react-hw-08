import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./components/App";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<HelmetProvider>
						<App />
					</HelmetProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</StrictMode>,
);
