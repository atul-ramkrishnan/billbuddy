import React from 'react';
import NiceList from "../ui/NiceList";
import NiceListItem from "../ui/NiceListItem";

export interface IPersonListItem {
    id: number;
    name: string;
    cost: number;
}

interface IPeopleListProps {
    people: IPersonListItem[];
    onPersonClick: (id: number) => void;
    activeId?: number | null;
}

const PeopleList: React.FC<IPeopleListProps> = ({ people, activeId = null, onPersonClick }) => {
    const items = people.map((person) => (
        <NiceListItem
            key={person.id}
            text={person.name}
            isActive={activeId === person.id}
            badgeText={person.cost > 0 ? `${person.cost.toFixed(2)} $` : ''}
            onClick={() => onPersonClick(person.id)}
        />
    ));

    return <NiceList>{items}</NiceList>;
};

export default PeopleList;