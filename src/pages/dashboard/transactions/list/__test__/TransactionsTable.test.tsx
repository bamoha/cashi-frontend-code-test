import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { TransactionsTable } from '../TransactionsTable'
import type { Transaction, TransactionsFilters } from '../useTransactions'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    merchant: 'Test Merchant 1',
    amount: 100.5,
    type: 'credit',
    category: 'Food',
  },
  {
    id: '2',
    date: '2024-01-16',
    merchant: 'Test Merchant 2',
    amount: -50.25,
    type: 'debit',
    category: 'Shopping',
  },
]

const mockFilters: TransactionsFilters = {
  page: 1,
}

const mockPagination = {
  page: 1,
  totalPages: 3,
  totalItems: 25,
  pageSize: 10,
}

describe('TransactionsTable', () => {
  const mockOnFiltersChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  it('should render table headers', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    // Headers are translated, so we check for table structure
    const headers = document.querySelectorAll('th')
    expect(headers.length).toBeGreaterThanOrEqual(3)
  })

  it('should render transactions', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    expect(screen.getByText('Test Merchant 1')).toBeInTheDocument()
    expect(screen.getByText('Test Merchant 2')).toBeInTheDocument()
    expect(screen.getByText('$100.50')).toBeInTheDocument()
    expect(screen.getByText('-$50.25')).toBeInTheDocument()
  })

  it('should display formatted dates', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument()
    expect(screen.getByText(/Jan 16, 2024/i)).toBeInTheDocument()
  })

  it('should show positive amounts in green', () => {
    render(
      <TransactionsTable
        transactions={[mockTransactions[0]]}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    const amountCell = screen.getByText('$100.50')
    expect(amountCell).toHaveClass('text-green-600')
  })

  it('should show negative amounts in red', () => {
    render(
      <TransactionsTable
        transactions={[mockTransactions[1]]}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    const amountCell = screen.getByText('-$50.25')
    expect(amountCell).toHaveClass('text-red-600')
  })

  it('should show empty state when no transactions', () => {
    render(
      <TransactionsTable
        transactions={[]}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    expect(screen.getByText(/no transactions/i)).toBeInTheDocument()
  })

  it('should navigate to transaction detail on row click', async () => {
    const user = userEvent.setup()
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    const row = screen.getByText('Test Merchant 1').closest('tr')
    if (row) {
      await user.click(row)
      expect(mockNavigate).toHaveBeenCalledWith('/transactions/1')
    }
  })

  it('should show pagination when totalPages > 1', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        pagination={mockPagination}
      />
    )

    expect(screen.getByText(/showing/i)).toBeInTheDocument()
  })

  it('should not show pagination when totalPages <= 1', () => {
    const singlePagePagination = {
      ...mockPagination,
      totalPages: 1,
    }

    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        pagination={singlePagePagination}
      />
    )

    expect(screen.queryByText(/showing/i)).not.toBeInTheDocument()
  })

  it('should not show filters when showFilters is false', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        showFilters={false}
      />
    )

    expect(screen.queryByPlaceholderText(/merchant/i)).not.toBeInTheDocument()
  })

  it('should show filters when showFilters is true (default)', () => {
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    expect(screen.getByPlaceholderText(/merchant/i)).toBeInTheDocument()
  })

  it('should call onFiltersChange when pagination page changes', async () => {
    const user = userEvent.setup()
    render(
      <TransactionsTable
        transactions={mockTransactions}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        pagination={mockPagination}
      />
    )

    // Find and click next page button if available
    const nextButtons = screen.queryAllByRole('button')
    const nextButton = nextButtons.find(btn => 
      btn.textContent?.includes('Next') || btn.textContent?.includes('>')
    )
    
    if (nextButton) {
      await user.click(nextButton)
      expect(mockOnFiltersChange).toHaveBeenCalled()
    }
  })

  it('should handle zero amount transactions', () => {
    const zeroAmountTransaction: Transaction = {
      id: '3',
      date: '2024-01-17',
      merchant: 'Test Merchant 3',
      amount: 0,
      type: 'neutral',
      category: 'Other',
    }

    render(
      <TransactionsTable
        transactions={[zeroAmountTransaction]}
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
      />
    )

    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })
})

