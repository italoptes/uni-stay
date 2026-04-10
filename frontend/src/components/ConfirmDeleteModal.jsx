import { useEffect, useRef, useState } from 'react';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  const [confirmationText, setConfirmationText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setConfirmationText('');
      return;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const isConfirmationValid = confirmationText === 'EXCLUIR';

  const handleConfirm = () => {
    if (!isConfirmationValid) {
      return;
    }

    onConfirm();
    setConfirmationText('');
  };

  const handleClose = () => {
    setConfirmationText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-toast-in">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Excluir residência</h2>
          <p className="text-sm text-gray-500">Essa ação não pode ser desfeita.</p>
        </div>

        <div className="mt-5 space-y-2">
          <label htmlFor="delete-confirmation" className="text-sm font-medium text-gray-700">
            Confirmação
          </label>
          <input
            id="delete-confirmation"
            ref={inputRef}
            type="text"
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            placeholder="Digite EXCLUIR para confirmar"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isConfirmationValid}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
