module.exports = (sequelize, Sequelize) => {
    const Topics = sequelize.define("topics", {
       topicsubject:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        topicdate:{
            type: Sequelize.DATE(6),  
            defaultValue: Sequelize.NOW
        }
    });
    return Topics;
}