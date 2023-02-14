import { useDispatch, useSelector } from 'react-redux';
import { onClearAlert, onCloseModal, onOpenModal, onShowAlert } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    isModalOpen,
    errorMessagesUi,
    isThereAnyMsg,
    alertUi,
    globalAlert,
    isThereAnyGlobalMsg,
  } = useSelector(state => state.ui);

  const openModal = () => {
    dispatch(onOpenModal());
  };
  const closeModal = () => {
    dispatch(onCloseModal());
  };

  const setErrorMessages = errors => {
    dispatch(onShowAlert({ msg: errors, error: true }));

    setTimeout(() => {
      dispatch(onClearAlert());
    }, 1800);
  };

  return {
    // Properties
    isModalOpen,
    errorMessagesUi,
    isThereAnyMsg,
    alertUi,
    globalAlert,
    isThereAnyGlobalMsg,

    // Methods
    openModal,
    closeModal,
    setErrorMessages,
  };
};
