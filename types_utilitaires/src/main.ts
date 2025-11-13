import { UserPreview } from "./types/user";
import { NullableProduct } from "./types/nullable";
import { config } from "./types/config";

const preview: UserPreview = {
    id: 1,
    name: "Alice",
    avatar: "avatar.png"
};
console.log("UserPreview:", preview);

const nullableProduct: NullableProduct = {
    id: null,
    title: "Test",
    price: null
};
console.log("NullableProduct:", nullableProduct);

console.log("App config:", config);
