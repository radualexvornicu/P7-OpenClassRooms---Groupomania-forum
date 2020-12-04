module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        catname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        catdescription: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Categories;
}