document.addEventListener("DOMContentLoaded", function () {
  loadUserUploads();
});

//Loads the files uploaded by user
function loadUserUploads() {
  let loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let uploads = JSON.parse(localStorage.getItem("uploads")) || [];
  let userUploads = uploads.filter(
    (upload) => upload.userId === loggedInUserId
  );

  let tableBody = document.getElementById("uploadsTableBody");
  tableBody.innerHTML = "";

  userUploads.forEach((upload) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${upload.label}</td>
            <td>${upload.fileName}</td>
            <td>
                <button onclick="openEditUploadModal(${upload.id})">Edit</button>
                <button onclick="openDeleteUploadModal(${upload.id})">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

//Function to open add upload popup
function openAddUploadModal() {
  fetch("AddUpload.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("addUploadModal").innerHTML = html;
      document.getElementById("addUploadModal").style.display = "block";
    });
}

//Function to open edit upload popup
function openEditUploadModal(uploadId) {
  fetch("EditDocument.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("editUploadModal").innerHTML = html;
      document.getElementById("editUploadModal").style.display = "block";
      loadEditUploadData(uploadId);
    });
}

//Function to open delete popup for seelcted file
function openDeleteUploadModal(uploadId) {
  fetch("DeleteUpload.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("deleteUploadModal").innerHTML = html;
      document.getElementById("deleteUploadModal").style.display = "block";
      document
        .getElementById("deleteConfirmBtn")
        .setAttribute("onclick", `deleteUpload(${uploadId})`);
    });
}

//Saves the uploaded files in localstorage
function saveUpload() {
  let hasError = false;
  const label = document.getElementById("uploadLabel").value.trim();
  const filename = document.getElementById("uploadFilename").value.trim();
  const labelError = document.getElementById("labelError");
  const filenameError = document.getElementById("filenameError");
  labelError.textContent = "";
  filenameError.textContent = "";

  // Validation: Label and Filename
  if (label === "") {
    labelError.textContent = "Label is required.";
    hasError = true;
  } else {
    labelError.textContent = "";
  }

  if (filename === "") {
    filenameError.textContent = "Filename is required.";
    hasError = true; // Set flag to indicate an error
  } else {
    filenameError.textContent = "";
  }

  if (hasError) return; // Stop execution only if any error exists
  const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let uploads = JSON.parse(localStorage.getItem("uploads")) || [];

  // Create new upload object
  const newUpload = {
    id: Date.now(),
    userId: loggedInUserId,
    label: label,
    fileName: filename,
  };

  // Save to local storage
  uploads.push(newUpload);
  localStorage.setItem("uploads", JSON.stringify(uploads));

  // Refresh the list and close modal
  loadUploads();
  closeAddUploadModal();
}

//Loads edit popup data
function loadEditUploadData(uploadId) {
  let uploads = JSON.parse(localStorage.getItem("uploads")) || [];
  let upload = uploads.find((u) => u.id === uploadId);
  if (!upload) {
    alert("Upload not found!");
    return;
  }
  document.getElementById("editUploadLabel").value = upload.label;
  document.getElementById("editUploadFilename").value = upload.fileName;
  document.getElementById("editUploadModal").style.display = "block";
}

//Function for update for uploaded files data
function updateUpload() {
  let updatedLabel = document.getElementById("editUploadLabel").value.trim();
  let updatedFilename = document
    .getElementById("editUploadFilename")
    .value.trim();

  if (updatedLabel === "" || updatedFilename === "") {
    alert("Both fields are required.");
    return;
  }

  let uploads = JSON.parse(localStorage.getItem("uploads")) || [];

  // Find upload based on label and filename instead of ID
  let uploadIndex = uploads.findIndex(
    (upload) => upload.label === updatedLabel
  );

  if (uploadIndex === -1) {
    alert("Upload not found!");
    return;
  }

  // Update the found upload
  uploads[uploadIndex].label = updatedLabel;
  uploads[uploadIndex].fileName = updatedFilename;

  // Save back to local storage
  localStorage.setItem("uploads", JSON.stringify(uploads));

  // Reload the uploads and close modal
  loadUploads();
  closeEditUploadModal();
}

//Loads uploaded files data
function loadUploads() {
  const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let uploads = JSON.parse(localStorage.getItem("uploads")) || [];
  const myUploads = uploads.filter(
    (upload) => upload.userId === loggedInUserId
  );
  const uploadTableBody = document.getElementById("uploadsTableBody");
  uploadsTableBody.innerHTML = "";
  myUploads.forEach((upload) => {
    let row = `<tr>
            <td>${upload.label}</td>
            <td>${upload.fileName}</td>
            <td>
                <button onclick="loadEditUploadData(${upload.id})">Edit</button>
                <button onclick="deleteUpload(${upload.id})">Delete</button>
            </td>
        </tr>`;
    uploadTableBody.innerHTML += row;
  });
}

//Closes add popup
function closeAddUploadModal() {
  document.getElementById("addUploadModal").style.display = "none";
}

//Closes edit popup
function closeEditUploadModal() {
  document.getElementById("editUploadModal").style.display = "none";
}

//Function to delete the files
function deleteUpload(uploadId) {
  let allUploads = JSON.parse(localStorage.getItem("uploads")) || [];
  let updatedUploads = allUploads.filter((upload) => upload.id !== uploadId);
  localStorage.setItem("uploads", JSON.stringify(updatedUploads));
  closeDeleteUploadModal();
  loadUploads();
}

// Close Delete Upload Modal
function closeDeleteUploadModal() {
  document.getElementById("deleteUploadModal").style.display = "none";
}


//Close the edit modal
function closeModal() {
    document.getElementById("editUploadModal").style.display = "none";
}