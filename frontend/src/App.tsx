import React, {useEffect} from 'react';
import "./App.css";
import Logo from './billbuddy.svg';
import ProductSection from "./components/ProductSection";
import PeopleSection from "./components/PeopleSection";
import ResultsSection from "./components/ResultsSection";
import Button from "./components/ui/Button";
import { clearPeople, setInitialState } from "./actions";
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Person, Product } from './Logic';
import { ActionType } from './reducers';

const URL = "http://127.0.0.1:8000/users/"
const App: React.FC = () => {
  const dispatch: Dispatch<ActionType> = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      const data = await result.json();
      const people = data.users.map((user: any) => new Person(user.id, user.name, user.items.map((item: any) => new Product(item.id, item.name, item.cost))));
      const initialState = {
        people: people,
        selectedPersonId: null,
        selectedProductId: null
      };
      dispatch(setInitialState(initialState));
    }
    fetchData();
  }, [dispatch]);

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
