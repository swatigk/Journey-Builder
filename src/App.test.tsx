import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphFixture } from './test/fixtures/graphFixture'
import App from './App'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('lets the user map a field from an upstream form', async () => {
    const user = userEvent.setup()

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => graphFixture,
      })),
    )

    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: /Form A/i,
        }),
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Form D/i }))
    await user.click(screen.getByRole('button', { name: /Dynamic Checkbox Group/i }))
    await user.click(screen.getByRole('button', { name: 'Map Form B.name' }))
    await user.click(screen.getByRole('button', { name: 'Select' }))

    await waitFor(() => {
      expect(screen.getByText('Form B.name')).toBeInTheDocument()
    })
  })
})
