import { describe, it, expect, vi } from 'vitest'
import { formatCurrency, formatDate, getTimeBasedGreeting } from '../utils'
import { Sun, SunMedium, Moon, Sunrise } from 'lucide-react'

describe('formatCurrency', () => {
  it('should format positive amounts correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00')
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('should format negative amounts correctly', () => {
    expect(formatCurrency(-100)).toBe('-$100.00')
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
  })

  it('should format with custom currency', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100.00')
    expect(formatCurrency(100, 'GBP')).toBe('£100.00')
  })

  it('should handle decimal places correctly', () => {
    expect(formatCurrency(100.5)).toBe('$100.50')
    expect(formatCurrency(100.999)).toBe('$101.00')
  })
})

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const date = '2024-01-15'
    const formatted = formatDate(date)
    expect(formatted).toMatch(/Jan/)
    expect(formatted).toMatch(/15/)
    expect(formatted).toMatch(/2024/)
  })

  it('should handle different date formats', () => {
    const date1 = '2024-12-25'
    const formatted1 = formatDate(date1)
    expect(formatted1).toMatch(/Dec/)
    expect(formatted1).toMatch(/25/)

    const date2 = '2023-06-01'
    const formatted2 = formatDate(date2)
    expect(formatted2).toMatch(/Jun/)
    expect(formatted2).toMatch(/1/)
  })

  it('should handle ISO date strings', () => {
    const date = '2024-03-20T10:30:00Z'
    const formatted = formatDate(date)
    expect(formatted).toMatch(/Mar/)
    expect(formatted).toMatch(/20/)
  })
})

describe('getTimeBasedGreeting', () => {
  const mockT = vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'dashboard.goodMorning': 'Good Morning',
      'dashboard.goodAfternoon': 'Good Afternoon',
      'dashboard.goodEvening': 'Good Evening',
      'dashboard.goodNight': 'Good Night',
    }
    return translations[key] || key
  })

  it('should return morning greeting for hours 5-11', () => {
    const result5 = getTimeBasedGreeting(5, mockT)
    expect(result5.text).toBe('Good Morning')
    expect(result5.icon).toBe(Sunrise)

    const result11 = getTimeBasedGreeting(11, mockT)
    expect(result11.text).toBe('Good Morning')
    expect(result11.icon).toBe(Sunrise)
  })

  it('should return afternoon greeting for hours 12-16', () => {
    const result12 = getTimeBasedGreeting(12, mockT)
    expect(result12.text).toBe('Good Afternoon')
    expect(result12.icon).toBe(SunMedium)

    const result16 = getTimeBasedGreeting(16, mockT)
    expect(result16.text).toBe('Good Afternoon')
    expect(result16.icon).toBe(SunMedium)
  })

  it('should return evening greeting for hours 17-20', () => {
    const result17 = getTimeBasedGreeting(17, mockT)
    expect(result17.text).toBe('Good Evening')
    expect(result17.icon).toBe(Sun)

    const result20 = getTimeBasedGreeting(20, mockT)
    expect(result20.text).toBe('Good Evening')
    expect(result20.icon).toBe(Sun)
  })

  it('should return night greeting for hours 21-4', () => {
    const result21 = getTimeBasedGreeting(21, mockT)
    expect(result21.text).toBe('Good Night')
    expect(result21.icon).toBe(Moon)

    const result23 = getTimeBasedGreeting(23, mockT)
    expect(result23.text).toBe('Good Night')
    expect(result23.icon).toBe(Moon)

    const result0 = getTimeBasedGreeting(0, mockT)
    expect(result0.text).toBe('Good Night')
    expect(result0.icon).toBe(Moon)

    const result4 = getTimeBasedGreeting(4, mockT)
    expect(result4.text).toBe('Good Night')
    expect(result4.icon).toBe(Moon)
  })

  it('should handle edge cases for time boundaries', () => {
    const mockT = vi.fn((key: string) => {
      const translations: Record<string, string> = {
        'dashboard.goodMorning': 'Good Morning',
        'dashboard.goodAfternoon': 'Good Afternoon',
        'dashboard.goodEvening': 'Good Evening',
        'dashboard.goodNight': 'Good Night',
      }
      return translations[key] || key
    })

    // Test boundary at 5 (morning start)
    const result5 = getTimeBasedGreeting(5, mockT)
    expect(result5.text).toBe('Good Morning')

    // Test boundary at 4 (night end)
    const result4 = getTimeBasedGreeting(4, mockT)
    expect(result4.text).toBe('Good Night')

    // Test boundary at 12 (afternoon start)
    const result12 = getTimeBasedGreeting(12, mockT)
    expect(result12.text).toBe('Good Afternoon')

    // Test boundary at 17 (evening start)
    const result17 = getTimeBasedGreeting(17, mockT)
    expect(result17.text).toBe('Good Evening')

    // Test boundary at 21 (night start)
    const result21 = getTimeBasedGreeting(21, mockT)
    expect(result21.text).toBe('Good Night')
  })

  it('should format currency with different locales', () => {
    // Note: formatCurrency uses en-US locale by default
    expect(formatCurrency(1000.5, 'USD')).toBe('$1,000.50')
    expect(formatCurrency(1000.5, 'EUR')).toContain('1,000.50')
  })

  it('should format dates consistently', () => {
    const date1 = '2024-01-15'
    const date2 = '2024-01-15T10:30:00Z'
    
    const formatted1 = formatDate(date1)
    const formatted2 = formatDate(date2)
    
    // Both should format to the same date (ignoring time)
    expect(formatted1).toMatch(/Jan.*15.*2024/)
    expect(formatted2).toMatch(/Jan.*15.*2024/)
  })
})

