const dal = require("../data-access-layer/dal");

async function register(user) {
    const sql = `INSERT INTO Users VALUES(DEFAULT, ${user.targetId}, '${user.firstName}', '${user.lastName}', '${user.email}', 
    '${user.password}', '${user.gender}', ${user.height}, ${user.width}, ${user.fatPercantage}, DEFAULT, ${user.isAdmin})`;
    console.log(user);
    const info = await dal.executeAsync(sql);
    user.userId = info.insertId;
    return user;
}

async function login(credentials) {
    const sql = `SELECT * FROM Users
        WHERE email = '${credentials.email}'
        AND password = '${credentials.password}'`;
    const users = await dal.executeAsync(sql);
    const user = users[0];
    return user;
}

async function updateUser(user) {
    let sql = `UPDATE users SET `;
    if (user.firstName !== undefined) {
        sql += `firstName = '${user.firstName}',`;

    }
    if (user.lastName !== undefined) {
        sql += `lastName = '${user.lastName}',`;

    }
    if (user.email !== undefined) {
        sql += `email = '${user.email}',`;

    }
    if (user.password !== undefined) {
        sql += `password = '${user.password}',`;

    }
    if (user.gender !== undefined) {
        sql += `gender = '${user.gender}',`;

    }
    if (user.height !== undefined) {
        sql += `height = ${user.height},`;

    }
    if (user.width !== undefined) {
        sql += `width = ${user.width},`;

    }
    if (user.fatPercantage	 !== undefined) {
        sql += `fatPercantage = ${user.fatPercantage	},`;

    }
    if (user.process !== undefined) {
        sql += `process = ${user.process	},`;

    }
    sql = sql.substr(0, sql.length - 1);
    sql += ` WHERE userId = ${user.userId}`;

    const info = await dal.executeAsync(sql);
    if (info.affectedRows) {
        return user;
    }

    return null;

}

module.exports = {
    register,
    login,
    updateUser
};
