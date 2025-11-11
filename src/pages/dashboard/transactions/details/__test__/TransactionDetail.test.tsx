import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../../../test/test-utils'
import { TransactionDetail } from '../TransactionDetail'
import * as useTransactionModule from '../useTransaction'
import type { Transaction } from '../../list/useTransactions'
import type { UseQueryResult } from '@tanstack/react-query'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  }
})

const mockTransaction: Transaction = {
  id: '1',
  date: '2024-01-15T10:30:00Z',
  merchant: 'Test Merchant',
  amount: 100.5,
  type: 'credit',
  category: 'Food',
  description: 'Test description',
  account: 'Checking ****1234',
  status: 'completed',
  paymentMethod: 'Debit Card',
  referenceNumber: 'REF-001',
}

describe('TransactionDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  it('should show error message when there is an error', () => {
    vi.spyOn(useTransactionModule, 'useTransaction').mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'),
    } as UseQueryResult<Transaction, Error>)

    render(<TransactionDetail />)

    expect(screen.getByText(/failed to load transaction details/i)).toBeInTheDocument()
  })

  it('should show back button', () => {
    vi.spyOn(useTransactionModule, 'useTransaction').mockReturnValue({
      data: mockTransaction,
      isLoading: false,
      error: null,
    } as UseQueryResult<Transaction, Error>)

    render(<TransactionDetail />)

    const backButton = screen.getByText(/go back/i)
    expect(backButton).toBeInTheDocument()
  })

  it('should navigate back when back button is clicked', async () => {
    const userEvent = (await import('@testing-library/user-event')).default
    const user = userEvent.setup()
    vi.spyOn(useTransactionModule, 'useTransaction').mockReturnValue({
      data: mockTransaction,
      isLoading: false,
      error: null,
    } as UseQueryResult<Transaction, Error>)

    render(<TransactionDetail />)

    const backButton = screen.getByText(/go back/i)
    await user.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should display all transaction fields', () => {
    vi.spyOn(useTransactionModule, 'useTransaction').mockReturnValue({
      data: mockTransaction,
      isLoading: false,
      error: null,
    } as UseQueryResult<Transaction, Error>)

    render(<TransactionDetail />)

    // Use getAllByText since these labels may appear multiple times
    expect(screen.getAllByText(/merchant/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/date/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/amount/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/description/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/account/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/status/i).length).toBeGreaterThan(0)
  })

  it('should handle missing optional fields', () => {
    const transactionWithoutOptional: Transaction = {
      id: '2',
      date: '2024-01-16',
      merchant: 'Test Merchant 2',
      amount: 50,
      type: 'debit',
      category: 'Shopping',
    }

    vi.spyOn(useTransactionModule, 'useTransaction').mockReturnValue({
      data: transactionWithoutOptional,
      isLoading: false,
      error: null,
    } as UseQueryResult<Transaction, Error>)

    render(<TransactionDetail />)

    // May appear multiple times, so use getAllByText
    const merchants = screen.getAllByText('Test Merchant 2')
    expect(merchants.length).toBeGreaterThan(0)
    const amounts = screen.getAllByText('$50.00')
    expect(amounts.length).toBeGreaterThan(0)
  })
})

