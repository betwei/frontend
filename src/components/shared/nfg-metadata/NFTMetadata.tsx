/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

// Artifacts
import NFTsAbi from '../../../config/web3/artifacts/NFTs'

// Hooks
import useContract from '../../../hooks/useContract'

// Types
import { INFTMetadata } from '../../../interfaces/nftMetadata.interface'

import styles from './NFTMetadata.module.scss'

function NFTMetadata({ gameId }: INFTMetadata) {
  const { library } = useWeb3React()
  const contract = useContract()
  const [metadata, setMetadata] = useState({} as any)

  const getUrlImg = (url: string) => {
    if (url && url.indexOf('ipfs://') >= 0)
      return `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`
    else return url
  }

  useEffect(() => {
    if (contract) {
      contract.methods.nftInfo(gameId).call().then((data: any) => {
        const contractNFT = new library.eth.Contract(NFTsAbi, data.nftContract)
        contractNFT.methods.tokenURI(data.tokenId).call(
          (_: any, url: string) => fetch(
            url,
            { method: 'GET', redirect: 'follow' }
          ).then(res => res.text())
            .then(res => setMetadata(JSON.parse(res))))
      })

    }
  }, [contract, gameId, library.eth.Contract])

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
        </i>}
    </div>
  )
}

export default NFTMetadata
