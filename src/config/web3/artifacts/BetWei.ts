const BetWei = {
  address: {
    5: "0xF09B3071fA557D16E301200DF5A1E2db592ab547",
  },
  abi: [
    {
      inputs: [
        { internalType: "uint64", name: "_subscriptionId", type: "uint64" },
        { internalType: "bytes32", name: "_keyHash", type: "bytes32" },
        {
          internalType: "address",
          name: "_vrfCoordinatorAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { internalType: "address", name: "have", type: "address" },
        { internalType: "address", name: "want", type: "address" },
      ],
      name: "OnlyCoordinatorCanFulfill",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "player",
          type: "address",
        },
      ],
      name: "EnrolledToGame",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
      ],
      name: "FinishGame",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
      ],
      name: "NewGameCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "gameId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "winner",
          type: "address",
        },
      ],
      name: "WithdrawFromGame",
      type: "event",
    },
    {
      inputs: [{ internalType: "uint256", name: "gameId", type: "uint256" }],
      name: "closeGame",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC721",
          name: "_nftContract",
          type: "address",
        },
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "_duration", type: "uint256" },
        { internalType: "string", name: "_description", type: "string" },
      ],
      name: "createRandomNFTGame",
      outputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_duration", type: "uint256" },
        { internalType: "string", name: "_description", type: "string" },
      ],
      name: "createSimpleNewGame",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "gameId", type: "uint256" }],
      name: "enrollToGame",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "gameBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "gameStatus",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "nftInfo",
      outputs: [
        {
          components: [
            {
              internalType: "contract IERC721",
              name: "nftContract",
              type: "address",
            },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          internalType: "struct Betwei.NFTGameRandom",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_player", type: "address" }],
      name: "playerGames",
      outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "requestId", type: "uint256" },
        { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
      ],
      name: "rawFulfillRandomWords",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "gameId", type: "uint256" }],
      name: "startGame",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "gameId", type: "uint256" }],
      name: "usersEnrolled",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "viewGame",
      outputs: [
        {
          components: [
            {
              internalType: "enum Betwei.GameType",
              name: "gameType",
              type: "uint8",
            },
            {
              internalType: "enum Betwei.GameStatus",
              name: "status",
              type: "uint8",
            },
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "string", name: "description", type: "string" },
            {
              internalType: "address payable[]",
              name: "members",
              type: "address[]",
            },
            {
              internalType: "address[]",
              name: "winnersIndexed",
              type: "address[]",
            },
            { internalType: "uint256", name: "balance", type: "uint256" },
            { internalType: "uint256", name: "gameId", type: "uint256" },
            { internalType: "uint256", name: "duration", type: "uint256" },
            { internalType: "uint256", name: "solution", type: "uint256" },
            { internalType: "uint256", name: "neededAmount", type: "uint256" },
          ],
          internalType: "struct Betwei.Game",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "winners",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_gameId", type: "uint256" }],
      name: "withdrawGame",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
};

export default BetWei;
