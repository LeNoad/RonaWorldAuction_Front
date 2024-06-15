import React, { useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, ListGroup, Modal, Form, Row, Col } from 'react-bootstrap';
import AxiosWrapper from '../Component/AxiosWrapper';
import { useSelector } from 'react-redux';
import { userEntity } from '../Type/Types';
import DiscordLoginButton from '../Component/DiscordLoginButton';
import ToastifyWrapper from '../Component/ToastifyWrapper';
import { useNavigate } from 'react-router-dom';

interface Post {
    postId: number;
    title: string;
    charName: string;
    userSeq: number;
    charLevel: number;
    charDmg: number;
    category: string;
    discordId: string;
}

export const PartyBoard = () => {
    const userEntity: userEntity = useSelector((state: any) => state?.userEntity);
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>('파풀라투스');
    const [showModal, setShowModal] = useState(false);
    const [postEntity, setPostEntity] = useState({
        title: '',
        charName: '',
        charLevel: 0,
        charDmg: 0,
        category: '파풀라투스',
        userSeq: userEntity?.userSeq,
        insDate: new Date().toISOString()
    });
    const navigate = useNavigate();
    const handleAddBtn = () => {
        if(userEntity){
            setShowModal(true);
        } else {
            ToastifyWrapper.error("로그인이 필요한 상태입니다")
        }
    }
    const categories = ['파풀라투스', '자쿰', '혼테일'];

    useEffect(() => {
        AxiosWrapper.post('/rona/api/RaidPartyPost')
            .then((response: any) => {
                setPosts(response.data.result.info);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const filteredPosts = posts.filter((post) => selectedCategory === null || post.category === selectedCategory);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const post ={
            title: postEntity.title,
            charName: postEntity.charName,
            charLevel: postEntity.charLevel,
            charDmg: postEntity.charDmg,
            category: postEntity.category,
            userSeq: userEntity.userSeq,
            insDate: formattedDate
        }
        setPosts([]);
        AxiosWrapper.post('/rona/api/RaidPartyPostAdd', post)
            .then((response: any) => {
                setPosts(response.data.result.info);
            })
            .catch((error) => {
                console.error('Error posting data: ', error);
            });

        setShowModal(false);
    };

    return (
        <Container className="my-3">
            <Row>
                <Col xs={12} md={12} onClick={() => navigate("/PartyBoard")} style={{cursor:'pointer'}}> 
                    <h1 className="text-center text-white mb-4">레이드 모집</h1>
                </Col>
                <Col xs={6} md={6}>
                    <Button variant='info' onClick={handleAddBtn}>
                        파티 모집 글 작성
                    </Button>
                </Col>
                <Col xs={6} md={6} className='d-flex justify-content-end'>
                    <DiscordLoginButton />
                </Col>
            </Row>
            <ButtonGroup className="mb-3 d-flex justify-content-center">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'outline-primary' : 'outline-secondary'}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </ButtonGroup>
            <ListGroup variant="flush" className="mt-3">
                {filteredPosts.map((post, index) => (
                    <ListGroup.Item key={post.postId} variant="dark">
                        <Row>
                            <Col xs={6} md={6}>
                                {index+1}. {post.title} - {post.charName} / 레벨: {post.charLevel} / 데미지: {post.charDmg}
                            </Col>
                            <Col xs={3} md={3} className='d-flex justify-content-end'>
                                <Button size="sm" variant='info' onClick={() => window.open(`discord://discord.app/users/`+post.discordId)}>Discord [PC]</Button>
                            </Col>
                            <Col xs={3} md={3}>
                                <Button size="sm" variant='info' onClick={() =>  window.open(`https://discord.com/users/`+post.discordId)}>Discord [WEB]</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant='info' className='mt-3' onClick={() => navigate("/")}>원래 페이지로 돌아가기</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: '#222121' }}>
                    <Modal.Title>레이드 모집 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#222121' }}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>게임 직업 명</Form.Label>
                                    <Form.Control type="text" value={postEntity.title} onChange={(e) => setPostEntity({ ...postEntity, title: e.target.value })} />
                                </Form.Group>

                                <Form.Group controlId="formCharName">
                                    <Form.Label>게임 닉네임</Form.Label>
                                    <Form.Control type="text" value={postEntity.charName} onChange={(e) => setPostEntity({ ...postEntity, charName: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={6}>
                                <Form.Group controlId="formCharLevel">
                                    <Form.Label>게임 케릭터 레벨</Form.Label>
                                    <Form.Control type="number" value={postEntity.charLevel} onChange={(e) => setPostEntity({ ...postEntity, charLevel: Number(e.target.value) })} />
                                </Form.Group>

                                <Form.Group controlId="formCharDmg">
                                    <Form.Label>게임 케릭터 스공데미지</Form.Label>
                                    <Form.Control type="number" value={postEntity.charDmg} onChange={(e) => setPostEntity({ ...postEntity, charDmg: Number(e.target.value) })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group controlId="formCategory">
                                    <Form.Label>카테고리</Form.Label>
                                    <Form.Control as="select" value={postEntity.category} onChange={(e) => setPostEntity({ ...postEntity, category: e.target.value })}>
                                        <option value="파풀라투스">파풀라투스</option>
                                        <option value="자쿰">자쿰</option>
                                        <option value="혼테일">혼테일</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            게시글 작성
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default PartyBoard;
