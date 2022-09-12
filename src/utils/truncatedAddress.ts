const truncatedAddress = (account: string, length: number = 4) =>
  `${account?.slice(0, 2 * length)}...${account?.slice(length * -1)}`

export default truncatedAddress
