import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTransactions } from '../hooks/useTransactions'

// Isolate localStorage between tests
beforeEach(() => {
  localStorage.clear()
})

describe('addTransaction', () => {
  it('saves an expense transaction with type expense', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 50, category: 'Food', date: '2024-01-01', note: '' })
    })

    expect(result.current.transactions).toHaveLength(1)
    expect(result.current.transactions[0].type).toBe('expense')
  })

  it('saves an income transaction with type income', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 1000, category: 'Salary', date: '2024-01-01', note: '' })
    })

    expect(result.current.transactions).toHaveLength(1)
    expect(result.current.transactions[0].type).toBe('income')
  })

  it('does not change expense type to income', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 200, category: 'Rent', date: '2024-01-01', note: '' })
    })

    expect(result.current.transactions[0].type).not.toBe('income')
  })
})

describe('totalIncome and totalExpenses', () => {
  it('counts expense amount in totalExpenses, not totalIncome', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 100, category: 'Food', date: '2024-01-01', note: '' })
    })

    expect(result.current.totalExpenses).toBe(100)
    expect(result.current.totalIncome).toBe(0)
  })

  it('counts income amount in totalIncome, not totalExpenses', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 500, category: 'Salary', date: '2024-01-01', note: '' })
    })

    expect(result.current.totalIncome).toBe(500)
    expect(result.current.totalExpenses).toBe(0)
  })

  it('sums multiple transactions by type correctly', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 1000, category: 'Salary', date: '2024-01-01', note: '' })
      result.current.addTransaction({ type: 'expense', amount: 200, category: 'Rent', date: '2024-01-01', note: '' })
      result.current.addTransaction({ type: 'expense', amount: 50, category: 'Food', date: '2024-01-01', note: '' })
    })

    expect(result.current.totalIncome).toBe(1000)
    expect(result.current.totalExpenses).toBe(250)
  })
})

describe('balance calculation', () => {
  it('balance equals income minus expenses', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 1000, category: 'Salary', date: '2024-01-01', note: '' })
      result.current.addTransaction({ type: 'expense', amount: 300, category: 'Rent', date: '2024-01-01', note: '' })
    })

    expect(result.current.balance).toBe(700)
  })

  it('balance decreases when an expense is added', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 1000, category: 'Salary', date: '2024-01-01', note: '' })
    })
    const balanceBefore = result.current.balance

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 200, category: 'Food', date: '2024-01-01', note: '' })
    })

    expect(result.current.balance).toBeLessThan(balanceBefore)
    expect(result.current.balance).toBe(800)
  })

  it('balance increases when income is added', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 500, category: 'Salary', date: '2024-01-01', note: '' })
    })
    const balanceBefore = result.current.balance

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 200, category: 'Freelance', date: '2024-01-01', note: '' })
    })

    expect(result.current.balance).toBeGreaterThan(balanceBefore)
    expect(result.current.balance).toBe(700)
  })

  it('balance is zero when income equals expenses', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'income', amount: 500, category: 'Salary', date: '2024-01-01', note: '' })
      result.current.addTransaction({ type: 'expense', amount: 500, category: 'Rent', date: '2024-01-01', note: '' })
    })

    expect(result.current.balance).toBe(0)
  })
})

describe('deleteTransaction', () => {
  it('removes a transaction by id', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 100, category: 'Food', date: '2024-01-01', note: '' })
    })

    const id = result.current.transactions[0].id

    act(() => {
      result.current.deleteTransaction(id)
    })

    expect(result.current.transactions).toHaveLength(0)
  })

  it('updates totals after deletion', () => {
    const { result } = renderHook(() => useTransactions())

    act(() => {
      result.current.addTransaction({ type: 'expense', amount: 100, category: 'Food', date: '2024-01-01', note: '' })
    })

    const id = result.current.transactions[0].id

    act(() => {
      result.current.deleteTransaction(id)
    })

    expect(result.current.totalExpenses).toBe(0)
    expect(result.current.balance).toBe(0)
  })
})
