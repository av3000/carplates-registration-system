export class Carplate {
    _id: number;
    plate: string;
    name: string;
};

export class CarplatePaginated {
    items_per_page: number;
    total: number;
    page: number;
    carplates: Array<Carplate>;
}