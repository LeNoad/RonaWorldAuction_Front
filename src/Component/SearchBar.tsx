import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from "react-bootstrap";
import "../css/SearchBar.css";
import { AxiosWrapper } from './AxiosWrapper';
import { SearchBarProps } from '../Type/Interface';

// 컴포넌트로 내보낼 준비 
export const SearchBar: React.FC<SearchBarProps> = ({  size, onSearch }) => {
    const [value, setValue] = useState<string>();
    /* 검색된 아이템 리스트 */
    const [searchedItem, setSearchedItem] = useState<any>();

    /* 선택된 아이템 */
    const [selectedItem, setSelectItem] = useState<any>();
    //const [selectedIndex, setSelectedIndex] = useState<number>(0);

    /* const [width, setWidth] = useState<number>(); */

    const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
    const autoCompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value != undefined) {
            AxiosWrapper.post("/rona/api/searchName?itemName=" + value).then((data: any) => {
                setSearchedItem(data.data.result.info)
            })
            setShowAutoComplete(true);
        } else {
            setSearchedItem([]);
            setShowAutoComplete(false);
        }
    }, [value])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target as Node)) {
                setShowAutoComplete(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /* useEffect(() => {
        if (searchedItem !== undefined) {
            setSelectItem(searchedItem[selectedIndex]);
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [searchedItem]) */

    /* useEffect(() => {
        if (searchedItem !== undefined) {
            setSelectItem(searchedItem[selectedIndex]);
        }
    }, [selectedIndex]); */

    /* useEffect(() => {
        sizeChecking(size);
    }, [])

    const sizeChecking = (size: string) => {
        if (size == "lg") {
            setWidth(500)
        } else if (size == "md") {
            setWidth(350)
        } else if (size == "sm") {
            setWidth(250)
        }
    } */

    const hiddenChecking = (): any => {
        if (value === undefined || value.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    /* const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => (prevIndex - 1 + searchedItem.length) % searchedItem.length)
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex(prevItem => (prevItem + 1) % searchedItem.length);
        } else if (event.key === 'Enter') {
            //const selectedItem = JSON.parse(localStorage.getItem('selectedItem') || '{}');
            navigator("/ItemSalePage", { state: { data: selectedItem } })
        }
    } */

    const getItemClassName = (index: any) => {
        return searchedItem[index] === selectedItem ? 'auto-search-items selected' : 'auto-search-items';
    };

    const handleItemClick = (item: any) => {
        onSearch(item);
        setValue(""); // 선택한 아이템으로 검색창을 초기화하거나 필요한 로직 추가
        setShowAutoComplete(false); // 아이템을 선택하면 미리보기를 숨김
    };

    return (
        <Row className='p-0 m-0 search-bar'>
            <Col xs={12} md={12} className='p-0 m-0 d-flex justify-content-center'>
                <Form.Control size='lg' onChange={(e: any) => setValue(e.target.value)} placeholder='아이템 검색..' style={{width:size}}/>
            </Col>
            <Col xs={12} md={12} className='p-0 m-0'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {showAutoComplete && ( <div ref={autoCompleteRef} className='auto-search-box' hidden={hiddenChecking()} style={{width:size}}>
                        {searchedItem?.map((item: any, index: number) => (
                            <div key={index} className={ getItemClassName(index) }
                                onMouseOver={() => { setSelectItem(item) }}
                                onClick={() => handleItemClick(item)}
                                style={{cursor:'pointer'}}>{item.itemName}</div>
                                /* onClick={() => { navigator("/ItemSalePage", { state: { data: item }})}}  */
                        ))}
                    </div>
                )}
                </div>
            </Col>
        </Row>
    )
}
export default SearchBar;