import React from 'react';

interface ErrorMessageProps {
  error: string | null;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{error}</span>
      </div>
      {onClose && (
        <button
          className="error-close"
          onClick={onClose}
          aria-label="Fermer le message d'erreur"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
