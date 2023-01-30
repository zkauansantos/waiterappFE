import styled from 'styled-components';

export const Overlay = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	background: rgba(0,0,0,0.8);
	backdrop-filter: blur(4.5px);
	display: flex;
	justify-content: center;
	align-items: center;
`;


export const Container = styled.div`
	padding: 32px;
	width: 480px;
	background-color: #fff;
	border-radius: 12px;
	display: flex;
	flex-direction:column;

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong {
			font-size: 24px;
		}

		button {
			display: flex;
			background: transparent;
			border: none;
		}
	}


	.status-container {
		margin-top: 32px;

		small {
			font-size: 14px;
			color: #333;
			opacity: 0.8;
		}

		div {
			display: flex;
			gap: 8px;
			align-items: center;
			margin-top: 8px;
		}
	}
`;

export const ContainerOrderDetails = styled.div`
	margin-top: 32px;

	> strong {
		font-weight: 500;
		font-size: 14px;
		opacity: 0.8;
	}

	.order-items {
		margin-top: 16px;

		.item {
			display: flex;

			& + .item {
				margin-top: 16px;
			}

			img {
				border-radius: 6px;
			}

			.quantity {
				font-size: 14px;
				color: #666;
				display: block;
				min-width: 20px;
				margin-left: 8px;
			}

			.product-details {
				margin-left: 4px;

				strong {
					display: block;
					margin-bottom: 4px;
				}

				span {
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 24px;


		span {
			font-size: 14px;
			font-weight: 500;
			opacity: 0.8;
		}
	}
`;

export const Actions = styled.footer`
	margin-top: 32px;
	display: flex;
	gap: 12px;
	flex-direction: column;

	button {
		border: none;
		border-radius: 48px;
		padding: 12px 24px;
	}

	button:disabled{
		opacity: 0.5;
		cursor: not-allowed;
	}

	.primary {
		display: flex;
		gap: 8px;
		justify-content: center;
		align-items: center;
		background: #333;
		color: #fff;
	}

	.secondary {
		background: transparent;
		color: #D73035;
		font-weight: bold;
		border: 1px solid rgba(204,204,204, 0.6);
	}

`;