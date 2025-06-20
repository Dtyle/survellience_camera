const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


class CameraoverviewRepository {
    async fetchCameraOverview(sequelize, date) {
        try {
            const query = `
                SELECT 
                    -- Total camera count
                    (SELECT COUNT(*) 
                     FROM camera_details 
                     WHERE DATE(createdAt) = :date) AS total_cameras,

                    -- Off Duty (disconnected camera count)
                    (SELECT COUNT(*) 
                     FROM disconnected_cameras dc
                     JOIN camera_details cd ON cd.camera_id = dc.camera_id
                     WHERE DATE(cd.createdAt) = :date) AS off_duty_cameras,

                    -- On Duty (total - disconnected)
                    (
                        (SELECT COUNT(*) 
                         FROM camera_details 
                         WHERE DATE(createdAt) = :date)
                        -
                        (SELECT COUNT(*) 
                         FROM disconnected_cameras dc
                         JOIN camera_details cd ON cd.camera_id = dc.camera_id
                         WHERE DATE(cd.createdAt) = :date)
                    ) AS on_duty_cameras
            `;

            const [result] = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });

            return result;
        } catch (error) {
            console.error("Error in fetchCameraOverview repository:", error);
            throw error;
        }
    }
}

module.exports = new CameraoverviewRepository();
