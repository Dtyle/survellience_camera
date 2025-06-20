module.exports = (sequelize, DataTypes) => {
    const user_login = sequelize.define(
        "user_login",
        {
          
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
         updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },

    },
    {
        freezeTableName: true,
        tableName: "user_login",
        timestamps: true,
    }
);

user_login.changeSchema = (schema) =>
    user_login.schema(schema, {
        schemaDelimiter: "`.`",
    });
return user_login;
};