<script>
    import AboutCard from "../components/AboutCard.svelte";
    import TeamAboutCard from "../components/TeamAboutCard.svelte";
</script>

<AboutCard 
    title="Swampverse"
    description="In order to expand & save the Swampverse race, the genesis fused their DNA together and created 9600 unique toads called swampers. Not only do these have sweet utility, but they also fit perfectly in all of your favorite social networking sites as your profile picture. Every swamper generates $croak, the Swampverse utility token."
    osUrl="https://opensea.io/collection/swampverseofficial"
    features={[
        "Yield 5 $croak a day",
        "Burn 2 toads in your wallet + 450 $croak for a Swampverse: Creature",
        "Unlock exclusive channels in Discord",
        "Unlock a VX version with 800 $croak"
    ]} 
>
<div>&nbsp;</div>
</AboutCard>

<AboutCard 
    title="Swampverse: Creatures"
    description="These mysterious swamp creatures are still being researched at the janky lab in Swampville on what they exactly do. The Lore shows some information on them, but it seems to be unreadable. Only the technology can be used to decipher the rest of the Lore..."
    osUrl="https://opensea.io/collection/swampverse-creatures"
    features={[
        "Yield [Hidden] $croak a day",
        "Unlock a VX version with 800 $croak",
        "Unlock exclusive channels in Discord",
        "[Hidden]"
    ]}
/>

<AboutCard 
    title="$Croaks"
    description="$CROAK is important to Swampverse, it lets us fuel our ecosystem the TRUE way, on the blockchain. It is intended as a utility token where you can unlock all sorts of benefits. As Swampverse grows more utility will be added. Use $CROAK to unlock the next 3 collections."
    features={[
        "<b>Yield</b> Swampverse toads yield 5 $CROAK/day. A hard day of croaking pays off.",
        "<b>Fuse</b> Burn any two Swampverse toads in your wallet with 450 $CROAK to receive a Swampverse: Creature NFT.",
        "<b>Store</b> Spend your $CROAK at the store to get your gear on. Limited set of hoodies, shirts, decortive rugs, sticker packs & even a collectable will be available.",
        "<b>VX</b> Use $CROAK to unlock a VX version of any of the Swampverse collections. These 3D playable models will be used for our sandbox game.",
        "1 $CROAK = 1 $CROAK"
    ]}
>
<a target="_BLANK" href="https://etherscan.io/token/0x99394F6193C749674fF442763C6cdB27f0aa1d9c"><strong>Contract</strong>: 0x99394F6193C749674fF442763C6cdB27f0aa1d9c</a>
</AboutCard>

<AboutCard 
    title="Swampverse: VX"
    description="Playable 3D characters which can be used for mini games, campaign adventures & tournaments for cash prizes. Can only be unlocked with $croak. This collection is yet to be released."
/>

<AboutCard 
    title="Lore"
    description="In hopes of saving the rare Swampian race, the Genesis were tasked with finding a new place to settle and call home. After what felt like an eternity of roaming and browsing the universe the Genesis toads discovered an abandoned swamp, with enough potential to support the future of the Swampian race. This breathtaking marshland would forever be known as the Swampverse. A swamp, unlike any other in the universe, with copious greenery, saturated soils, and a vast environment to evolve. With a home secure, the Genesis strategically combined their DNA with the remaining !vibe to produce, the first and last generation, of 9600 distinctive Swampverse toads. Each individual toad will live its life, but they will prosper together as a community.<br /><br />However, the journey has just started.<br /><br />The Genesis are out of !vibe, and they are ascending into Swamphalla to rest after fulfilling their noble duty. The 9600 toads are left to decipher The Lore, and work together to conquer their biggest challenge……"
/>


<TeamAboutCard 
    team={[
        { name: "OxWart", imageUrl: "/images/profile_photos/0xwart.png", twitterHandle: "0xWart", role: "Creative Director"},
        { name: "Ogre", imageUrl: "/images/profile_photos/ogre.png", twitterHandle: "SV_Ogre", role: "Management"},
        { name: "NFTJunkiee", imageUrl: "/images/profile_photos/junkiee.png", twitterHandle: "NFT_Junkiee", role: "Marketing"},
        { name: "Ryeshrimp", imageUrl: "/images/profile_photos/ryeshrimp.png", twitterHandle: "ryeshrimp", role: "Developer"},
        { name: "AlexMason", imageUrl: "/images/profile_photos/alexmason.png", twitterHandle: "SwampMaxi", role: "Community Leader"},
        { name: "Lota", imageUrl: "/images/profile_photos/Lota.png", twitterHandle: "LotsaLota", role: "Community Leader"},
        { name: "Kachow", imageUrl: "/images/profile_photos/Kachow.png", twitterHandle: "Kachow_eth", role: "Community Leader"},
    ]}
/>

<style>
    a {
        font-size:12px;
        font-family: "Roboto",sans-serif;
    }
</style>
