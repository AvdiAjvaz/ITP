import React, { useState } from 'react';


const RaportimProbleme: React.FC = () => {
  const [problemType, setProblemType] = useState('Ndriçim Publik');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      problem_type: problemType,
      description,
      address,
    };

    try {
      const response = await fetch('http://localhost:5000/api/report-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Raporti u dërgua me sukses!');
        setProblemType('Ndriçim Publik');
        setDescription('');
        setAddress('');
      } else {
        alert('Gabim gjatë dërgimit të raportit.');
      }
    } catch (error) {
      console.error('Gabim:', error);
      alert('Nuk u arrit të lidhemi me serverin.');
    }
  };

  return (
    <main className="services">
      <form onSubmit={handleSubmit}>
        <h2>Raporto një Problem</h2>

        <label>Lloji i Problemit</label>
        <select
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
        >
          <option value="Ndriçim Publik">Ndriçim Publik</option>
          <option value="Rruga e dëmtuar">Rruga e dëmtuar</option>
          <option value="Ujë apo kanalizim">Ujë apo kanalizim</option>
        </select>

        <label>Përshkrimi</label>
        <textarea
          rows={5}
          placeholder="Përshkruaj problemin..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Adresa</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Dërgo Raportin</button>
      </form>
    </main>
  );
};

export default RaportimProbleme;
