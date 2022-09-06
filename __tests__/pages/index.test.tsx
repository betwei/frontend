import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// Components
import Layout from '../../src/components/Layout/Layout'
import Home from '../../pages/index'

describe('Home', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<Layout><Home /></Layout>)
    const btnCW = component.getByText('Conectar Wallet')

    // act(() => { fireEvent.click(btnCW) })
  })

  // it('renders a heading', () => {
  //   const heading = screen.getByRole('heading', {
  //     name: /Apuestas - Platzi/i,
  //   })
  //   expect(heading).toBeInTheDocument()
  // })

  it('Renders a start content', () => {
    expect(component.getByText('Tú origanizas, Tú ganas')).toBeInTheDocument()
    expect(component.getByText('BetWei')).toBeInTheDocument()
    expect(component.getByText(
      'Usa el poder de blockchain a tu favor, juega en equipo.'
    )).toBeInTheDocument()
    // expect(component.getByText('Obtener random')).toBeInTheDocument()
  })
})