import css from "./ContactEditor.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectMessagesStyle } from "../../redux/auth/selectors";

export default function ContactForm() {
	const nameFieldId = useId();
	const phoneFieldId = useId();
	const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;
	const dispatch = useDispatch();
	const style = useSelector(selectMessagesStyle);

	const formSchema = Yup.object().shape({
		username: Yup.string()
			.min(2, "Name is too short")
			.max(50, "Name is too long")
			.required("Required!"),
		phone: Yup.string()
			.matches(phoneRegExp, "Phone number should be in format 000-000-0000")
			.required("Required!"),
	});

	const handleAddContact = (values, actions) => {
		toast.promise(
			dispatch(
				addContact({
					name: values.username,
					number: values.phone,
				}),
			),
			{
				loading: "Adding contact...",
				success: <b>Contact is added!</b>,
				error: <b>Contact is not added!</b>,
			},
			style,
		);

		actions.resetForm();
	};

	return (
		<Formik
			initialValues={{
				username: "",
				phone: "",
			}}
			onSubmit={handleAddContact}
			validationSchema={formSchema}
		>
			<Form className={css.form}>
				<div className={css.inputContainer}>
					<label htmlFor={nameFieldId}>Name</label>
					<Field
						className={css.input}
						type="text"
						name="username"
						id={nameFieldId}
					/>
					<ErrorMessage
						className={css.error}
						name="username"
						component="span"
					/>
				</div>

				<div className={css.inputContainer}>
					<label htmlFor={phoneFieldId}>Number</label>
					<Field
						className={css.input}
						type="phone"
						name="phone"
						id={phoneFieldId}
					/>
					<ErrorMessage className={css.error} name="phone" component="span" />
				</div>

				<button className={css.button} type="submit">
					Add contact
				</button>
			</Form>
		</Formik>
	);
}
