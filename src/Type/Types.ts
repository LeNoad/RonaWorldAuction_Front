export type userEntity = {
    userSeq?: number,
    ronaUnqIdt?: number,
    discordId?: number,
    discordEmail?: string,
    discordGlobalName?: string,
}

export type jwtTokenDto = {
    discordAccessToken?:string,
    accessToken?: string,
    refreshToken?: string,
    expiresIn?: string,
}

export type ItemInfoEntity = {
    accRate?: number,
    atkPt?: number,
    atkSpd?: number,
    dexPt?: number,
    evaRate?: number,
    intPt?: number,
    itemDetailSeq?: number,
    itemInfoSeq?: number,
    itemName?: string,
    itemType?: string,
    jmpPt?: number,
    lukPt?: number,
    mgcDef?: number,
    mgcPt?: number,
    movPt?: number,
    phyDef?: number,
    reqDex?: number,
    reqGender?: number,
    reqInt?: number,
    reqLevel?: number,
    reqLuk?: number,
    reqPop?: number,
    reqStr?: number,
    strPt?: number,
    upgradeLimit?: number
}