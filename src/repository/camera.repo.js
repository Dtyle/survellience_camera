const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


class CameraRepository {
    async insertCamera(sequelize, { camera_id, camera_name, camera_location, camera_url }) {
        try {
            const insertQuery = `
                INSERT INTO camera_details 
                (camera_id, camera_name, camera_location, camera_url, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, NOW(), NOW())
            `;

            await sequelize.query(insertQuery, {
                replacements: [camera_id, camera_name, camera_location, camera_url],
            });

            return {
                camera_id,
                camera_name,
                camera_location,
                camera_url,
            };
        } catch (error) {
            throw error;
        }
    }

      async bulkInsertCameras(sequelize, dataArray) {
        if (!dataArray.length) return 0;

        const values = dataArray.map(item => `(
            ${sequelize.escape(item.camera_id)},
            ${sequelize.escape(item.camera_name)},
            ${sequelize.escape(item.camera_location)},
            ${sequelize.escape(item.camera_url)},
            NOW(),
            NOW()
        )`).join(",");

        const insertQuery = `
            INSERT INTO camera_details 
            (camera_id, camera_name, camera_location, camera_url, createdAt, updatedAt)
            VALUES ${values}
        `;

        const [result] = await sequelize.query(insertQuery);

        return dataArray.length; 
    }
}
    


module.exports = new CameraRepository();

