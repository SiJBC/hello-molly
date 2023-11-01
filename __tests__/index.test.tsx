import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page' // Adjust the import path according to your project structure

test('renders "Hello World ~" inside h2', () => {
  render(<Home />)
  const headingElement = screen.getByRole('heading', { level: 2 })
  expect(headingElement).toHaveTextContent('Hello World ~')
})
