import { Board, OrdersContainer } from './styles';
import { Order } from '../../types/Order';
import { useState } from 'react';
import OrderModal from '../OrderModal';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
	icon: string,
	title:string,
	orders: Order[],
	onCancelOrder(orderId: string): void,
	onChangeOrderStatus(orderId: string, status: Order['status']): void
}

export default function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus } :OrdersBoardProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
	const [isLoading, setIsLoading] = useState(false);

	function handleOpenModal(order: Order){
		setIsModalVisible(true);
		setSelectedOrder(order);
	}

	function handleCloseModal() {
		setIsModalVisible(false);
		setSelectedOrder(null);
	}

	async function handleChanceOrderStatus(){
		setIsLoading(true);

		const newStatus = selectedOrder?.status === 'WAITING'
			? 'IN_PRODUCTION'
			: 'DONE';

		await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

		onChangeOrderStatus(selectedOrder!._id, newStatus);
		setIsLoading(false);
		setIsModalVisible(false);
		toast.success(`O status do pedido da mesa ${selectedOrder?.table} foi alterado com sucesso`);
	}

	async function handleCancelOrder() {
		setIsLoading(true);

		await api.delete(`/orders/${selectedOrder?._id}`);

		onCancelOrder(selectedOrder!._id);
		setIsLoading(false);
		setIsModalVisible(false);
		toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso`);

	}

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
				onChangeOrderStatus={handleChanceOrderStatus}
				onCloseModal={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				isVisible={isModalVisible}
				isLoading={isLoading}
				order={selectedOrder}
			/>
		</Board>
	);
}