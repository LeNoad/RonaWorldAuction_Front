import { ButtonProps as BaseButtonProps } from '@restart/ui/Button';
import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from 'react-bootstrap/esm/helpers';
import { ButtonVariant } from 'react-bootstrap/esm/types';

export interface MyButtonProps extends BaseButtonProps, Omit<BsPrefixProps, 'as'> {
    active?: boolean;
    variant?: ButtonVariant;
    size?: 'sm' | 'md' |'lg';
}

/* Button 타입선언 모듈확장 중  => 사이즈 별로 들어가도록 */
const Btn: React.FC<MyButtonProps> = (props) => {
    const { size, style, ...rest } = props;
    let sizePx = 0;
    if(size === 'sm') {
        sizePx = 25
    } else if(size === 'md') {
        sizePx = 35
    } else if(size === 'lg') {
        sizePx = 50
    }
    return (<Button style={{height:sizePx, ...style }} {...rest} >{props.children}</Button>)
}

export default Btn;
