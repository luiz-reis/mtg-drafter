import React from 'react';
import Card from './Card';

class Deck extends React.Component {    
    renderCards() {
        if(!this.props.cards) return;

        return this.props.cards.map(card => <Card name={card.name}/>)
    }

    render() {
        return (
            <div className='deckCards'>
                {this.renderCards()}
            </div>
        );
    }
}

export default Deck;
