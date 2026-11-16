
import { faker } from "@faker-js/faker";
export default (user,count,taskIdIds,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
taskId: taskIdIds[i % taskIdIds.length],
userId: userIdIds[i % userIdIds.length],
comment: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
