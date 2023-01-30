import { Actions, Container, ContainerOrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import formatCurrency from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModal {
	isVisible: boolean,
	isLoading: boolean,
	order : Order | null,
	onCloseModal():  void,
	onCancelOrder(): void,
	onChangeOrderStatus(): void,
}

export default function OrderModal ({
	isVisible,
	isLoading,
	order,
	onCloseModal,
	onCancelOrder,
	onChangeOrderStatus,
} : OrderModal)
{
	useEffect(() => {
		function handleCloseModal(event : KeyboardEvent) {
			if(event.key === 'Escape') {
				onCloseModal();
			}
		}

		document.addEventListener('keyup', handleCloseModal);

		return () => {
			document.removeEventListener('keyup', handleCloseModal);
		};
	},[onCloseModal]);

	if(!isVisible || !order){
		return null;
	}

	const total = order.products.reduce(
		(accumulator, { product, quantity }) => {
			return accumulator + (product.price * quantity);
		}, 0);

	return (
		<Overlay>
			<Container >
				<header>
					<strong>Mesa {order.table}</strong>

					<button onClick={() => onCloseModal()}>
						<img src={closeIcon} alt="close" />
					</button>
				</header>

				<div className="status-container">
					<small>Status do Pedido</small>
					<div>
						<span>
							{order.status === 'WAITING' && '🕛'}
							{order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
							{order.status === 'DONE' && '✅'}
						</span>

						<strong>
							{order.status === 'WAITING' && 'Fila de espera'}
							{order.status === 'IN_PRODUCTION' && 'Em preparação'}
							{order.status === 'DONE' && 'Pronto'}
						</strong>
					</div>
				</div>
				<ContainerOrderDetails>
					<strong>Itens</strong>

					<div className="order-items">
						{order.products.map(({ _id, product, quantity }) => (
							<div key={_id} className="item">
								<img
									src={`http://localhost:3001/uploads/${product.imagePath}`}
									alt={product.name}
									width='60'
									height='35.51'
								/>
								<span className='quantity'>{quantity}x</span>

								<div className="product-details">
									<strong>{product.name}</strong>
									<span>{formatCurrency(product.price)}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</ContainerOrderDetails>
				<Actions>
					{order.status !== 'DONE' &&  <button
						type='button'
						className='primary'
						disabled={isLoading}
						onClick={onChangeOrderStatus}
					>
						<span>
							{order.status === 'WAITING' && '🧑‍🍳'}
							{order.status === 'IN_PRODUCTION' && '✅'}
						</span>
						<strong>
							{order.status === 'WAITING' && 'Iniciar Produção'}
							{order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
						</strong>
					</button>}

					<button
						type='button'
						className='secondary'
						onClick={onCancelOrder}
						disabled={isLoading}
					>
						Cancelar Pedido
					</button>
				</Actions>
			</Container>
		</Overlay>
	);
}