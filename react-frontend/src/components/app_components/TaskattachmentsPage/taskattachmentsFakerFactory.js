
import { faker } from "@faker-js/faker";
export default (user,count,taskIdIds,uploadedByIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
taskId: taskIdIds[i % taskIdIds.length],
fileName: faker.lorem.sentence(""),
fileUrl: faker.lorem.sentence(""),
uploadedBy: uploadedByIds[i % uploadedByIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
