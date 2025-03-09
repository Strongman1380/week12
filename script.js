document.addEventListener("DOMContentLoaded", () => {
    fetchEntities();
});

// Fetch entities from the server
async function fetchEntities() {
    try {
        const response = await fetch("http://localhost:5001/entities");
        if (!response.ok) throw new Error("Failed to fetch entities");

        const data = await response.json();
        displayEntities(data);
    } catch (error) {
        console.error("Error fetching entities:", error);
    }
}

// Display entities in the UI
function displayEntities(entities) {
    const entityList = document.querySelector("#entityList");
    entityList.innerHTML = "";

    entities.forEach(entity => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${entity.name}
            <button class="btn btn-danger btn-sm" onclick="deleteEntity('${entity.id}')">Delete</button>
        `;
        entityList.appendChild(li);
    });
}

// Add new entity
document.querySelector("#entityForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const entityName = document.querySelector("#entityName").value;
    if (!entityName) return alert("Please enter an entity name");

    try {
        const response = await fetch("http://localhost:5001/entities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: entityName })
        });

        if (!response.ok) throw new Error("Failed to add entity");

        document.querySelector("#entityName").value = ""; // Clear input field
        fetchEntities(); // Refresh list
    } catch (error) {
        console.error("Error adding entity:", error);
    }
});

// Delete entity
async function deleteEntity(id) {
    try {
        const response = await fetch(`http://localhost:5001/entities/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete entity");

        console.log(`Entity ${id} deleted successfully`);
        fetchEntities(); // Refresh list after deletion
    } catch (error) {
        console.error("Error deleting entity:", error);
    }
}