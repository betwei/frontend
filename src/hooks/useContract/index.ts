import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'

// Arifacts
import BetWei from '../../config/web3/artifacts/BetWei'
import BetWeiV2 from '../../config/web3/artifacts/BetWeiV2'

const { address, abi } = BetWei
const { address: addressV2, abi: abiV2 } = BetWeiV2

const useContract = (version: 'v1' | 'v2' = 'v1') => {
  const { active, library, chainId } = useWeb3React()

  const contract = useMemo(() => {
    if (active && chainId) return new library.eth.Contract(
      (version === 'v1' ? abi : abiV2),
      ((version === 'v1' ? address : addressV2) as any)[chainId])
  }, [active, chainId, library?.eth?.Contract])

  return contract
}

export default useContract
