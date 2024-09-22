import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./RegisterForm.module.css";

const validationSchema = Yup.object({
	name: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Email must include a valid domain (e.g., .com, .net)",
		)
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters long")
		.required("Password is required"),
});

export const RegisterForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (values, { resetForm }) => {
		dispatch(register(values));
		resetForm();
	};

	return (
		<Formik
			initialValues={{ name: "", email: "", password: "" }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form className={css.form} autoComplete="off">
				<label htmlFor="name" className={css.label}>
					Username
					<Field type="text" name="name" id="name" />
					<ErrorMessage name="name" component="span" className={css.error} />
				</label>

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

				<button type="submit">Register</button>
			</Form>
		</Formik>
	);
};
