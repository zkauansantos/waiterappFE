import { Container } from './styles';
import OrdersBoard from '../OrdersBoard';
import { Order } from '../../types/Order';

const orders: Order[] = [
	{
		'_id': '63cfe55e09b4cc2926da1d66',
		'table': '123',
		'status': 'WAITING',
		'products': [
			{
				'product': {
					'name': 'Coca-Cola',
					'imagePath': '1674493304217-coca-cola.png',
					'price': 7,
				},
				'quantity': 2,
				'_id': '63cfe55e09b4cc2926da1d67',
			},
			{
				'product': {
					'name': 'Pizza quatro queijos',
					'imagePath': '1674490309395-quatro-queijos.png',
					'price': 40,
				},
				'quantity': 2,
				'_id': '63cffea48d3fc8a5cf91d46c',
			},
		],
	},
];

export default function Orders () {
	return (
		<Container>
			<OrdersBoard
				icon="🕛"
				title="Fila de espera"
				orders={orders}
			/>
			<OrdersBoard
				icon="🧑‍🍳"
				title="Em preparação"
				orders={[]}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto"
				orders={[]}
			/>
		</Container>
	);
}