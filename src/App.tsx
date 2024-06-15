import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AxiosWrapper } from './Component/AxiosWrapper';
import { logout, setToken, setUser } from './Redux/Action/actions';
import ItemSellPage from './Web/ItemSellPage';
import MainPage from './Web/MainPage';
import base64 from "base-64";
import ItemBuyPage from './Web/ItemBuyPage';
import PartyBoard from './Web/PartyBoard';

const App = () => {
  const dispatch = useDispatch();
  const jwtTokenDto = useSelector((state: any) => state.jwtTokenDto);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("갱신확인")
      if (jwtTokenDto?.expiresIn) {
        const now = new Date();
        const expiresIn = new Date(jwtTokenDto?.expiresIn);
        console.log(now)
        console.log(expiresIn)
        if (now.getTime() > expiresIn.getTime()) {
          // 토큰이 만료되었으면 로그아웃
          dispatch(logout());
        } else if (expiresIn.getTime() - now.getTime() < 8 * 60 * 1000 /* 60 * 60 * 1000 */) {
          console.log("***자동 갱신 완료***")
          // 토큰이 1시간 이내로 만료되면 갱신
          AxiosWrapper.get("http://localhost:8080/refresh?refreshToken=" + jwtTokenDto?.refreshToken).then((data: any) => {
            dispatch(setToken({
              discordAccessToken: data.data?.result?.info?.discordAccessToken,
              accessToken: data.data?.result?.info?.accessToken,
              refreshToken: data.data?.result?.info?.refreshToken,
              expiresIn: data.data?.result?.info?.expiresIn
            }));
            let token = data.data?.result?.info?.accessToken;
            let strPayload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
            let payload = JSON.parse(base64.decode(strPayload))
            AxiosWrapper.get("/getUserData?discordEmail=" + payload.Authorization).then((data: any) => {
              dispatch(setUser(data.data?.result?.info));
            })
          })
        } else {
          console.log("갱신 할일없음")
        }
      }
    }, 1000 * 3/*  60 * 1000 */); // 1분마다 확인
    return () => {
      clearInterval(interval);
    };
  }, [jwtTokenDto]);

  return (
    <BrowserRouter >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/ItemSellPage' element={<ItemSellPage />} />
        <Route path='/PartyBoard' element={<PartyBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
