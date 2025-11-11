import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle conditional classes', () => {
    const condition = false
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo baz')
    const condition2 = true
    expect(cn('foo', condition2 && 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    expect(cn('foo', null, 'bar')).toBe('foo bar')
  })

  it('should merge Tailwind classes correctly', () => {
    // tailwind-merge should handle conflicting classes
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4') // px-4 should override px-2
  })

  it('should handle arrays of classes', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('should handle objects with conditional classes', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('should handle mixed inputs', () => {
    expect(cn('foo', ['bar', 'baz'], { qux: true })).toBe('foo bar baz qux')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null, undefined, false)).toBe('')
  })

  it('should handle Tailwind class conflicts', () => {
    // px-4 should override px-2
    const result = cn('px-2 py-2', 'px-4')
    expect(result).toBe('py-2 px-4')
  })
})

