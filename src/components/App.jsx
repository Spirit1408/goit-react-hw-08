import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../redux/auth/selectors";
import { lazy, useEffect } from "react";
import { refreshUser } from "../redux/auth/operations";
import { Layout } from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

export default function App() {
	const dispatch = useDispatch();
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return isRefreshing ? (
		<p>Checking user...</p>
	) : (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/register"
					element={
						<RestrictedRoute
							redirectTo="/contacts"
							component={<RegisterPage />}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
					}
				/>
				<Route
					path="/contacts"
					element={
						<PrivateRoute redirectTo="/login" component={<ContactsPage />} />
					}
				/>
			</Routes>
			<Toaster />
		</Layout>
	);
}
