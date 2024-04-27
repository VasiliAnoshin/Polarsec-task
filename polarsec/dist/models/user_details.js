"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDetails {
    constructor(name, age, city, total_distance_run, private_key, public_key) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.total_distance_run = total_distance_run;
        this.private_key = private_key;
        this.public_key = public_key;
    }
}
exports.default = UserDetails;
