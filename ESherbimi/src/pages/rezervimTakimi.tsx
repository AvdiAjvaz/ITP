import React, { useState } from 'react';


const RezervimTakimi: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('Komuna');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      full_name: fullName,
      institution,
      date,
      time,
    };

    try {
      const response = await fetch('http://localhost:5000/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Takimi u rezervua me sukses!');
        setFullName('');
        setInstitution('Komuna');
        setDate('');
        setTime('');
      } else {
        alert('Gabim gjatë rezervimit.');
      }
    } catch (error) {
      console.error('Gabim:', error);
      alert('Serveri nuk është i qasshëm për momentin.');
    }
  };

  return (
    <main className="services">
      <form onSubmit={handleSubmit}>
        <h2>Rezervo Takim</h2>

        <label>Emri dhe Mbiemri</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Institucioni</label>
        <select
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        >
          <option value="Komuna">Komuna</option>
          <option value="Qendra Shëndetësore">Qendra Shëndetësore</option>
          <option value="Administratë Tatimore">Administratë Tatimore</option>
        </select>

        <label>Data e dëshiruar</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Ora</label>
        <input
          type="time"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">Rezervo</button>
      </form>
    </main>
  );
};

export default RezervimTakimi;
