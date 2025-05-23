import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <section className="hero animated-fade">
        <h1>E-Shërbimi Qytetar</h1>
        <p>Platforma digjitale për qasje të shpejtë dhe të lehtë në shërbimet publike</p>
        <Link to="/sherbimi-dokumente" className="btn">Apliko Tani</Link>
      </section>

      <section className="services">
        <h2>Shërbimet e disponueshme</h2>
        <div className="cards">
          <div className="card animated-slide">
            <div className="card-icon">📄</div>
            <h3>Aplikim për Dokumente</h3>
            <p>Apliko online për letërnjoftim, pasaportë ose certifikata të tjera personale.</p>
            <Link className="card-link" to="/sherbimi-dokumente">Apliko Tani &rarr;</Link>
          </div>
          
          <div className="card animated-slide">
            <div className="card-icon">🏦</div>
            <h3>Pagesa Online</h3>
            <p>Kryej pagesat e faturave komunale, tatimeve dhe taksave të tjera shtetërore.</p>
            <Link className="card-link" to="/pagesa-online">Paguaj Tani &rarr;</Link>
          </div>
          
          <div className="card animated-slide">
            <div className="card-icon">📅</div>
            <h3>Rezervim Takimi</h3>
            <p>Rezervo takim në institucionet publike pa pritur në radhë.</p>
            <Link className="card-link" to="/rezervim-takimi">Rezervo &rarr;</Link>
          </div>
          
          <div className="card animated-slide">
            <div className="card-icon">⚠️</div>
            <h3>Raportim Probleme</h3>
            <p>Raporto probleme të infrastrukturës urbane dhe shërbimeve publike.</p>
            <Link className="card-link" to="/raportim-probleme">Raporto &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
