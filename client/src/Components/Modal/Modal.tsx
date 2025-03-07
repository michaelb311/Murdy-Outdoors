import React from 'react';
import ReactModal from 'react-modal';
import './styles.css';

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
			contentLabel='Form Modal'
			className='Modal'
			overlayClassName='Overlay'
		>
			{children}
			<button className='closeModalButton' onClick={onRequestClose}>
				X
			</button>
		</ReactModal>
	);
};

export default Modal;
