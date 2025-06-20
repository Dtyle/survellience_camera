const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


class CameraAnalyticsRepository {
    async fetchCameraAnalytics(sequelize, date) {
        try {
            const query = `
                SELECT 
                    -- 1. Camera Up Count
                    (SELECT COUNT(*) FROM camera_details WHERE DATE(createdAt) = :date) AS camera_up_count,

                    -- 2. Camera Down Count
                    (SELECT COUNT(*) FROM disconnected_cameras dc
                     JOIN camera_details cd ON cd.camera_id = dc.camera_id
                     WHERE DATE(cd.createdAt) = :date) AS camera_down_count,

                    -- 3. Most Unstable Camera (camera_name with most disconnects)
        (
            SELECT cd.camera_name
            FROM disconnected_cameras dc
            JOIN camera_details cd ON cd.camera_id = dc.camera_id
            WHERE DATE(cd.createdAt) = :date
            GROUP BY dc.camera_id, cd.camera_name
            ORDER BY COUNT(dc.id) DESC
            LIMIT 1
        ) AS most_unstable_camera,

                    -- 4. Average Downtime Duration (in minutes)
                    (SELECT ROUND(AVG(dc.downtime_duration_minutes), 2)
                     FROM disconnected_cameras dc
                     JOIN camera_details cd ON cd.camera_id = dc.camera_id
                     WHERE DATE(cd.createdAt) = :date) AS avg_downtime_minutes
            `;

            const [result] = await sequelize.query(query, {
                replacements: { date },
                type: sequelize.QueryTypes.SELECT,
            });

            return result;
        } catch (error) {
            console.error("Error in fetchCameraAnalytics repository:", error);
            throw error;
        }
    }
}

module.exports = new CameraAnalyticsRepository();
