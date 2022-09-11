import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

// Components
import Card from '../card/Card'
import Input from '../input/Input'
import Button from '../buttons/Button'

// Contracts
import useContract from '../../../hooks/useContract'

// Types
import { IRandomForm } from '../../../interfaces/randomForm.interface'
import { IModal } from '../../../interfaces/modal.interface'
import { ISendSuccess } from '../../../interfaces/contract.interface'

// Hooks
import { useShowModal } from '../../../hooks/useModal'
import useLoader from '../../../hooks/useLoader'

import styles from './RandomForm.module.scss'

function RandomForm({ onSave, className }: IRandomForm) {
  const { account } = useWeb3React()
  const contract = useContract()
  const { setLoader } = useLoader()
  const [description, setDescription] = useState('')
  const [betValue, setBetValue] = useState(0.0001)
  const [players, setPlayers] = useState(2)
  const [descriptionErr, setDescriptionErr] = useState('')
  const [isTouched, setIsTouched] = useState(false)
  const [betValueErr, setBetValueErr] = useState('')
  const [playersErr, setPlayersErr] = useState('')

  const [modalVals, setModalVals] = useState({} as IModal)

  const modal = useShowModal(modalVals)

  useEffect(() => {
    if (isTouched && description === '') setDescriptionErr('Debes ingresar una descripción')
    else setDescriptionErr('')
    if (betValue < 0.0001) setBetValueErr('Debes hacer una apueste superior a 0.0001 ETH')
    else setBetValueErr('')
    if (players < 2) setPlayersErr('Un juego al menos debe tener 2 jugadores')
    else setPlayersErr('')
  }, [isTouched, description, betValue, players])

  useEffect(() => {
    setLoader(false)
    if (modalVals.title && modalVals.children) modal()
  }, [modalVals])

  const handleDescripcionChange = (value: string) => {
    setIsTouched(true)
    setDescription(value)
  }

  const handleCreateGame = async () => {
    setLoader(true)
    if (betValueErr !== '' || playersErr !== '') {
      setLoader(false)
      return;
    }
    contract.methods
      .createSimpleNewGame(players, description)
      .send({
        from: account,
        value: betValue * Math.pow(10, 18)
      }).on('transactionHash', console.log)
      .on('receipt', (res: ISendSuccess) => setModalVals({
        type: 'success',
        title: 'Creación Juego',
        children: 'El juego fue creado con éxito, clic en aceptar para poder compartirlo o iniciarlo.',
        actions: [{ label: 'Aceptar', action: () => onSave && onSave(res) }]
      }))
      .on('error', () => setModalVals({
        type: 'error',
        title: 'Creación Juego',
        children: 'No fue posible crear el juego, por favor intentelo mas tarde.'
      }))

    setDescription('')
    setIsTouched(false)
    setBetValue(0.0001)
    setPlayers(2)
  }
  return (
    <Card classNameMain={`${styles.random} ${className}`}
      header='Crear juego aleatorio'>
      <div className={`${styles.random__inputs} w-3/4`}>
        <Input
          className='w-1/2'
          label='Descripción:'
          value={description}
          onChange={handleDescripcionChange}
          error={descriptionErr} />
        <Input
          className='w-1/2'
          type='number'
          label='Cantidad a apostar:'
          alias='ETH'
          value={betValue}
          onChange={(value: number) => setBetValue(value)}
          error={betValueErr} />
        <Input
          className='w-1/2'
          type='number'
          label='Cantidad a jugadores:'
          value={players}
          onChange={(value: number) => setPlayers(value)}
          error={playersErr} />
      </div>
      <Button
        className={`w-1/4 ${descriptionErr === '' && betValueErr === '' && playersErr === ''
          ? styles.random__btn : styles.random__btn2}`}
        color='contrast1'
        onClick={handleCreateGame}
        disabled={description === '' || betValueErr !== '' || playersErr !== ''}>
        Lanzar Apuesta
      </Button>
    </Card>
  )
}

export default RandomForm