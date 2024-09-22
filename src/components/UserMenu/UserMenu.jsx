import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { RxExit } from "react-icons/rx";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	return (
		<div className={css.wrapper}>
			<p className={css.username}>Welcome, {user.name}!</p>
			<button className={css.btn} type="button" onClick={() => dispatch(logout())}>
				<RxExit size={22}/>
			</button>
		</div>
	);
};
