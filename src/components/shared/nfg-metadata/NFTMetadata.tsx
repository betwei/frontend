/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

// Artifacts
import NFTsAbi from '../../../config/web3/artifacts/NFTs'

// Hooks
import useContract from '../../../hooks/useContract'

// Types
import { INFTMetadata } from '../../../interfaces/nftMetadata.interface'

// Utils
import useTruncatedAddress from '../../../utils/truncatedAddress'

import styles from './NFTMetadata.module.scss'

function NFTMetadata({ game }: INFTMetadata) {
  const { library } = useWeb3React()
  const contract = useContract()
  const [metadata, setMetadata] = useState({} as any)

  const getUrlImg = (url: string) => {
    if (url && url.indexOf('ipfs://') >= 0)
      return `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`
    else return url
  }

  useEffect(() => {
    if (contract && game) {
      contract.methods.nftInfo(game.idGame).call().then((data: any) => {
        const contractNFT = new library.eth.Contract(NFTsAbi, data.nftContract)
        contractNFT.methods.tokenURI(data.tokenId).call(
          (_: any, url: string) => fetch(
            url,
            { method: 'GET', redirect: 'follow' }
          ).then(res => res.text())
            .then(res => contractNFT.methods.ownerOf(data.tokenId).call()
              .then((owner: string) => setMetadata({ ...JSON.parse(res), owner }))))
      })

    }
  }, [contract, game, library.eth.Contract])

  return (
    <div>
      <h1 className={`${styles.metadata__title} text-2xl`}>
        {metadata.name}
      </h1>
      <p className='text-xs'>{metadata.description}</p>
      <img
        className='rounded-full m-auto w-24 h-24'
        src={getUrlImg(metadata.image)}
        alt={metadata.name} />
      {metadata.attributes &&
        <i className='text-slate-300'>
          {metadata.attributes.map((a: any) => a.value).join(', ')}
        </i>}<br />
      <b>{useTruncatedAddress(metadata.owner || '', 6)}</b>
    </div>
  )
}

export default NFTMetadata
