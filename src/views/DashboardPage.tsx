import * as React from 'react';
import DashboardRouter from './DashboardRouter';
import Transaction from '../models/Transaction';
import Card from '../models/Card';
import { bindActionCreators } from 'redux';
import { AppState } from '../redux/AppState';
import { connect } from 'react-redux';
import {
    actionAddCard, actionChangeCardBalance, actionDeleteCard, actionEditCard,
    actionFetchCards
} from '../redux/CardsActions';
import { actionAddTran, actionDeleteTran, actionEditTran, actionFetchTrans } from '../redux/TransactionsActions';

interface DashboardProps {
    cards: Array<Card>;
    trans: Array<Transaction>;

    fetchCards: Function;
    addCard: Function;
    editCard: Function;
    deleteCard: Function;
    fetchTrans: Function;
    addTran: Function;
    editTran: Function;
    deleteTran: Function;
    changeCardBalance: Function;
}

class DashboardPage extends React.Component<DashboardProps> {
    componentWillMount() {
        this.props.fetchTrans();
        this.props.fetchCards();
    }

    /*transactions methods*/
    handleTranAdd(tran: Transaction) {
        this.props.addTran(tran);
        this.changeCardBalance(tran);
    }

    handleTranEdit(tran: Transaction, history: any) {
        this.props.editTran(tran);
        alert('transaction was updated');
        history.push('/dashboard');
    }

    handleTranDelete(tran: Transaction, history: any) {
        this.props.deleteTran(tran);
        alert('Transaction has been deleted');
        history.push('/dashboard');
    }

    /*payment card methods*/
    changeCardBalance(tran: Transaction) {
        let card = this.props.cards.filter((c: any) => {return c.id === tran.card; })[0];
        if (!card) { return; }
        let amount = Number(card.amount) + Number(tran.amount)
        this.props.changeCardBalance(card.id, amount);
    }

    handleCardAdd(card: Card) {
        this.props.addCard(card);
    }

    handleCardEdit(card: Card, history: any) {
        this.props.editCard(card);
        alert('Payment card has been updated');
        history.push('/dashboard/cards');
    }

    handleCardDelete(card: Card, history: any) {
        this.props.deleteCard(card);
        alert('Payment card has been deleted');
        history.push('/dashboard/cards');
    }

    render() {
        return (
            <div>
                <h1>Bookkeeping Application</h1>
                <DashboardRouter
                    trans={this.props.trans}
                    cards={this.props.cards}
                    onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}
                    onTranEdit={(tran: Transaction, history: any) => this.handleTranEdit(tran, history)}
                    onTranDelete={(tran: Transaction, history: any) => this.handleTranDelete(tran, history)}
                    onCardAdd={(card: Card) => this.handleCardAdd(card)}
                    onCardEdit={(card: Card, history: any ) => this.handleCardEdit(card, history)}
                    onCardDelete={(card: Card, history: any) => this.handleCardDelete(card, history)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        cards: state.cards,
        trans: state.trans
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCards: bindActionCreators(actionFetchCards, dispatch),
        addCard: bindActionCreators(actionAddCard, dispatch),
        editCard: bindActionCreators(actionEditCard, dispatch),
        deleteCard: bindActionCreators(actionDeleteCard, dispatch),
        fetchTrans: bindActionCreators(actionFetchTrans, dispatch),
        addTran: bindActionCreators(actionAddTran, dispatch),
        editTran: bindActionCreators(actionEditTran, dispatch),
        deleteTran: bindActionCreators(actionDeleteTran, dispatch),
        changeCardBalance: bindActionCreators(actionChangeCardBalance, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage as any);