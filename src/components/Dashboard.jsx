function fmt(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function SummaryCard({ label, amount, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-1">
      <span className="text-sm text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-semibold ${color}`}>{fmt(amount)}</span>
    </div>
  )
}

export default function Dashboard({ balance, totalIncome, totalExpenses }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-1 sm:col-span-1">
        <span className="text-sm text-gray-400 font-medium uppercase tracking-wide">Balance</span>
        <span className={`text-3xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
          {fmt(balance)}
        </span>
      </div>
      <SummaryCard label="Income" amount={totalIncome} color="text-emerald-600" />
      <SummaryCard label="Expenses" amount={totalExpenses} color="text-red-500" />
    </div>
  )
}
