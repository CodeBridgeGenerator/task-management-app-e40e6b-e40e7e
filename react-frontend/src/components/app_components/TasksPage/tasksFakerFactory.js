
import { faker } from "@faker-js/faker";
export default (user,count,projectIdIds,assigneeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
title: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
projectId: projectIdIds[i % projectIdIds.length],
assigneeId: assigneeIdIds[i % assigneeIdIds.length],
priority: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
dueDate: faker.date.recent(""),
startDate: faker.date.recent(""),
tags: faker.lorem.sentence(""),
estimatedHours: faker.number.int(""),
completedAt: faker.date.recent(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
