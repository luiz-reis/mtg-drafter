import React from 'react';
import './App.css';
import Pack from './Pack';
import Deck from './Deck';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }

  pickCard(card) {
    this.setState((prevState) => ({
      cards: [ ...prevState.cards, card ]
    }));
  }

  render() {
    return (
      <div className="App App-header">
        <header>
          <h1>Pack 1</h1>
          <div style={{ position: "fixed", left: '5%', top: '10%' }}>
            <span style={{ display: "block" }}>Luiz</span>
            <span>Pack 3</span>
          </div>
          <div style={{ position: "fixed", left: '90%', top: '10%' }}>
            <span style={{ display: "block" }}>Rob</span>
            <span>Pack 3</span>
          </div>
        </header>

        <main>
          <Pack name="DM Pack 1.csv" pickCard={this.pickCard.bind(this)} />
          <Deck cards={this.state.cards} />
        </main>
      </div>
    );
  }
}

export default App;
