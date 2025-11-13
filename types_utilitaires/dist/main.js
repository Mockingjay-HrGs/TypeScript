"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./types/config");
// 1. Test UserPreview
const preview = {
    id: 1,
    name: "Alice",
    avatar: "avatar.png"
};
console.log("UserPreview:", preview);
// 2. Test Nullable<T>
const nullableProduct = {
    id: null,
    title: "Test",
    price: null
};
console.log("NullableProduct:", nullableProduct);
// 3. Test Record
console.log("App config:", config_1.config);
