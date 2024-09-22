import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { login } from "../../redux/auth/operations";
import { selectMessagesStyle } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.required("Password is required"),
});

export const LoginForm = () => {
	const dispatch = useDispatch();
	const style = useSelector(selectMessagesStyle);

	const handleSubmit = (values, { resetForm }) => {
		dispatch(login(values))
			.unwrap()
			.then(() => toast.success("Login is successful!", style))

			.catch(() => toast.error("Login is failed...", style));

		resetForm();
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form className={css.form} autoComplete="off">
				<label htmlFor="email" className={css.label}>
					Email
					<Field type="email" name="email" id="email" />
					<ErrorMessage name="email" component="span" className={css.error} />
				</label>

				<label htmlFor="password" className={css.label}>
					Password
					<Field type="password" name="password" id="password" />
					<ErrorMessage
						name="password"
						component="span"
						className={css.error}
					/>
				</label>

				<button type="submit">Log in</button>
			</Form>
		</Formik>
	);
};
