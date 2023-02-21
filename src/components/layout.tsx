import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div>
			<p> NAvBAR</p>
			<div>
				<Outlet />
			</div>
			<p>footer</p>
		</div>
	);
}
export default Layout;
