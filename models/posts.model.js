module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        postcontent: {
            type: Sequelize.STRING,
            allowNull:false
        },
        postdate: {
            type: Sequelize.DATE(6),  
            defaultValue: Sequelize.NOW
        }
    });
    return Posts;
}