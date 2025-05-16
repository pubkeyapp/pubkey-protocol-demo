import { describe, expect, it } from 'vitest'
import { foo } from './foo'

describe('foo', () => {
  it('should ', () => {
    // ARRANGE
    const value = 'bar'
    // ACT
    const result = foo(value)
    // ASSERT
    expect(result).toBe(`foo ${value}`)
  })
})
