import React from 'react';

interface INiceListItemProps {
    text: string | JSX.Element;
    badgeText?: string;
    onClick?: () => void;
    isActive?: boolean;
}

const NiceListItem: React.FC<INiceListItemProps> = ({
    text,
    badgeText = '',
    onClick = () => {},
    isActive = false
}) => {
    const className = "list-group-item" + (isActive === true ? ' active' : '');
    const badge = badgeText !== '' ? <span className="badge">{badgeText}</span> : null;
    return (
        <li className={className} onClick={onClick}>
            {text}
            {badge}
        </li>
    )
};

export default NiceListItem;