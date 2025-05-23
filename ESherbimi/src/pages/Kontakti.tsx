import React, { useState } from 'react';

const Kontakt: React.FC = () => {
  const [formData, setFormData] = useState({
    emri: '',
    email: '',
    mesazhi: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock API call for demonstration
      // In a real app, you would call your API here
      setTimeout(() => {
        setSubmitted(true);
        setFormData({ emri: '', email: '', mesazhi: '' });
        
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1000);
    } catch (err) {
      alert('Dështoi dërgimi i mesazhit.');
    }
  };

  return (
    <main className="services">
      <h2>Na Kontaktoni</h2>
      {submitted ? (
        <div className="success-message" style={{
          padding: '20px',
          backgroundColor: '#dff0d8',
          color: '#3c763d',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p>Mesazhi u dërgua me sukses! Do t'ju kontaktojmë së shpejti.</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emri">Emri i plotë</label>
        <input 
          type="text" 
          id="emri"
          name="emri" 
          placeholder="Emri juaj" 
          value={formData.emri} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="email">Email-i</label>
        <input 
          type="email" 
          id="email"
          name="email" 
          placeholder="Email-i juaj" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="mesazhi">Mesazhi</label>
        <textarea 
          name="mesazhi"
          id="mesazhi" 
          placeholder="Mesazhi juaj" 
          value={formData.mesazhi} 
          onChange={handleChange} 
          required 
          rows={5}
        />
        
        <button type="submit">Dërgo</button>
      </form>
    </main>
  );
};

export default Kontakt;
