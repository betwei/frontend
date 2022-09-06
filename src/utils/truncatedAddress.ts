const truncatedAddress = (account: string) =>
  `${account?.slice(0, 6)}...${account?.slice(-4)}`

export default truncatedAddress
