const AdminLogin = require("../../repository/admin_Login.repo.js");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const bcrypt = require("bcryptjs");

// Admin Signin (Create Admin)
exports.signUpAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).send("All input is required");
    }

    // Check if admin already exists
    let existingAdmin = await AdminLogin.getByEmailId(email, req.models.user_login);
    if (existingAdmin) {
        return res.status(409).json({ message: "Admin already exists. Please login." });
    }

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // Create admin
    const newAdmin = {
        email: email,
        password: encryptedPassword,
        status: 1 // active status
    };

    try {
        let admin = await AdminLogin.create(newAdmin,req.models.user_login);
        res.status(201).json({
            status: true,
            message: "Admin registered successfully",
            data: admin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while creating admin" });
    }
};

// Admin Login (Create token)
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(400).json({ status: false, message: "All input is required" });
    }

    try {
        // Fetch user from user_login table by username
       const user = await AdminLogin.getByUsername(username, req.models.user_login);

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

      const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                user_id: user.id,
                username: user.username
            },
            config.secretKey,
            { expiresIn: 86400 } // 24 hours
        );

        return res.status(200).json({
            status: true,
            message: "Login successful",
            token: token
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
