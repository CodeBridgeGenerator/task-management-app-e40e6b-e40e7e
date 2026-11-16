
import { faker } from "@faker-js/faker";
export default (user,count,managerIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
startDate: faker.date.recent(""),
dueDate: faker.date.recent(""),
managerId: managerIdIds[i % managerIdIds.length],
progress: faker.number.int(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
