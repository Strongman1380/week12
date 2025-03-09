const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique IDs

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend access
app.use(cors());
app.use(express.json());

let entities = [
    { id: uuidv4(), name: "Sample Entity" }
];

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: "Server is running", port: PORT });
});

// Fetch all entities
app.get('/entities', (req, res) => {
    res.json(entities);
});

// Add a new entity
app.post('/entities', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Entity name is required" });
    }

    const newEntity = { id: uuidv4(), name };
    entities.push(newEntity);
    res.status(201).json({ message: "Entity added successfully!", entity: newEntity });
});

// Delete an entity
app.delete('/entities/:id', (req, res) => {
    const entityId = req.params.id;
    const entityIndex = entities.findIndex(entity => entity.id === entityId);

    if (entityIndex === -1) {
        return res.status(404).json({ error: "Entity not found" });
    }

    entities.splice(entityIndex, 1);
    res.status(200).json({ message: "Entity deleted successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});