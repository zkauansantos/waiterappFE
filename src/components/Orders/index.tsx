import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';
import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';




export default function Orders () {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		api.get('/orders')
			.then(({ data }) => {
				setOrders(data);
			});
	}, []);

	function handleCancelOrder(orderId: string){
		setOrders((prevState) => prevState.filter((order) => (
			order._id !== orderId
		)));
	}

	function handleChangeOrderStatus(orderId: string, status:	 Order['status']) {
		setOrders((prevState) => prevState.map((order) => (
			order._id === orderId
				? { ...order, status }
				: order
		)));
	}

	const waiting = orders.filter((order) => order.status === 'WAITING');
	const production = orders.filter((order) => order.status === 'IN_PRODUCTION');
	const done = orders.filter((order) => order.status === 'DONE');


	return (
		<Container>
			<OrdersBoard
				icon="🕛"
				title="Fila de espera"
				orders={waiting}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>
			<OrdersBoard
				icon="🧑‍🍳"
				title="Em preparação"
				orders={production}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto"
				orders={done}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>
		</Container>
	);
}