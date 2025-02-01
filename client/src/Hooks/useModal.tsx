import { ReactElement, useContext } from 'react';
import { GlobalContext } from '../API/context';
import Modal from '../Components/Modal/Modal';

const useModal = () => {
	const { state, dispatch } = useContext(GlobalContext);

	const openModal = (content: ReactElement) => {
		dispatch({ type: 'SET_MODAL_CONTENT', payload: content });
		dispatch({ type: 'SET_IS_MODAL_OPEN', payload: true });
	};

	const closeModal = () => {
		dispatch({ type: 'SET_IS_MODAL_OPEN', payload: false });
		dispatch({ type: 'SET_MODAL_CONTENT', payload: null });
	};

	const ModalComponent = (
		<Modal isOpen={state.isModalOpen} onRequestClose={closeModal}>
			{state.modalContent}
		</Modal>
	);

	return {
		openModal,
		closeModal,
		ModalComponent,
	};
};

export default useModal;
