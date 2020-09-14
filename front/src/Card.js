import React from 'react';
import Axios from 'axios';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showCard: false };
    }

    async getImg() {
        const response = await Axios.get('https://api.scryfall.com/cards/named', {
            responseType: 'blob',
            params: {
                exact: this.props.name,
                set: '2xm',
                format: 'image',
                version: 'normal'
            }
        });
        this.setState({ img: response.data })
    }

    async componentDidMount() {
        await this.getImg()
    }

    cardClick() {
        if(typeof(this.props.handleClick) !== 'function') return;

        const card = {
            name: this.props.name,
            img: this.state.img
            
        };
        this.props.handleClick(card);
    }

    render() {
        return (
            <div>
                <span style={{cursor: 'pointer'}}
                    onClick={this.cardClick.bind(this)}
                    onMouseEnter={() => this.setState({ showCard: true })}
                    onMouseLeave={() => this.setState({ showCard: false })}>
                    {this.props.name}
                </span>

                {this.state.showCard && this.state.img && <img className='cardImg' alt={this.props.name} src={URL.createObjectURL(this.state.img)} />}
            </div>
        )
    }
}

export default Card;
