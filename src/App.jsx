import { useTransactions } from './hooks/useTransactions'
import Dashboard from './components/Dashboard'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'

export default function App() {
  const { transactions, addTransaction, deleteTransaction, balance, totalIncome, totalExpenses } =
    useTransactions()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Finance</h1>
          <p className="text-sm text-gray-400 mt-1">Track your income and expenses</p>
        </div>

        <Dashboard balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} />
        <AddTransaction onAdd={addTransaction} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </div>
  )
}
