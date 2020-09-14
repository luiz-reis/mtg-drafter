import React from 'react';
import Card from './Card';
import Papa from 'papaparse';

class Pack extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cards: [] };
    }

    async fetchCsv(filename) {
        const response = await fetch(filename);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result.value);
        return csv;
    }

    async componentDidMount() {
        const csv = await this.fetchCsv('packs/' + this.props.name);
        const { data } = Papa.parse(csv);
        this.setState({ cards: data.slice(1) });
    }

    handleCardClick(card) {
        this.setState({ selectedCard: { name: card.name, img: card.img } });
        if(typeof(this.props.pickCard) !== 'function') return;

        this.props.pickCard(card);
    }

    renderSelectedCard() {
        const { selectedCard: { name, img } } = this.state;

        return (
            <div style={{ float: 'left' }}>
                <h2>Carta Selecionada</h2>
                <span style={{ display: 'inherit' }}>{name}</span>
                <img className='selectedImg' alt={name} src={URL.createObjectURL(img)} />
            </div>
        )

    }

    renderCards() {
        if (this.state.cards.length === 0) return;

        return this.state.cards.map(card =>
            <li className='liPacks' key={card[0]}>
                <Card name={card[0]} handleClick={this.handleCardClick.bind(this)} />
            </li>);
    }

    render() {
        return (
            <div>
                {this.state.selectedCard && this.renderSelectedCard()}
                <div style={{ float: 'right' }}>
                    <ul className='ulPacks'>
                        {this.renderCards()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Pack;
