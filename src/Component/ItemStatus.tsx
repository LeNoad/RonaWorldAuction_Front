import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { ItemInfoEntity } from "../Type/Types";
import { ItemStatusProps, genderTranslation, translateAttributes } from "../Type/Interface";

export const ItemStatus: React.FC<ItemStatusProps> = ({ ItemInfo }) => {
    const [itemInfoEntity, setItemInfoEntity] = useState<ItemInfoEntity>(ItemInfo);

    const displayItemAttributes = () => {
        return Object.entries(itemInfoEntity).map(([key, value]: [any, any]) => {
            if (value !== null) {
                if (key === 'reqGender') {
                    // reqGender의 경우 번역된 성별로 표시합니다.
                    return <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>{translateAttributes[key]} : {genderTranslation[value.toString()]}</Col>;
                } else if (translateAttributes[key]) {
                    // 나머지 속성들은 기존 방식대로 표시합니다.
                    return <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>{translateAttributes[key]} : {value}</Col>;
                }
            }
            return null;
        }).filter(Boolean); // null 값을 제거합니다.
    }

    const ItemClassification = () => {
        if (itemInfoEntity?.itemType == "etc") {
            return (
                <> 아직 기타 아이템들은 준비중 </>
            );
        } else {
            return (
                <>
                    <Col xs={6} md={6} className="px-0 p-2 d-flex align-items-center">
                        <Row >
                            <Col xs={12} md={12}>
                                REQLEV : {itemInfoEntity?.reqLevel}
                            </Col>
                            <Col xs={12} md={12}>
                                REQSTR : {itemInfoEntity?.reqStr}
                            </Col>
                            <Col xs={12} md={12}>
                                REQDEX : {itemInfoEntity?.reqDex}
                            </Col>
                            <Col xs={12} md={12}>
                                REQINT : {itemInfoEntity?.reqInt}
                            </Col>
                            <Col xs={12} md={12}>
                                REQLUK : {itemInfoEntity?.reqLuk}
                            </Col>
                            <Col xs={12} md={12}>
                                REQPOP : {itemInfoEntity?.reqPop}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="p-2 pt-3">
                        <div style={{ height: "5px", background: "white" }} />
                    </Col>
                    {displayItemAttributes()}
                    <Col xs={12} md={12} className="pb-4 p-2">
                        <div style={{ height: "4px", background: "white" }} />
                    </Col>
                </>
            );
        }
    }
    return (
        /* 임시로 height = 100% 설정해둠 필터 추가에따른 길이증가로 */
        <Row style={{ backgroundColor: '#47476F', color: 'white', height: "100%" }} className="p-2 m-0">
            <Col xs={12} md={12} className='d-flex justify-content-center py-2' style={{ fontSize: 20 }}>
                {itemInfoEntity?.itemName}
            </Col>
            <Col xs={6} md={6} className='p-3'>
                <Image src={`http://192.168.0.3:8080/images/${itemInfoEntity.imageNo}.png`} style={{ backgroundColor: "#6C6C8C", border: 'none', borderRadius: 0 }} thumbnail />
            </Col>
            {ItemClassification()}
        </Row>
    )
}
export default ItemStatus;