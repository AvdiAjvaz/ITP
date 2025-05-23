import React, { useState } from 'react';


const PagesaOnline: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      full_name: fullName,
      payment_type: paymentType,
      amount,
      card_number: cardNumber,
    };

    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Pagesa u krye me sukses!');
        // Opsionale: pastro fushat
        setFullName('');
        setPaymentType('');
        setAmount(0);
        setCardNumber('');
      } else {
        alert('Gabim gjatë pagesës.');
      }
    } catch (error) {
      console.error('Gabim:', error);
      alert('Serveri nuk është i disponueshëm.');
    }
  };

  return (
    <main className="services">
      <form onSubmit={handleSubmit}>
        <h2>Pagesë Elektronike</h2>

        <label>Emri i Plotë</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Tipi i Pagesës</label>
        <select
          required
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="">Zgjedh një</option>
          <option value="ujë">Faturë Uji</option>
          <option value="rrymë">Faturë Rryme</option>
          <option value="tatim">Tatime</option>
        </select>

        <label>Shuma (€)</label>
        <input
          type="number"
          min="1"
          required
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <label>Numri i kartelës</label>
        <input
          type="text"
          required
          placeholder="**** **** **** ****"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <button type="submit">Paguaj Tani</button>
      </form>
    </main>
  );
};

export default PagesaOnline;
