import { FilterByType } from "./types/filterByType";
import { GetOptional } from "./types/getOptional";

// === TEST FilterByType ===
interface Mixed {
    name: string;
    age: number;
    active: boolean;
    count: number;
}

type OnlyNumbers = FilterByType<Mixed, number>;

const testNumbers: OnlyNumbers = {
    age: 25,
    count: 10
};

console.log("OnlyNumbers:", testNumbers);


// === TEST GetOptional ===
interface Product {
    id: number;
    name: string;
    description?: string;
    image?: string;
}

type OptionalKeys = GetOptional<Product>;

const testOptionalKey: OptionalKeys = "description";

console.log("Optional keys:", testOptionalKey);
