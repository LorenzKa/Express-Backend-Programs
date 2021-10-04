export interface ICustomer {
    id: number;
    firstname: string;
    lastname: string;
}

export const customers: ICustomer[] = [
    {
        id: 1,
        firstname: 'Hans',
        lastname: 'Meyer',
    },
    {
        id: 2,
        firstname: 'Rainer',
        lastname: 'Zufall',
    },
    {
        id: 3,
        firstname: 'Max',
        lastname: 'Franz',
    },
    {
        id: 4,
        firstname: 'Jakob',
        lastname: 'Schlager',
    },
]