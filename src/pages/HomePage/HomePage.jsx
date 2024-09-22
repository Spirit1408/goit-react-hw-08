import css from "./HomePage.module.css";
import DocumentTitle from "../../components/DocumentTitle";
import { RiContactsBookFill } from "react-icons/ri";

export default function HomePage() {
	return (
		<>
			<DocumentTitle>Home</DocumentTitle>

			<div className={css.container}>
				<h1 className={css.title}>
					<div>
						Welcome to <b>Contacts Book</b>!
					</div>{" "}
					<RiContactsBookFill />
				</h1>
			</div>
		</>
	);
}
