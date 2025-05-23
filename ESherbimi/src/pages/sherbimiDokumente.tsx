import React, { useState } from 'react';


const SherbimiDokumente: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      full_name: fullName,
      document_type: documentType,
      birth_date: birthDate,
      email,
    };

    try {
      const response = await fetch('http://localhost:5000/api/apply-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Aplikimi u dërgua me sukses!');
        setFullName('');
        setDocumentType('');
        setBirthDate('');
        setEmail('');
      } else {
        alert('Gabim gjatë aplikimit.');
      }
    } catch (error) {
      console.error('Gabim:', error);
      alert('Serveri nuk u përgjigj.');
    }
  };

  return (
    <main className="services">
      <form onSubmit={handleSubmit}>
        <h2>Aplikim për Dokument</h2>

        <label>Emri dhe Mbiemri</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label>Tipi i dokumentit</label>
        <select
          required
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="">Zgjedh një</option>
          <option value="ID">Letërnjoftim</option>
          <option value="Pasaportë">Pasaportë</option>
          <option value="Certifikatë">Certifikatë Lindjeje</option>
        </select>

        <label>Data e lindjes</label>
        <input
          type="date"
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Dërgo Aplikimin</button>
      </form>
    </main>
  );
};

export default SherbimiDokumente;
