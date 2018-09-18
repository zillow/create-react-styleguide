/* eslint-disable no-confusing-arrow */

import { css } from 'styled-components';

const ButtonDefault = css`
    color: #fff;
    background-color: #6c747d;
    border-color: #6c757d;

    &:hover {
        color: #fff;
        background-color: #5a6268;
        border-color: #545b62;
    }
`;

const ButtonPrimary = css`
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;

    &:hover {
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
    }
`;

const ButtonDefaultOutline = css`
    color: #6c757d;
    background-color: transparent;
    border-color: #6c757d;

    &:hover {
        background-color: #6c757d;
    }
`;

const ButtonPrimaryOutline = css`
    color: #007bff;
    background-color: transparent;
    border-color: #007bff;

    &:hover {
        background-color: #007bff;
    }
`;

const Button = css`
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    ${props => (!props.outline && props.type === 'primary' ? ButtonPrimary : ButtonDefault)}
    ${props => (props.outline && props.type === 'primary' ? ButtonPrimaryOutline : '')}
    ${props => (props.outline && props.type !== 'primary' ? ButtonDefaultOutline : '')}
`;

export default {
    Button,
};
