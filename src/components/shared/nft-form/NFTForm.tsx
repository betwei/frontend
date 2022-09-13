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

// Artifacts
import NFTsAbi from '../../../config/web3/artifacts/NFTs'
import BetWei from '../../../config/web3/artifacts/BetWei'

import styles from './NFTForm.module.scss'

function NFTForm({ onSave, className }: IRandomForm) {
  const { account, library } = useWeb3React()
  const contract = useContract()
  const { setLoader } = useLoader()
  const [isTouchedDescription, setIsTouchedDescription] = useState(false)
  const [isTouchedNftContract, setIsTouchedNftContract] = useState(false)
  const [description, setDescription] = useState('')
  const [nftContract, setNftContract] = useState('')
  const [tokenId, setTokenId] = useState(0)
  const [players, setPlayers] = useState(2)
  const [descriptionErr, setDescriptionErr] = useState('')
  const [nftContractErr, setNftContractErr] = useState('')
  const [tokenIdErr, setTokenIdErr] = useState('')
  const [playersErr, setPlayersErr] = useState('')

  const [modalVals, setModalVals] = useState({} as IModal)

  const modal = useShowModal(modalVals)

  useEffect(() => {
    if (isTouchedDescription && description === '')
      setDescriptionErr('Debes ingresar una descripción')
    else setDescriptionErr('')
    if (isTouchedNftContract && nftContract === '')
      setNftContractErr('Debes ingresar la dirección del contrato')
    else setNftContractErr('')
    if (tokenId.toString() === '' || tokenId < 0) setTokenIdErr('Debe definir un token valido')
    else setTokenIdErr('')
    if (players < 2) setPlayersErr('Un juego al menos debe tener 2 jugadores')
    else setPlayersErr('')
  }, [isTouchedDescription, isTouchedNftContract, description, nftContract, tokenId, players])

  useEffect(() => {
    if (modalVals.title === 'Creación Juego') {
      setLoader(false)
      setDescription('')
      setNftContract('')
      setTokenId(0)
      setPlayers(2)
      setIsTouchedDescription(false)
      setIsTouchedNftContract(false)
    }
    if (modalVals.title && modalVals.children) modal()
  }, [modalVals])

  const handleDescripcionChange = (value: string) => {
    setIsTouchedDescription(true)
    setDescription(value)
  }

  const handleNftContractChange = (value: string) => {
    setIsTouchedNftContract(true)
    setNftContract(value)
  }

  const handleCreateGame = async () => {
    if ([
      descriptionErr, nftContractErr, tokenIdErr, playersErr
    ].find(item => item !== '')) return;

    setLoader(true)

    const onError = () => {
      setLoader(false)
      setModalVals({
        type: 'error',
        title: 'Creación Juego',
        children: 'No fue posible crear el juego, por favor intentelo mas tarde.'
      })
    }

    const onApprove = () => contract.methods
      .createRandomNFTGame(nftContract, tokenId, players, description)
      .send({ from: account }).on('transactionHash', console.log)
      .on('receipt', (res: ISendSuccess) => setModalVals({
        type: 'success',
        title: 'Creación Juego',
        children: 'El juego fue creado con éxito, click en aceptar para poder compartirlo o iniciarlo.',
        actions: [{ label: 'Aceptar', action: () => onSave && onSave(res) }]
      }))
      .on('error', onError)

    try {
      const contractNFT = new library.eth.Contract(NFTsAbi, nftContract)
      contractNFT.methods.approve(BetWei.address[5], tokenId)
        .send({ from: account })
        .on('receipt', () => setModalVals({
          type: 'success',
          title: 'Aprobación realizada',
          children: 'Ahora continuaremos con la cración del juego.',
          onClose: onApprove
        }))
        .on('error', onError)
    } catch (error) { onError() }
  }
  return (
    <Card classNameMain={`${styles.random} ${className}`}
      header='Sortea un NFT'>
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
            label='Contrato:'
            value={nftContract}
            onChange={handleNftContractChange}
            error={nftContractErr} />
        </div>
        <div>
          <Input
            type='number'
            label='Token id:'
            value={tokenId}
            onChange={(value: number) => setTokenId(value)}
            error={tokenIdErr} />
        </div>
        <div>
          <Input
            type='number'
            label='Cantidad de jugadores:'
            value={players}
            onChange={(value: number) => setPlayers(value)}
            error={playersErr} />
        </div>
        <div className='col-span-4 flex justify-center'>
          <Button
            className={`
              w-52 mt-3 md:mt-0 ${styles.random__btn}`}
            color='contrast1'
            onClick={handleCreateGame}
            disabled={description === '' || nftContract === '' || Boolean([
              descriptionErr, nftContractErr, nftContractErr, playersErr
            ].find(item => item !== ''))}>
            Lanzar Sorteo
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default NFTForm