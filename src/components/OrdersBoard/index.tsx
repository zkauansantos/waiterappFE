import { Board, OrdersContainer } from './styles';
import { Order } from '../../types/Order';
import { useCallback, useState } from 'react';
import OrderModal from '../OrderModal';

interface OrdersBoardProps {
	icon: string,
	title:string,
	orders: Order[],
}

export default function OrdersBoard({ icon, title, orders } :OrdersBoardProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

	function handleOpenModal(order: Order){
		setIsModalVisible(true);
		setSelectedOrder(order);
	}

	const handleCloseModal = useCallback(() =>{
		setIsModalVisible(false);
		setSelectedOrder(null);
	}, []);

	return (
		<Board>
			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			{orders.length > 0 && <OrdersContainer>
				{orders.map((order) => (
					<button
						key={order._id}
						type='button'
						onClick={() => handleOpenModal(order)}
					>
						<strong>Mesa {order.table}</strong>
						<span> {order.products.length} itens</span>
					</button>
				))}
			</OrdersContainer>}

			<OrderModal
				onCloseModal={handleCloseModal}
				isVisible={isModalVisible}
				order={selectedOrder}
			/>
		</Board>
	);
}