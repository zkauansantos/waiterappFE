import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Orders from './components/Orders';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from './styles/GlobalStyles';

export default function App () {
	return (
		<>
			<GlobalStyles  />
			<Header />
			<Orders/>
			<ToastContainer position="bottom-center"/>
		</>
	);
}