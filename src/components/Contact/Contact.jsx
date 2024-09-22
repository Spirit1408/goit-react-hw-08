import css from "./Contact.module.css";
import { IoMdContact as UserIcon } from "react-icons/io";
import { FaPhone as PhoneIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { openModal, closeModal } from "../../redux/contacts/slice";
import { selectIsModalOpen } from "../../redux/contacts/selectors";
import { selectMessagesStyle } from "../../redux/auth/selectors";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const contactSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	number: Yup.string()
		.matches(/^\d{3}-\d{3}-\d{4}$/, "Phone format is XXX-XXX-XXXX")
		.required("Phone number is required"),
});

export default function Contact({ data }) {
	const dispatch = useDispatch();
	const isModalOpen = useSelector(selectIsModalOpen);
	const style = useSelector(selectMessagesStyle);
	const { name, number, id } = data;
	const [isEditing, setIsEditing] = useState(false);
	const [isExiting, setIsExiting] = useState(false);

	Modal.setAppElement("#root");

	const onDelete = () => {
		dispatch(closeModal());
		toast.promise(
			dispatch(deleteContact(id)),
			{
				loading: "Deleting contact...",
				success: <b>Contact is deleted!</b>,
				error: <b>Contact is not deleted!</b>,
			},
			style,
		);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = (values) => {
		toast.promise(
			dispatch(updateContact({ id, name: values.name, number: values.number })),
			{
				loading: "Editing contact...",
				success: <b>Contact is edited!</b>,
				error: <b>Contact is not edited!</b>,
			},
			style,
		);
		setIsEditing(false);
	};

	const handleOpenModal = () => {
		dispatch(openModal());
	};

	const handleCloseModal = () => {
		setIsExiting(true);
		setTimeout(() => {
			dispatch(closeModal());
			setIsExiting(false);
		}, 300);
	};

	return (
		<div className={css.contactCard}>
			{isEditing ? (
				<Formik
					initialValues={{ name, number }}
					validationSchema={contactSchema}
					onSubmit={handleSave}
				>
					<Form className={css.form}>
						<div className={css.inputs}>
							<div className={css.inputWrapper}>
								<div className={css.inputWrapperInner}>
									<UserIcon size={15} />
									<Field type="text" name="name" className={css.input} />
								</div>
								<ErrorMessage
									name="name"
									component="div"
									className={css.error}
								/>
							</div>

							<div className={css.inputWrapper}>
								<div className={css.inputWrapperInner}>
									<PhoneIcon size={15} />
									<Field type="text" name="number" className={css.input} />
								</div>
								<ErrorMessage
									name="number"
									component="div"
									className={css.error}
								/>
							</div>
						</div>

						<div className={css.buttonWrapper}>
							<button className={css.button} type="submit">
								Save
							</button>

							<button
								className={css.button}
								type="button"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</button>
						</div>
					</Form>
				</Formik>
			) : (
				<>
					<div className={css.contactCardInfo}>
						<div className={css.text}>
							<UserIcon size={15} />
							<p className={css.text}>{name}</p>
						</div>

						<div className={css.text}>
							<PhoneIcon size={15} />
							<p className={css.text}>{number}</p>
						</div>
					</div>

					<div className={css.buttons}>
						<button className={css.button} onClick={handleEdit} type="button">
							Edit
						</button>

						<button
							className={css.button}
							onClick={handleOpenModal}
							type="button"
						>
							Delete
						</button>
					</div>
				</>
			)}

			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				contentLabel="Confirm delete"
				style={{
					overlay: {
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					},
					content: {
						position: "relative",
						inset: "unset",
						padding: "20px",
						background: "#fff",
						borderRadius: "10px",
						width: "auto",
						maxWidth: "500px",
						textAlign: "center",
					},
				}}
			>
				<div className={`${css.modal} ${isExiting ? css.exiting : ""}`}>
					<h2>Are you sure you want to delete this contact?</h2>
					<div className={css.modalButtonWrapper}>
						<button type="button" onClick={onDelete} className={css.button}>
							Yes
						</button>
						<button
							type="button"
							onClick={handleCloseModal}
							className={css.button}
						>
							No
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
