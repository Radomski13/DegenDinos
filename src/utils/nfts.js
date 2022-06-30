export const fetchSwampverseNfts = async (wallet, url = null, data = []) => {
    if(!url) url = `https://api.opensea.io/api/v1/assets?collection_slug=swampverseofficial&owner=${wallet}&limit=50`;

    const fetchNfts = await (await fetch(url)).json();
    if(fetchNfts.assets) data = fetchNfts.assets;
    if(fetchNfts.next) return await fetchSwampverseNfts(wallet, fetchNfts.next.replace("api-web1", "api"), data);

    return data.map(nft => {
        return {
            id: nft.token_id,
            name: nft.name,
            image: nft.image_preview_url
        }
    })
}

export const fetchCreaturesNfts = async (wallet, url = null, data = []) => {
    if(!url) url = `https://api.opensea.io/api/v1/assets?collection_slug=swampverse-creatures&owner=${wallet}&limit=50`;

    const fetchNfts = await (await fetch(url)).json();
    if(fetchNfts.assets) data = fetchNfts.assets;
    if(fetchNfts.next) return await fetchCreaturesNfts(wallet, fetchNfts.next.replace("api-web1", "api"), data);

    return data.map(nft => {
        return {
            id: nft.token_id,
            name: nft.name,
            image: nft.image_preview_url
        }
    })
}