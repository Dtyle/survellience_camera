const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class CameraTrafficAnalysisRepo {
   async fetchCameraTrafficAnalysis(sequelize, camera_id) {
    try {
        const replacements = {};
        let whereClause = "";

        if (camera_id) {
            whereClause = "WHERE dc.camera_id LIKE :camera_id";
            replacements.camera_id = `%${camera_id}%`;
        }

       const query = `
    SELECT 
        dc.camera_id,
        dc.downtime_duration_minutes AS total_downtime_minutes,
        DATE_FORMAT(dc.downtime_start, '%H:%i:%s') AS last_seen
    FROM 
        disconnected_cameras dc
    ${whereClause}
    ORDER BY TIME(dc.downtime_start) ASC
`;

        const countQuery = `
            SELECT COUNT(*) AS total
            FROM disconnected_cameras dc
            ${whereClause}
        `;

        const data = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        const countResult = await sequelize.query(countQuery, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        return {
            data,
            total: countResult[0].total,
        };
    } catch (error) {
        console.error("Error in fetchCameraTrafficAnalysis:", error);
        throw error;
    }
}

}

module.exports = new CameraTrafficAnalysisRepo();
