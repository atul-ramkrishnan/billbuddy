import React, {useEffect} from 'react';
import "./App.css";
import Logo from './billbuddy.svg';
import ProductSection from "./components/ProductSection";
import PeopleSection from "./components/PeopleSection";
import ResultsSection from "./components/ResultsSection";
import Button from "./components/ui/Button";
import { clearPeople } from "./actions";
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // const handleClearPeople = () => {
  //   dispatch(clearPeople());
  // };
  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
        <img src={Logo} className="logo me-2" alt="Logo" />
        <h1 className="fw-bold mb-0">BillBuddy</h1>
      </header>
      <div className="row g-3">
        <aside className="sidenav col-sm-3" style={{ height: '100vh' }}>
          <h4>
            People{" "}
            <Button
              text="Clear"
              btnStyle="btn btn-sm btn-secondary"
              onClick={() => {}}
            />
          </h4>
          <PeopleSection />
        </aside>
        <aside className="sidenav col-sm-3" style={{ height: '100vh' }}>
          <h4>Product list</h4>
          <ProductSection />
        </aside>
        <main className="col-sm-6">
          <h2>RESULTS</h2>
          <ResultsSection />
        </main>
      </div>
    </div>
  );
};

export default App;
