import { useState } from 'react'

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Other'],
  expense: ['Food', 'Rent', 'Transport', 'Entertainment', 'Other'],
}

const today = () => new Date().toISOString().split('T')[0]

export default function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    date: today(),
    note: '',
  })

  function handleTypeChange(type) {
    setForm(f => ({ ...f, type, category: CATEGORIES[type][0] }))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!amount || amount <= 0) return
    onAdd({ ...form, amount })
    setForm({ type: form.type, amount: '', category: form.category, date: today(), note: '' })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Type toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 w-fit">
          {['expense', 'income'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`px-5 py-2 text-sm font-medium capitalize transition-colors ${
                form.type === t
                  ? t === 'income'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
            >
              {CATEGORIES[form.type].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium uppercase tracking-wide">Note (optional)</label>
            <input
              type="text"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="e.g. Grocery run"
              maxLength={60}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="self-start bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  )
}
