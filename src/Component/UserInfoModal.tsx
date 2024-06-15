import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Action/actions";
import { UserInfoModalProps } from "../Type/Interface";
import { jwtTokenDto, userEntity } from "../Type/Types";
import ToastifyWrapper from "./ToastifyWrapper";
import Btn from "./Btn";
import { useEffect, useState } from "react";
import AxiosWrapper from "./AxiosWrapper";
export const UserInfoModal: React.FC<UserInfoModalProps> = ({ show, handleClose, handleLogout }) => {
    const userEntity: userEntity = useSelector((state: any) => state?.userEntity);
    const [searchMyAddItemDto, setSearchMyAddItemDto] = useState<any>();

    // 등록된 거래 아이템 보여주고 판매완료 버튼 만들도록 하면 끝
    //const jwtTokenDto: jwtTokenDto = useSelector((state: any) => state?.jwtTokenDto);
    useEffect(() => {
        if(userEntity){
            AxiosWrapper.post("/rona/api/searchMyAddItem?userSeq=" + userEntity.userSeq).then((data: any) => {
                setSearchMyAddItemDto(data?.data?.result?.info)
            });
        }
    }, [])

    const handleSellOk = (auctionSeq:number) => {
        if (window.confirm("해당 아이템 판매 완료하시겠습니까?")) {
            const sellOkDto = {
                userSeq:userEntity.userSeq,
                auctionSeq:auctionSeq
            }
            AxiosWrapper.post("/rona/api/sellOk", sellOkDto).then((data: any) => {
                setSearchMyAddItemDto(data?.data?.result?.info)
                ToastifyWrapper.info("해당 거래는 종료되었습니다")
            });
        }
    }
    return (
        <Modal size="lg" show={show} onHide={handleClose} style={{ color: 'white' }}>
            <Modal.Header style={{ backgroundColor: '#222121' }}>
                <Modal.Title>
                    내 정보
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#222121' }}>
                <Row>
                    <Col xs={3} md={3} className="p-0 px-4">
                        <Row className="d-flex align-items-center" style={{ height: '100%' }}>
                            <Col xs={12} md={12} className="pb-2">
                                <Image src="icon/defaultProfile.png"
                                    onClick={() => ToastifyWrapper.info("TODO : 사진변경")}
                                    style={{ cursor: 'pointer', backgroundColor: 'transparent' }} thumbnail />
                            </Col>
                            <Col xs={12} md={12} className="pt-2 d-flex justify-content-center">
                                {/* 임시로 Btn 컴포넌트 Button 상속받아서 만들긴했는데 수정필요 */}
                                <Btn size="md" variant="danger" onClick={handleLogout}>로그아웃</Btn>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={9} md={9} className="p-0 px-3 d-flex align-items-center border">
                        <Row className="d-flex align-items-center" style={{ height: '100%' }}>
                            <Col xs={3} md={3} className="p-2">
                                닉네임
                            </Col>
                            <Col xs={9} md={9} className="p-2">
                                {userEntity?.discordGlobalName}
                            </Col>
                            <Col xs={3} md={3} className="p-2">
                                Email
                            </Col>
                            <Col xs={9} md={9} className="p-2">
                                {userEntity?.discordEmail}
                            </Col>
                            <Col xs={3} md={3} className="p-2">
                                로나월드 ID
                            </Col>
                            <Col xs={9} md={9} className="p-2">
                                {userEntity?.ronaUnqIdt}
                            </Col>
                            <Col xs={3} md={3} className="p-2">
                                Discord ID
                            </Col>
                            <Col xs={9} md={9} className="p-2">
                                {userEntity?.discordId}
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} md={12} className="p-2" style={{ borderTop: '1px solid' }}>
                        <Row>
                            <Col xs={12} md={12} className="d-flex justify-content-center">
                                등록된 아이템
                            </Col>
                            {searchMyAddItemDto?.map((item:any, index:number) => (
                                <Col key={index} xs={4} md={4}>
                                    <Row className="d-flex align-items-center" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
                                        <Col xs={12} md={12} className="p-2">
                                            <h5>아이템명 : {item.itemName}</h5>
                                            <p>가격 : {item.auctionPrice}</p>
                                            <Button variant="info" style={{ width: "100%" }}
                                            onClick={() => handleSellOk(item.auctionSeq)}>판매 완료</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
            {/* <Modal.Footer className="d-block" style={{backgroundColor:'#222121', border:'none'}}>
                <Row>
                    <Col xs={12} md={12}>
                    </Col>
                </Row>
            </Modal.Footer> */}
        </Modal>
    )
}
export default UserInfoModal;