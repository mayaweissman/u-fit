class User {
    constructor(userId, targetId, firstName, lastName, email, password,gender,height,width,fatPercantage,
        process, isAdmin){
        this.userId = userId;
        this.targetId = targetId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.height = height;
        this.width = width;
        this.fatPercantage = fatPercantage;
        this.process = process;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;