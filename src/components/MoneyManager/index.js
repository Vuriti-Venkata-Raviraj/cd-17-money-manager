import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

// eslint-disable-next-line
const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: 'Income',
    transactions: [],
  }

  onAdd = e => {
    e.preventDefault()
    const {title, amount, type} = this.state
    const transaction = {
      id: v4(),
      title,
      amount,
      type,
    }
    if (type === 'Income') {
      this.setState(prev => ({
        income: prev.income + parseInt(amount),
        balance: prev.balance + parseInt(amount),
      }))
    } else if (type === 'Expenses') {
      this.setState(prev => ({
        expenses: prev.expenses + parseInt(amount),
        balance: prev.balance - parseInt(amount),
      }))
    }

    this.setState(prevTransaction => ({
      transactions: [...prevTransaction.transactions, transaction],
      title: '',
      amount: '',
    }))
  }

  onDelete = id => {
    const {transactions} = this.state
    const transaction = transactions.find(prev => prev.id === id)
    if (transaction.type === 'Income') {
      this.setState(prev => ({
        income: prev.income - parseInt(transaction.amount),
        balance: prev.balance - parseInt(transaction.amount),
        transactions: prev.transactions.filter(tran => tran.id !== id),
      }))
    } else if (transaction.type === 'Expenses') {
      this.setState(prev => ({
        expenses: prev.expenses - parseInt(transaction.amount),
        balance: prev.balance + parseInt(transaction.amount),
        transactions: prev.transactions.filter(tran => tran.id !== id),
      }))
    }
  }

  titleChanged = e => {
    this.setState({title: e.target.value})
  }

  amountChanged = e => {
    this.setState({amount: e.target.value})
  }

  optionChanged = e => {
    const foundType = transactionTypeOptions.find(
      transactionData => transactionData.optionId === e.target.value,
    )
    this.setState({type: foundType.displayText})
    console.log(foundType.displayText)
  }

  render() {
    const {balance, income, expenses, title, amount, transactions} = this.state

    return (
      <div className="main-container">
        <div className="user-container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="money-manager">Money Manager</span>
          </p>
        </div>

        <div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>

        <div className="make-transactions-container">
          <form className="add-transaction" type="submit" onSubmit={this.onAdd}>
            <h1 className="add-transaction-title">Add Transaction</h1>
            <label className="label-title">
              TITLE <br />
              <input
                value={title}
                className="input-style"
                placeholder="TITLE"
                onChange={this.titleChanged}
              />
            </label>
            <label className="label-title">
              AMOUNT
              <br />
              <input
                value={amount}
                className="input-style"
                placeholder="AMOUNT"
                onChange={this.amountChanged}
              />
            </label>
            <label className="label-title">
              TYPE
              <br />
              <select
                id="type"
                name="TYPE"
                className="input-style"
                onChange={this.optionChanged}
              >
                {transactionTypeOptions.map(transactionType => (
                  <option
                    value={transactionType.optionId}
                    key={transactionType.optionId}
                  >
                    {transactionType.displayText}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="add">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="add-transaction-title">History</h1>
            <div className="table-container">
              <div>
                <div className="table-row">
                  <p className="entry header">Title</p>
                  <p className="entry header">Amount</p>
                  <p className="entry header">Type</p>
                  <p className="entry"> </p>
                </div>
              </div>
              <div>
                {transactions.map(each => (
                  <TransactionItem
                    transaction={each}
                    key={each.id}
                    onDelete={this.onDelete}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
