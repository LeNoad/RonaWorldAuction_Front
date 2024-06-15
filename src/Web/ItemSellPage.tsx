import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosWrapper } from "../Component/AxiosWrapper";
import ItemStatus from "../Component/ItemStatus";
import SearchBar from "../Component/SearchBar";
import SellItemDetailStatus from "../Component/SellItemDetailStatus";
import ToastifyWrapper from "../Component/ToastifyWrapper";
import { ItemInfoEntity, jwtTokenDto, userEntity } from "../Type/Types";
import UserInfoModal from "../Component/UserInfoModal";
import DiscordLoginButton from "../Component/DiscordLoginButton";

export const ItemSellPage = () => {
    const navigator = useNavigate();
    const location = useLocation();
    const [itemInfoSeq, setItemInfoSeq] = useState<any>(location.state.data.itemInfoSeq);
    const [itemInfoEntity, setItemInfoEntity] = useState<ItemInfoEntity>();
    const [itemDetailEntityList, setItemDetailEntityList] = useState<any>([]);
    const [itemInfoEntity2, setItemInfoEntity2] = useState<ItemInfoEntity>();

    const [registerItemInfoEntity, setRegisterItemInfoEntity] = useState<any>({
        itemInfoSeq: null,
        atkPt: null,
        mgcPt: null,
        strPt: null,
        dexPt: null,
        intPt: null,
        lukPt: null,
        phyDef: null,
        mgcDef: null,
        accRate: null,
        evaRate: null,
        jmpPt: null,
        movSpd: null,
        upgradeCount: null,
        auctionPrice: null
    });

    const [itemOptions, setItemOptions] = useState<any>({
        minPrice: null,
        maxPrice: null,
        upgradeLimit: null,
        atkPt: null,
        mgcPt: null
    })

    const userEntity: userEntity = useSelector((state: any) => state?.userEntity);
    const jwtTokenDto: jwtTokenDto = useSelector((state: any) => state?.jwtTokenDto);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* 첫 페이지에서 넘어올때 검색 페이지 */
    useEffect(() => {
        AxiosWrapper.post("/rona/api/searchAllItemInfo?itemInfoSeq=" + itemInfoSeq).then((data: any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
            setItemDetailEntityList(data.data.result.info.auctionDetailDtoList);
        })
    }, [itemInfoSeq])

    /* 아이템 판매 페이지 검색창 */
    const handleSearch = (item: ItemInfoEntity) => {
        setItemInfoEntity(undefined);
        AxiosWrapper.post("/rona/api/searchAllItemInfo?itemInfoSeq=" + item.itemInfoSeq).then((data: any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
            setItemDetailEntityList(data.data.result.info.auctionDetailDtoList);
        });
    }

    const handleOptionSearch = () => {
        const searchItemOptionDto = {
            itemInfoSeq: itemInfoSeq,
            minPrice: itemOptions.minPrice,
            maxPrice: itemOptions.maxPrice,
            atkPt: itemOptions.atkPt,
            mgcPt: itemOptions.mgcPt,
            upgradeLimit: itemOptions.upgradeLimit
        }

        setItemInfoEntity(undefined);
        AxiosWrapper.post("/rona/api/searchOptionItemInfo", searchItemOptionDto).then((data: any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
            setItemDetailEntityList(data.data.result.info.auctionDetailDtoList);
        })
    }

    const handleChange = (e: any) => {
        setRegisterItemInfoEntity({
            ...registerItemInfoEntity,
            [e.target.name]: e.target.value
        });
    }
    const handleSelectItemSearch = (item: ItemInfoEntity) => {
        setItemInfoEntity2(undefined)
        AxiosWrapper.post("/rona/api/searchAllItemInfo?itemInfoSeq=" + item.itemInfoSeq).then((data: any) => {
            setItemInfoEntity2(data.data.result.info.itemInfoEntity);
        });
        setRegisterItemInfoEntity({
            ...registerItemInfoEntity,
            itemInfoSeq: item.itemInfoSeq
        })
    }
    const handleRegister = () => {
        const selectItemDto = {
            itemInfoSeq: registerItemInfoEntity.itemInfoSeq,
            itemName:itemInfoEntity?.itemName,
            userSeq:userEntity.userSeq,
            atkPt: registerItemInfoEntity.atkPt,
            mgcPt: registerItemInfoEntity.mgcPt,
            strPt: registerItemInfoEntity.strPt,
            dexPt: registerItemInfoEntity.dexPt,
            intPt: registerItemInfoEntity.intPt,
            lukPt: registerItemInfoEntity.lukPt,
            phyDef: registerItemInfoEntity.phyDef,
            mgcDef: registerItemInfoEntity.mgcDef,
            accRate: registerItemInfoEntity.accRate,
            evaRate: registerItemInfoEntity.evaRate,
            jmpPt: registerItemInfoEntity.jmpPt,
            movSpd: registerItemInfoEntity.movSpd,
            upgradeCount: registerItemInfoEntity.upgradeCount,
            auctionPrice: registerItemInfoEntity.auctionPrice
        }
        setItemInfoEntity(undefined);
        AxiosWrapper.post("/rona/api/addSellAuctionItem", selectItemDto).then((data:any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
            setItemDetailEntityList(data.data.result.info.auctionDetailDtoList);
        })
        handleClose();
    }
    return (
        <Row>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: '#222121' }}>
                    <Modal.Title>아이템 등록</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#222121' }}>
                    <Form>
                        <Row>
                            <Col xs={12} md={12}>
                                {itemInfoEntity2 ? 
                                <Row className="d-flex justify-content-center">
                                    <Col xs={12} md={12} className="py-2" style={{width:"60%"}}>
                                        <ItemStatus ItemInfo={itemInfoEntity2} />
                                    </Col>
                                    <Col xs={12} md={12} className="py-2">
                                        <Button onClick={() => setItemInfoEntity2(undefined)} style={{width:"100%"}} >다시 검색</Button>
                                    </Col>
                                </Row>
                                : 
                                <div style={{width:"100%"}}><SearchBar size="100%" onSearch={handleSelectItemSearch} />
                                </div>}
                            </Col>
                            <Col xs={6} md={6} className="mt-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 공격력</Form.Label>
                                    <Form.Control type="number" name="atkPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6} className="mt-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 마법공격력</Form.Label>
                                    <Form.Control type="number" name="mgcPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 STR</Form.Label>
                                    <Form.Control type="number" name="strPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 DEX</Form.Label>
                                    <Form.Control type="number" name="dexPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 INT</Form.Label>
                                    <Form.Control type="number" name="intPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 LUK</Form.Label>
                                    <Form.Control type="number" name="lukPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 방어력</Form.Label>
                                    <Form.Control type="number" name="phyDef" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 마법방어력</Form.Label>
                                    <Form.Control type="number" name="mgcDef" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 명중률</Form.Label>
                                    <Form.Control type="number" name="accRate" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 회피율</Form.Label>
                                    <Form.Control type="number" name="evaRate" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 점프력</Form.Label>
                                    <Form.Control type="number" name="jmpPt" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 이동속도</Form.Label>
                                    <Form.Control type="number" name="movSpd" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>추가 업그레이드 횟수</Form.Label>
                                    <Form.Control type="number" name="upgradeCount" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>판매완료 가격</Form.Label>
                                    <Form.Control type="number" name="auctionPrice" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>


                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#222121' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleRegister}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col xs={9} md={9} className="p-1 m-0">
                <Image src="logo/logo.png" width={250} style={{ cursor: 'pointer' }} onClick={() => navigator('/')}></Image>
            </Col>
            <Col xs={3} md={3} className="p-1 m-0 d-flex justify-content-end align-items-center">
                <DiscordLoginButton />
            </Col>
            <Col xs={10} md={10} className="p-1 m-0">
                <SearchBar size="100%" onSearch={handleSearch} />
            </Col>
            <Col xs={2} md={2} className="p-1 m-0">
                <Button size="lg" variant="info" style={{ width: "100%" }} onClick={handleShow}>아이템 등록</Button>
            </Col>
            <Col xs={4} md={4} className="p-2 m-0">
                {itemInfoEntity ? <ItemStatus ItemInfo={itemInfoEntity} /> : <div>Loading...</div>}
            </Col>
            <Col xs={8} md={8} className="p-2 m-0">
                <Row className="p-2 m-0" style={{ backgroundColor: '#47476F',height:"100%" }} >
                    <Col xs={12} md={12} className="d-flex justify-content-center" style={{ fontSize: "25px" }}>
                        아이템 옵션
                    </Col>
                    <Col xs={12} md={12} className="py-1">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>

                    <Col xs={12} md={12} className="py-1" >
                        <Row>
                            <Col xs={1} md={1} className="d-flex align-items-center">
                                가격
                            </Col>
                            <Col xs={5} md={5} className="d-flex justify-content-center">
                                <Form.Control type="text" placeholder="최소가격"
                                    onChange={(e) => setItemOptions({ ...itemOptions, minPrice: e.target.value })} />
                            </Col>
                            <Col xs={1} md={1} className="d-flex align-items-center justify-content-center">
                                ~
                            </Col>
                            <Col xs={5} md={5} className="d-flex justify-content-center">
                                <Form.Control type="text" placeholder="최대가격"
                                    onChange={(e) => setItemOptions({ ...itemOptions, maxPrice: e.target.value })} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-1">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>

                    <Col xs={12} md={12} className="py-1">
                        <Row >
                            <Col xs={3} md={3} className="d-flex align-items-center">
                                최소 공격력
                            </Col>
                            <Col xs={9} md={9} className="d-flex justify-content-center">
                                <Form.Control type="text" placeholder="최소 공격력"
                                    onChange={(e) => setItemOptions({ ...itemOptions, atkPt: e.target.value })} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-2">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>

                    <Col xs={12} md={12} className="py-2">
                        <Row >
                            <Col xs={3} md={3} className="d-flex align-items-center">
                                최소 마법 공격력
                            </Col>
                            <Col xs={9} md={9} className="d-flex justify-content-center">
                                <Form.Control type="text" placeholder="최소 마법공격력"
                                    onChange={(e) => setItemOptions({ ...itemOptions, mgcPt: e.target.value })} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-2">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>

                    <Col xs={12} md={12} className="py-2">
                        <Row >
                            <Col xs={3} md={3} className="d-flex align-items-center">
                                업그레이드 완료 횟수
                            </Col>
                            <Col xs={9} md={9} className="d-flex justify-content-center">
                                <Form.Control type="text" placeholder="업그레이드 완료 횟수"
                                    onChange={(e) => setItemOptions({ ...itemOptions, upgradeLimit: e.target.value })} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-0">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>

                    <Col xs={12} md={12}>
                        <Row>
                            <Col xs={6} md={6}>
                                {/* <Dropdown>
                                    <Dropdown.Toggle variant="secondary" onClick={() => ToastifyWrapper.info("TODO : 필터 추가")}>
                                        필터 추가
                                    </Dropdown.Toggle>
                                </Dropdown> */}
                            </Col>
                            <Col xs={6} md={6} className="d-flex justify-content-end">
                                <Button variant="info" size="lg" onClick={() => handleOptionSearch()}>필터 적용</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-0">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>
                </Row>
            </Col>
            <Col xs={12} md={12} className="py-2 px-1">
                <Button variant="info" style={{ width: "100%" }}>판매 페이지</Button>
            </Col>
            {itemDetailEntityList && itemInfoEntity ? <SellItemDetailStatus itemDetailList={itemDetailEntityList} itemInfo={itemInfoEntity} /> : <div>Loading...</div>}
        </Row>

    )
}
export default ItemSellPage;