import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { AxiosWrapper } from "./AxiosWrapper";
import ToastifyWrapper from "./ToastifyWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken, setUser } from "../Redux/Action/actions";
import { jwtTokenDto, userEntity } from "../Type/Types";
import UserInfoModal from "./UserInfoModal";
import base64 from "base-64";

export const DiscordLoginButton = () => {
    const navigator = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const [handleBtn, setHandleBtn] = useState<boolean>(false);

    const dispatch = useDispatch();
    const userEntity: userEntity = useSelector((state: any) => state?.userEntity);
    const jwtTokenDto: jwtTokenDto = useSelector((state: any) => state?.jwtTokenDto);
   
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    
    useEffect(() => {
        if (userEntity !== null) {
            setHandleBtn(true);
        } else {
            setHandleBtn(false);
        }
    }, [userEntity])

    useEffect(() => {
        if (code !== null) {
            AxiosWrapper.get("/oauth/redirect/discord?code=" + code).then((data: any) => {
                navigator('/')
                console.log(data)
                dispatch(setToken({
                    discordAccessToken: data.data?.result?.info?.discordAccessToken,
                    accessToken: data.data?.result?.info?.accessToken,
                    refreshToken: data.data?.result?.info?.refreshToken,
                    expiresIn: data.data?.result?.info?.expiresIn
                }));
                let token = data.data?.result?.info?.accessToken;
                let strPayload = token.substring(token.indexOf('.')+1, token.lastIndexOf('.'));
                let payload = JSON.parse(base64.decode(strPayload))
                AxiosWrapper.get("/getUserData?discordEmail=" + payload.Authorization).then((data:any) => {
                    dispatch(setUser(data.data?.result?.info));
                })
            })
        }
    }, [code !== null])

    const discordLogin = async () => {
        const response = await AxiosWrapper.get('http://localhost:8080/discord-login')
        window.location.href = response.data;
    };

    const handleLogout = () => {
        dispatch(logout());
        setShow(false);
    }

    return (
        <Row>
            <Col xs={12} md={12} hidden={handleBtn}>
                <Image src="icon/discord.png" width={60} style={{ cursor: 'pointer' }} onClick={discordLogin} />
            </Col>
            <Col xs={12} md={12} hidden={!handleBtn}>
                <Row>
                    <Col xs={12} md={12}>
                        {/* 프로필 컴포넌트화 시키고, 디스코드 로그인, 로그아웃, 프로필, 확인하도록 만들기  */}
                        <Image src="icon/defaultProfile.png" onClick={() => setShow(true)}  style={{ cursor: 'pointer', backgroundColor: '#222121', border: 'none' }} thumbnail width={60} />
                    </Col>
                </Row>
            </Col>
            <UserInfoModal handleClose={handleClose} handleLogout={handleLogout} show={show} />
        </Row>
    );
}
export default DiscordLoginButton;