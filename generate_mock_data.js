const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateUsers = () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = {
      userId: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      registeredAt: faker.date.past(),
    };
    users.push(user);
  }
  return users;
};

const saveUsers = (users) => {
  const jsonData = JSON.stringify(users);
  fs.writeFileSync("users.json", jsonData);
};

const generateAndSaveUsers = () => {
  const users = generateUsers();
  saveUsers(users);
  console.log("Users generated and saved successfully!");
};

generateAndSaveUsers();
