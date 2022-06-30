export const fetchNfts = async (wallet, limit = 50, url = null, data = []) => {
  if (!url) url = `https://api.swamps.io/account/nfts/${wallet}`
  const fetchNfts = await (await fetch(url)).json()
  if (fetchNfts.ownedNfts) data = fetchNfts.ownedNfts

  return data.map((nft) => {
    return {
      name: nft.metadata.name,
      image: nft.metadata.image,
    }
  })
}
