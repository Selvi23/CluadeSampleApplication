function fmt(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function fmtDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-300 text-sm">
        No transactions yet. Add one above.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-semibold text-gray-700 mb-2">Transactions</h2>
      {transactions.map(t => (
        <div
          key={t.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between gap-4"
        >
          {/* Left: category + date + note */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                t.type === 'income' ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-700 truncate">{t.category}</div>
              <div className="text-xs text-gray-400 truncate">
                {fmtDate(t.date)}{t.note ? ` · ${t.note}` : ''}
              </div>
            </div>
          </div>

          {/* Right: amount + delete */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span
              className={`text-sm font-semibold ${
                t.type === 'income' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
            </span>
            <button
              onClick={() => onDelete(t.id)}
              className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
              title="Delete"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
