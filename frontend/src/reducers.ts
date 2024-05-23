import {Person, Product} from "./Logic";
import {Reducer} from 'redux';
import {
    ADD_PERSON,
    ADD_PRODUCT,
    AddPersonAction,
    AddProductAction,
    CLEAR_PEOPLE,
    CLEAR_PRODUCTS, ClearAction,
    DELETE_PERSON,
    DELETE_PRODUCT,
    DeleteAction,
    EDIT_PERSON, EDIT_PRODUCT, EditAction,
    SELECT_PERSON,
    SELECT_PRODUCT,
    SelectAction,
    SET_INITIAL_STATE,
    SetInitialStateAction,
} from "./actions";


export interface IAppState {
    people: Person[];
    selectedPersonId: number | null;
    selectedProductId: number | null;
}

const initialAppState: IAppState = {
    people: [
    ],
    selectedPersonId: null,
    selectedProductId: null
};

export type ActionType = SelectAction | AddPersonAction | AddProductAction | DeleteAction | ClearAction | EditAction | SetInitialStateAction;

const appReducer: Reducer<IAppState, ActionType> = (state = initialAppState, action) => {
    let newState = {...state};
    switch (action.type) {
        case SELECT_PRODUCT:
            return {...state, selectedProductId: action.id};
        case SELECT_PERSON:
            return {...state, selectedPersonId: action.id};
            case ADD_PERSON:
                let personId: number | null = -1;
                if (!newState.people || newState.people.length === 0) {
                    personId = 1;
                } else {
                    personId = newState.people[newState.people.length-1].id + 1;
                }
                // Create a new copy of the people array with the new person added
                const newPeople = [...newState.people, new Person(personId, action.name)];
                // Return a new state object with the updated people array
                return { ...newState, people: newPeople };
            
        case EDIT_PERSON:
            let per: Person|null = Person.findById(action.id, newState.people);
            if(per)
                per.name = action.name;
            return newState;
        case EDIT_PRODUCT:
            console.log('editProduct reducer');
            newState.people.forEach(person => {
                const idx = person.products.findIndex(p => p.id === action.id);
                if(idx > -1) {
                    console.log('Found product', idx);
                    let prod = person.products[idx];
                    prod.name = action.name;
                    prod.value = action.price;
                    if(action.setSelectedOwner) {
                        let newPerson: null|Person = Person.findById(state.selectedPersonId || -1, newState.people) || null;
                        if(newPerson) {
                            newPerson.products.push(prod);
                            person.products.splice(idx, 1);
                        }
                    }
                }
            });
            return newState;
        case DELETE_PERSON:
            newState.selectedPersonId = null;
            const idx = newState.people.findIndex(person => person.id === action.id);
            newState.people.splice(idx, 1);
            return newState;
        case ADD_PRODUCT:
            if (!state.selectedPersonId)return state;
            let person: Person | undefined = newState.people.find(person => person.id === state.selectedPersonId);
            if(!person)return state;
            person.products.push(new Product(person.id*1000 + person.products.length, action.name, action.value));
            console.log('New state', newState);
            return newState;
        case DELETE_PRODUCT:
            newState.selectedProductId = null;
            newState.people.forEach(person => {
                const idx = person.products.findIndex(prod => prod.id === action.id);
                if(idx > -1)
                    person.products.splice(idx, 1);
            });
            return newState;
        case CLEAR_PRODUCTS:
            let selPerson = Person.findById(action.personId, newState.people);
            if(selPerson !== null)
                selPerson.products = [];
            return newState;
        case CLEAR_PEOPLE:
            return {...state, people: [], selectedPersonId: null, selectedProductId: null};
        case SET_INITIAL_STATE:
            return action.payload;
        default: {
            return state;
        }
    }
};

export { appReducer };