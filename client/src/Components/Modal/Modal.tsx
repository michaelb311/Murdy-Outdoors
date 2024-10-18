import React from 'react';
import ReactModal from 'react-modal';
import './styles.css';

// Bind modal to your appElement for accessibility
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
ReactModal.setAppElement('#root');

interface ModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel='Example Modal'
			className='Modal'
			overlayClassName='Overlay'
		>
			{children}
		</ReactModal>
	);
};

export default Modal;
