import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import AddTransaction from '../components/AddTransaction'

describe('AddTransaction form', () => {
  it('renders expense and income toggle buttons', () => {
    render(<AddTransaction onAdd={vi.fn()} />)
    expect(screen.getByRole('button', { name: /expense/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /income/i })).toBeInTheDocument()
  })

  it('defaults to expense type', async () => {
    const onAdd = vi.fn()
    render(<AddTransaction onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText('0.00'), '100')
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'expense', amount: 100 })
    )
  })

  it('submits with income type when income is selected', async () => {
    const onAdd = vi.fn()
    render(<AddTransaction onAdd={onAdd} />)

    await userEvent.click(screen.getByRole('button', { name: /income/i }))
    await userEvent.type(screen.getByPlaceholderText('0.00'), '500')
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'income', amount: 500 })
    )
  })

  it('submits with expense type when expense is selected', async () => {
    const onAdd = vi.fn()
    render(<AddTransaction onAdd={onAdd} />)

    await userEvent.click(screen.getByRole('button', { name: /income/i }))
    await userEvent.click(screen.getByRole('button', { name: /expense/i }))
    await userEvent.type(screen.getByPlaceholderText('0.00'), '75')
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'expense', amount: 75 })
    )
  })

  it('does not submit when amount is empty', async () => {
    const onAdd = vi.fn()
    render(<AddTransaction onAdd={onAdd} />)

    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('does not submit when amount is zero', async () => {
    const onAdd = vi.fn()
    render(<AddTransaction onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText('0.00'), '0')
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('shows expense categories when expense is selected', () => {
    render(<AddTransaction onAdd={vi.fn()} />)
    expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument()
  })

  it('shows income categories when income is selected', async () => {
    render(<AddTransaction onAdd={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /income/i }))
    expect(screen.getByRole('option', { name: 'Salary' })).toBeInTheDocument()
  })
})
