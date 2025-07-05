import React from 'react';
import '../styles/Login-Success.css';

export default function Success() {
  return (
    <div className="success-container">
      <div className="success-checkmark">✔️</div>
      <h2 className="success-title">Tebrikler!</h2>
      <p className="success-text">Kayıt işleminiz başarıyla tamamlanmıştır.</p>
    </div>
  );
}