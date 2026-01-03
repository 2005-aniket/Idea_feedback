const ideasContainer = document.getElementById("ideasContainer");

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

function saveIdeas() {
  localStorage.setItem("ideas", JSON.stringify(ideas));
}

function addIdea() {
  const title = document.getElementById("ideaTitle").value.trim();
  const description = document.getElementById("ideaDescription").value.trim();

  if (!title || !description) {
    alert("Please fill in all fields.");
    return;
  }

  ideas.push({
    id: Date.now(),
    title,
    description,
    feedback: []
  });

  saveIdeas();
  renderIdeas();

  document.getElementById("ideaTitle").value = "";
  document.getElementById("ideaDescription").value = "";
}

function deleteIdea(id) {
  if (!confirm("Are you sure you want to delete this idea?")) return;

  ideas = ideas.filter(idea => idea.id !== id);
  saveIdeas();
  renderIdeas();
}

function editIdea(id) {
  const idea = ideas.find(i => i.id === id);

  const newTitle = prompt("Edit Idea Title", idea.title);
  const newDescription = prompt("Edit Idea Description", idea.description);

  if (newTitle && newDescription) {
    idea.title = newTitle;
    idea.description = newDescription;
    saveIdeas();
    renderIdeas();
  }
}

function addFeedback(ideaId, inputId) {
  const feedbackText = document.getElementById(inputId).value.trim();
  if (!feedbackText) return;

  const idea = ideas.find(i => i.id === ideaId);
  idea.feedback.push(feedbackText);

  saveIdeas();
  renderIdeas();
}

function renderIdeas() {
  ideasContainer.innerHTML = "";

  ideas.forEach(idea => {
    const feedbackInputId = `feedback-${idea.id}`;

    const ideaDiv = document.createElement("div");
    ideaDiv.className = "card";

    ideaDiv.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>

      <button class="edit-btn" onclick="editIdea(${idea.id})">Edit</button>
      <button class="delete-btn" onclick="deleteIdea(${idea.id})">Delete</button>

      <h4>Feedback</h4>
      ${idea.feedback.map(f => `<div class="feedback">${f}</div>`).join("")}

      <input type="text" id="${feedbackInputId}" placeholder="Add feedback" />
      <button onclick="addFeedback(${idea.id}, '${feedbackInputId}')">
        Submit Feedback
      </button>
    `;

    ideasContainer.appendChild(ideaDiv);
  });
}

renderIdeas();
