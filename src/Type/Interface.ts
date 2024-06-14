import { ItemInfoEntity } from "./Types";

// 검색바 인터페이스를 지정
export interface ItemStatusProps {
    ItemInfo: ItemInfoEntity
}
export interface ItemDetailStatusProps {
    itemDetailList : any 
    itemInfo : any 
}
export interface SearchBarProps {
    size: string;
    onSearch: (item: any) => void;
}
export interface UserInfoModalProps {
    show: boolean;
    handleClose: () => void;
    handleLogout: () => void;
}

export type ItemAttributes = {
    [key: string]: string | null;
}

export const translateAttributes: ItemAttributes = {
    atkPt: '공격력',
    mgcPt: '마법공격력',
    atkSpd: '공격 속도',
    reqGender: '성별',

    strPt: 'STR',
    dexPt: 'DEX',
    intPt: 'INT',
    lukPt: 'LUK',

    evaRate: '회피율',
    accRate: '명중률',
    jmpPt: '점프력',
    movSpd: '이동 속도',

    mgcDef: '마법 방어력',
    phyDef: '물리 방어력',
    upgradeLimit: '업그레이드 가능한 횟수',
    upgradeCount: '업그레이드 완료된 횟수',
};

export const genderTranslation: ItemAttributes = {
    '0': '남자',
    '1': '여자',
    '2': '공용',
};