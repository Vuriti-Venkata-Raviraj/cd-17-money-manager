// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transaction, onDelete} = props
  const {id, title, amount, type} = transaction

  const deleted = () => {
    onDelete(id)
  }

  return (
    <li className="transaction-item">
      <p className="entry-style">{title}</p>
      <p className="entry-style">{amount}</p>
      <p className="entry-style">{type}</p>
      <div>
        <button
          data-testid="delete"
          className="delete-btn"
          type="button"
          onClick={deleted}
        >
          <img
            alt="delete"
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
