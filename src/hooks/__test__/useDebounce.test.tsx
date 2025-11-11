import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    expect(result.current).toBe('initial')

    // Change value
    act(() => {
      rerender({ value: 'updated', delay: 500 })
    })
    expect(result.current).toBe('initial') // Should still be initial

    // Fast-forward time
    await act(async () => {
      vi.advanceTimersByTime(500)
    })
    
    expect(result.current).toBe('updated')
  })

  it('should use custom delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      }
    )

    act(() => {
      rerender({ value: 'updated', delay: 1000 })
    })
    expect(result.current).toBe('initial')

    await act(async () => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe('initial') // Still initial after 500ms

    await act(async () => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe('updated')
  })

  it('should cancel previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    act(() => {
      rerender({ value: 'change1', delay: 500 })
    })
    await act(async () => {
      vi.advanceTimersByTime(200)
    })

    act(() => {
      rerender({ value: 'change2', delay: 500 })
    })
    await act(async () => {
      vi.advanceTimersByTime(200)
    })

    act(() => {
      rerender({ value: 'change3', delay: 500 })
    })
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('change3')
  })

  it('should handle number values', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 500 },
      }
    )

    expect(result.current).toBe(0)

    act(() => {
      rerender({ value: 100, delay: 500 })
    })
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe(100)
  })

  it('should handle default delay of 500ms', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    act(() => {
      rerender({ value: 'updated' })
    })
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated')
  })
})

