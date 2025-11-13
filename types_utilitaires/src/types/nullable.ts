export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export interface Product {
    id: number;
    title: string;
    price: number;
}

export type NullableProduct = Nullable<Product>;
