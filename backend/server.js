require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

const BASE_URL = "http://localhost:5000"; // Change this for production

// API to shorten a URL
app.post("/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url || !/^https?:\/\/\S+$/.test(url)) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    const slug = nanoid(6); // Generate a unique short URL

    try {
        const result = await pool.query(
            "INSERT INTO urls (slug, original_url) VALUES ($1, $2) RETURNING slug",
            [slug, url]
        );

        res.json({ shortUrl: `${BASE_URL}/${result.rows[0].slug}` });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

// API to redirect a short URL
app.get("/:slug", async (req, res) => {
    const { slug } = req.params;

    try {
        const result = await pool.query("SELECT original_url FROM urls WHERE slug = $1", [slug]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.redirect(result.rows[0].original_url);
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});