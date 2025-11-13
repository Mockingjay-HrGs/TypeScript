import { Repository } from "./models/repository/repository";
import { User } from "./models/user";


const userRepo = new Repository<User>();

userRepo.add({ id: 1, name: "Alice", age: 22 });
userRepo.add({ id: 2, name: "Bob", age: 30 });

console.log("All:", userRepo.getAll());
console.log("Get 1:", userRepo.getById(1));

userRepo.update(2, { id: 2, name: "Bobby", age: 31 });

userRepo.delete(1);

console.log("Final:", userRepo.getAll());
