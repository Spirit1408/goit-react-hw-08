import DocumentTitle from "../../components/DocumentTitle";
import ContactEditor from "../../components/ContactEditor/ContactEditor";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "./../../components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectLoading } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { HashLoader } from "react-spinners";

export default function ContactsPage() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const contacts = useSelector(selectContacts);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<>
			<DocumentTitle>Your contacts</DocumentTitle>
			<ContactEditor />
			{contacts.length > 0 && <SearchBox />}
			{isLoading ? (
				<HashLoader style={{ margin: "0 auto" }} />
			) : (
				<ContactList />
			)}
		</>
	);
}
