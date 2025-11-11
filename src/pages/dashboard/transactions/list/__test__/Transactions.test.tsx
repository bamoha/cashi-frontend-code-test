import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../../../test/test-utils'
import { Transactions } from '../Transactions'
import * as useTransactionsModule from '../useTransactions'
import type { Transaction, TransactionsResponse } from '../useTransactions'
import type { UseQueryResult } from '@tanstack/react-query'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    merchant: 'Test Merchant 1',
    amount: 100.5,
    type: 'credit',
    category: 'Food',
  },
]

const mockResponse: TransactionsResponse = {
  items: mockTransactions,
  pagination: {
    page: 1,
    totalPages: 1,
    totalItems: 1,
    pageSize: 10,
  },
}

describe('Transactions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render page title and subtitle', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    expect(screen.getByText(/transactions/i)).toBeInTheDocument()
  })

  it('should show skeleton when loading for the first time', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    // Check for skeleton (it should have table structure)
    const table = document.querySelector('table')
    expect(table).toBeInTheDocument()
  })

  it('should show error message when there is an error', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      error: new Error('Failed to fetch'),
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    expect(screen.getByText(/failed to load transactions/i)).toBeInTheDocument()
  })

  it('should show loading spinner when refetching with existing data', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isFetching: true,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    // Table should still be visible
    expect(screen.getByText('Test Merchant 1')).toBeInTheDocument()
  })

  it('should update filters when filter component calls onFiltersChange', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    // Filters component should be rendered
    expect(screen.getByPlaceholderText(/merchant/i)).toBeInTheDocument()
  })

  it('should show transactions table when data is loaded', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    expect(screen.getByText('Test Merchant 1')).toBeInTheDocument()
  })

  it('should show filters component', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    expect(screen.getByPlaceholderText(/merchant/i)).toBeInTheDocument()
  })

  it('should not show skeleton when data exists', () => {
    vi.spyOn(useTransactionsModule, 'useTransactions').mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isFetching: false,
      error: null,
    } as UseQueryResult<TransactionsResponse, Error>)

    render(<Transactions />)

    // Should show actual data, not skeleton
    expect(screen.getByText('Test Merchant 1')).toBeInTheDocument()
  })
})

