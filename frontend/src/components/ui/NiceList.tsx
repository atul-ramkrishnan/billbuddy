import React from 'react';

interface INiceListProps {
    children: React.ReactNode;
}

const NiceList: React.FC<INiceListProps> = (props) => {
        return (
            <ul className="list-group">
                {props.children}
            </ul>
        )

};

export default NiceList;