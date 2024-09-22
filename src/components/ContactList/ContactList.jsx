import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/filters/selectors";

export default function ContactList() {
	const filteredData = useSelector(selectFilteredContacts);

	return (
		<ul className={css.contactList}>
			{filteredData.length === 0 ? (
				<p>No contacts</p>
			) : (
				filteredData.map((item) => (
					<li key={item.id}>
						<Contact data={item} />
					</li>
				))
			)}
		</ul>
	);
}
