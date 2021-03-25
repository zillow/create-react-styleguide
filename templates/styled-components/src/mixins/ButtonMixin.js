import { css } from 'styled-components';

export const ButtonMixin = ({ outline, theme, variant }) => {
    const colors = theme.Button[`${variant}${outline ? 'Outline' : ''}`];

    return css`
        cursor: pointer;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        background-color: ${colors.backgroundColor};
        border-color: ${colors.borderColor};
        color: ${colors.color};

        &:hover {
            background-color: ${colors.hoverBackgroundColor};
            border-color: ${colors.hoverBorderColor};
            color: ${colors.hoverColor};
        }
    `;
};
