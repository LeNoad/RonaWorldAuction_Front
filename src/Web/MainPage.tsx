import { Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DiscordLoginButton from '../Component/DiscordLoginButton';
import SearchBar from '../Component/SearchBar';
import ToastifyWrapper from '../Component/ToastifyWrapper';
export const MainPage = () => {
    const navigator = useNavigate();
    const handleSearch = (item:any) => {
        navigator("/ItemSellPage", { state: { data: item }})
    }
    return (
            <Row xs={1} md={1}>
                <Col xs={12} md={12} className='d-flex justify-content-center py-3'>
                    <Image src="logo/boat.png" width={350}  style={{cursor:'pointer'}} onClick={() => ToastifyWrapper.error('배')}></Image>
                </Col>
                <Col xs={12} md={12} className='d-flex justify-content-center py-3'>
                    <Image src="logo/logo.png" width={300}  style={{cursor:'pointer'}} onClick={() => ToastifyWrapper.error('MMGG.KR')}></Image>
                </Col>
                <Col xs={12} md={12} className='py-4'>
                    <SearchBar size="100%" onSearch={handleSearch}/>
                </Col>
                <Col xs={12} md={12} className='py-4 d-flex justify-content-center'> 
                    <DiscordLoginButton />
                </Col>
            </Row>
    );
}
export default MainPage;