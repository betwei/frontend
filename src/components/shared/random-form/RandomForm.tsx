import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

// Components
import Card from '../card/Card'
import Input from '../atoms/input/Input'
import Button from '../atoms/buttons/Button'

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
    if (descriptionErr !== '' || betValueErr !== '' || playersErr !== '') return;
    setLoader(true)
    contract.methods
      .createSimpleNewGame(players, description)
      .send({
        from: account,
        value: betValue * Math.pow(10, 18)
      }).on('transactionHash', console.log)
      .on('receipt', (res: ISendSuccess) => setModalVals({
        type: 'success',
        title: 'Creación Juego',
        children: 'El juego fue creado con éxito, click en aceptar para poder compartirlo o iniciarlo.',
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
      <div className={`w-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        <div>
          <Input
            label='Descripción:'
            value={description}
            onChange={handleDescripcionChange}
            error={descriptionErr} />
        </div>
        <div>
          <Input
            type='number'
            label='Cantidad a apostar:'
            alias='ETH'
            value={betValue}
            onChange={(value: number) => setBetValue(value)}
            error={betValueErr} />
        </div>
        <div>
          <Input
            type='number'
            label='Cantidad de jugadores:'
            value={players}
            onChange={(value: number) => setPlayers(value)}
            error={playersErr} />
        </div>
        <div>
          <Button
            className={`w-full mt-3 md:mt-0 ${styles.random__btn}`}
            color='contrast1'
            onClick={handleCreateGame}
            disabled={
              description === '' || descriptionErr !== '' ||
              betValueErr !== '' || playersErr !== ''}>
            Lanzar Apuesta
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default RandomForm