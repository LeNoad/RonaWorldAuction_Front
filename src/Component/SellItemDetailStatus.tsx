import { Button, Col, Image, Modal, ModalBody, Row } from "react-bootstrap";
import ToastifyWrapper from "./ToastifyWrapper";
import { useEffect, useState } from "react";
import { ItemDetailStatusProps, genderTranslation, translateAttributes } from "../Type/Interface";
import { AxiosWrapper } from "./AxiosWrapper";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { jwtTokenDto } from "../Type/Types";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const ItemDetailStatus: React.FC<ItemDetailStatusProps> = ({ itemDetailList, itemInfo }) => {
    const [show, setShow] = useState<boolean>(false);
    const [itemDetailEntityList, setItemDetailEntityList] = useState<any>(itemDetailList);
    const [itemInfoEntity, setItemInfoEntity] = useState<any>(itemInfo);
    const [itemDetailEntity, setItemDetailEntity] = useState<any>();
    const [selectItemUserSeq, setSelectItemUserSeq] = useState<number>();
    const [selectItemUserEntity, setSelectItemUserEntity] = useState<any>();
    const [discordId, setDiscordId] = useState<any>();

    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    function formatCurrency(amount: number) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleModalOpen = (itemDetailEntity: any, userSeq: number) => {
        setShow(true);
        setItemDetailEntity(itemDetailEntity);
        AxiosWrapper.post("/rona/api/userSearch?userSeq=" + userSeq).then((data: any) => {
            setDiscordId(data.data?.result?.info.discordId);
        });
    }
    const displayItemAttributes = () => {
        if (!itemInfoEntity || !itemDetailEntity)
            return null; // 판매내용없을시 적절한 내용추가 

        let upgradeCountElement = null;

        let upgradeLimitElement = null;

        let itemInfo = Object.entries(itemInfoEntity).map(([key, value]: [any, any]) => {
            if (value !== null && translateAttributes[key]) {
                if (key === 'reqGender') {
                    return (
                        <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>
                            {translateAttributes[key]} : {genderTranslation[value.toString()]}
                        </Col>
                    );
                } else if (key === 'upgradeLimit') {
                    upgradeLimitElement = (
                        <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>
                            {translateAttributes[key]} : {value}
                        </Col>
                    )
                } else {
                    return (
                        <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>
                            {translateAttributes[key]} : {value}
                        </Col>
                    );
                }
            }
        }).filter(Boolean); // null 값을 제거합니다.

        let ItemDetailInfo = Object.entries(itemDetailEntity).map(([key, value]: [any, any]) => {
            if (value !== null && translateAttributes[key]) {
                if (key === 'upgradeCount') {
                    // 'upgradeCount'는 별도로 처리합니다.
                    upgradeCountElement = (
                        <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>
                            {translateAttributes[key]} : {value}
                        </Col>
                    );
                } else {
                    return (
                        <Col className='d-flex justify-content-center p-2' xs={12} md={12} key={key}>
                            {translateAttributes[key]} : + {value}
                        </Col>
                    );
                }
            }
        }).filter(Boolean); // null 값을 제거합니다.

        return (
            <>
                <Col className='d-flex justify-content-center p-2' xs={12} md={12} style={{ fontSize: '22px' }}>
                    기본정보
                </Col>
                {itemInfo}
                {upgradeLimitElement && <>{upgradeLimitElement}</>}
                <Col xs={12} md={12} className="pb-2 p-2">
                    <div style={{ height: "3px", background: "white" }} />
                </Col>
                <Col className='d-flex justify-content-center p-2' xs={12} md={12} style={{ fontSize: '22px' }}>
                    업그레이드 정보
                </Col>
                {ItemDetailInfo}
                {upgradeCountElement && <>{upgradeCountElement}</>} { /* 업그레이드 완료된 횟수를 마지막에 표시합니다. */}
            </>
        );
    };

    const ItemClassification = () => {
        if (itemInfoEntity?.itemType == "etc") {
            return (
                <> 아직 기타 아이템들은 준비중 </>
            );
        } else {
            return (
                <>
                    <Col xs={6} md={6} className="d-flex align-items-center">
                        <Row >
                            <Col xs={12} md={12} className="p-1">
                                REQLEV : {itemInfoEntity?.reqLevel}
                            </Col>
                            <Col xs={12} md={12} className="p-1">
                                REQSTR : {itemInfoEntity?.reqStr}
                            </Col>
                            <Col xs={12} md={12} className="p-1">
                                REQDEX : {itemInfoEntity?.reqDex}
                            </Col>
                            <Col xs={12} md={12} className="p-1">
                                REQINT : {itemInfoEntity?.reqInt}
                            </Col>
                            <Col xs={12} md={12} className="p-1">
                                REQLUK : {itemInfoEntity?.reqLuk}
                            </Col>
                            <Col xs={12} md={12} className="p-1">
                                REQPOP : {itemInfoEntity?.reqPop}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="p-2 pt-4">
                        <div style={{ height: "5px", background: "white" }} />
                    </Col>
                    {displayItemAttributes()}
                    <Col xs={12} md={12} className="pb-4 p-2">
                        <div style={{ height: "5px", background: "white" }} />
                    </Col>
                    <Col xs={6} md={6}>
                        <Button variant="primary" style={{ width: "100%" }} 
                        onClick={() => window.open(`discord://discord.app/users/`+discordId)}>구매 디스코드(PC)</Button>
                        </Col>
                    <Col xs={6} md={6}>
                        <Button variant="primary" style={{ width: "100%" }}
                        onClick={() => window.open(`https://discord.com/users/`+discordId)}>구매 디스코드(WEB)</Button>
                    </Col>
                </>
            );
        }
    }

    const handleReportBtn = (item: any) => {
        if (window.confirm("등록된 거래 아이템을 신고하시겠습니까?")) {
            const reportRequestDto = {
                auctionSeq: item.auctionSeq,
                userSeq: item.userSeq,
            }

            AxiosWrapper.post("/rona/api/report", reportRequestDto).then(() => {
                ToastifyWrapper.info("거래가 정상적으로 신고되었습니다.")
            }).catch(() => {
                ToastifyWrapper.error("비정상적인 접근입니다")
            })
        }
    }
    return (
        <>
            {itemDetailEntityList.map((item: any, index: number) => {
                return (
                    <Col xs={6} md={6} className="mt-3">
                        <Row style={{ backgroundColor: '#47476F', color: 'white' }} className="p-3 m-0">
                            <Col xs={3} md={3} className="p-2" onClick={() => handleModalOpen(item?.itemDetailEntity, item?.userSeq)} style={{ cursor: "pointer" }}>
                                <Image src="https://maplestory.io/api/gms/62/item/1402004/icon?resize=5" style={{ backgroundColor: "#6C6C8C", border: 'none', borderRadius: 0 }} thumbnail />
                            </Col>
                            <Col xs={9} md={9}>
                                <Row>
                                    <Col xs={6} md={6} className="py-2" style={{ fontSize: '18px' }}>
                                        {itemInfoEntity.itemName} ({item?.itemDetailEntity?.upgradeCount})
                                    </Col>
                                    {/* <Col xs={6} md={6} className="py-2 d-flex justify-content-end">
                                        <FaRegStar onClick={() => ToastifyWrapper.info("즐겨찾기전")} size={30} style={{ cursor: "pointer" }} />
                                        <FaStar onClick={() => ToastifyWrapper.info("즐겨찾기후")} size={30} style={{ cursor: "pointer" }} />
                                    </Col> */}
                                    <Col xs={12} md={12} className="py-2">
                                        <div style={{ height: "5px", background: "white" }}></div>
                                    </Col>
                                    <Col xs={12} md={12} className="py-2">
                                        <Image src="icon/gold.png" width={25}></Image>
                                        <label className="px-2">{formatCurrency(item?.auctionPrice)}</label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={12}>
                                <Row>
                                    <Col xs={3} md={3}>
                                        <Button variant="primary" style={{ width: '100%' }} onClick={() => handleModalOpen(item?.itemDetailEntity, item?.userSeq)}>상세보기</Button>
                                    </Col>
                                    <Col xs={3} md={3}>

                                    </Col>
                                    <Col xs={3} md={3} className="d-flex justify-content-end">

                                    </Col>
                                    <Col xs={3} md={3} className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => handleReportBtn(item)}>신고하기</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                )
            })}
            <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
                <Modal.Body style={{ backgroundColor: '#47476F' }}>
                    <Row style={{ backgroundColor: '#47476F', color: 'white', height: "100%" }} className="p-2 m-0">
                        <Col xs={12} md={12} className='d-flex justify-content-center py-2' style={{ fontSize: 20 }}>
                            <h3>{itemInfoEntity?.itemName} ({itemDetailEntity?.upgradeCount})</h3>
                        </Col>
                        <Col xs={6} md={6} className='p-4'>
                            <Image src="https://maplestory.io/api/gms/62/item/1402004/icon?resize=5" style={{ backgroundColor: "#6C6C8C", border: 'none', borderRadius: 0 }} thumbnail />
                        </Col>
                        {ItemClassification()}
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ItemDetailStatus;