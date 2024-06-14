import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Image, Row } from "react-bootstrap";
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

    const userEntity: userEntity = useSelector((state: any) => state?.userEntity);
    const jwtTokenDto: jwtTokenDto = useSelector((state: any) => state?.jwtTokenDto);

    /* 첫 페이지에서 넘어올때 검색 페이지 */
    useEffect(() => {
        AxiosWrapper.post("/rona/api/searchAllItemInfo?itemInfoSeq=" + itemInfoSeq).then((data: any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
        })
    }, [itemInfoSeq])

    /* 아이템 판매 페이지 검색창 */
    const handleSearch = (item: ItemInfoEntity) => {
        setItemInfoEntity(undefined);
        AxiosWrapper.post("/rona/api/searchAllItemInfo?itemInfoSeq=" + item.itemInfoSeq).then((data: any) => {
            setItemInfoEntity(data.data.result.info.itemInfoEntity);
            setItemDetailEntityList(data.data.result.info.itemDetailEntityList);
        });
    }

    const test = () => {
        return (
            <>
                <Col xs={12} md={12} className="py-1">
                    <Row >
                        <Col xs={2} md={2} className="d-flex align-items-center">
                            가격
                        </Col>
                        <Col xs={4} md={4} className="d-flex justify-content-center">
                            <Form.Control size="sm" type="text" placeholder="시작가격" />
                        </Col>
                        <Col xs={2} md={2} className="d-flex align-items-center justify-content-center">
                            ~
                        </Col>
                        <Col xs={4} md={4} className="d-flex justify-content-center">
                            <Form.Control size="sm" type="text" placeholder="마진가격" />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12} className="py-1">
                    <div style={{ height: "2px", background: "white" }} />
                </Col>
            </>
        )
    }
    return (
        <Row>
            <Col xs={9} md={9} className="p-1 m-0">
                <Image src="logo/logo.png" width={250} style={{ cursor: 'pointer' }} onClick={() => navigator('/')}></Image>
            </Col>
            <Col xs={3} md={3} className="p-1 m-0 d-flex justify-content-end align-items-center">
                <DiscordLoginButton/>
            </Col>
            <Col xs={10} md={10} className="p-1 m-0">
                <SearchBar size="100%" onSearch={handleSearch} />
            </Col>
            <Col xs={2} md={2} className="p-1 m-0">
                <Button size="lg" variant="info" style={{ width: "100%" }} onClick={() => ToastifyWrapper.info("TODO: 아이템 등록")}>아이템 등록</Button>
            </Col>
            <Col xs={4} md={4} className="p-2 m-0">
                {itemInfoEntity ? <ItemStatus ItemInfo={itemInfoEntity} /> : <div>Loading...</div>}
            </Col>
            <Col xs={8} md={8} className="p-2 m-0">
                <Row className="p-0 m-0" style={{ backgroundColor: '#47476F'}} >
                    <Col xs={12} md={12} className="d-flex justify-content-center" style={{ fontSize: "25px" }}>
                        아이템 옵션
                    </Col>
                    <Col xs={12} md={12} className="py-1">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>
                    {
                        test()
                    }
                    {
                        test()
                    }
                    {
                        test()
                    }
                    {
                        test()
                    }
                    {
                        test()
                    }
                    {
                        test()
                    }
                    {
                        test()
                    }
                    <Col xs={12} md={12}>
                        <Row>
                            <Col xs={6} md={6}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" onClick={() => ToastifyWrapper.info("TODO : 필터 추가")}>
                                        필터 추가
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </Col>
                            <Col xs={6} md={6} className="d-flex justify-content-end">
                                <Button variant="info" onClick={() => ToastifyWrapper.info("TODO : 필터 적용")}>필터 적용</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={12} className="py-1">
                        <div style={{ height: "2px", background: "white" }} />
                    </Col>
                </Row>
            </Col>
            <Col xs={12} md={12} className="py-2 px-1">
                <Button variant="info" style={{ width: "100%" }} onClick={() => ToastifyWrapper.info("TODO : 구매 페이지 전환")}>구매△</Button>
            </Col>
{/*             <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col>
            <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col>
            <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col>
            <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col>
            <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col>
            <Col xs={6} md={6} className="p-1 m-0">
                <SellItemDetailStatus />
            </Col> */}
        </Row>
    )
}
export default ItemSellPage;