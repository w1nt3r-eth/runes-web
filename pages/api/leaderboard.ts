import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const provider = new ethers.providers.AlchemyProvider(
  1,
  process.env.ALCHEMY_KEY
);
const abi = [
  "function ownerOf(uint256 tokenId) view external returns (address)",
];
const contract = new ethers.Contract(
  "0x555555551777611fd8eb00df11ea0904b560cf74",
  abi,
  provider
);

type Data = {
  owners: { address: string; ens: string | null }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const owners = await Promise.all(
    [1, 2, 3, 4, 5].map((id) =>
      contract
        .ownerOf(id)
        .then((address: string) =>
          provider.lookupAddress(address).then((ens) => ({ address, ens }))
        )
    )
  );
  res
    .status(200)
    .setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=3600000")
    .json({ owners });
}
