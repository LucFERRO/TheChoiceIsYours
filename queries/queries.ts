const getUsers = "SELECT * FROM userz"
const addUser = "INSERT INTO userz (username, password, firstname, lastname, date_of_birth, email, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7)"

module.exports = {
    getUsers,
    addUser,
}