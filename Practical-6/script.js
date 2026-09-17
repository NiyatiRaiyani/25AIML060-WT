let students = [];
let currentPage = 1;

const recordsPerPage = 6;


// Load student data
async function loadStudents() {

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    loading.style.display = "block";
    error.textContent = "";

    try {

        const response = await fetch("students.json");

        if (!response.ok) {
            throw new Error("Unable to load student data.");
        }

        students = await response.json();

        currentPage = 1;

        displayStudents();

    }
    catch (err) {

        error.textContent = err.message;

    }
    finally {

        loading.style.display = "none";

    }
}


// Get filtered students
function getFilteredStudents() {

    const searchText =
        document.getElementById("search")
        .value
        .toLowerCase();

    const department =
        document.getElementById("department").value;

    let result = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText)
        );

    });


    // Department filter
    if (department !== "all") {

        result = result.filter(function(student) {

            return student.department === department;

        });

    }


    return result;
}


// Sort students
function sortStudents(studentList) {

    const sortValue =
        document.getElementById("sort").value;


    if (sortValue === "nameAsc") {

        studentList.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    else if (sortValue === "nameDesc") {

        studentList.sort(function(a, b) {

            return b.name.localeCompare(a.name);

        });

    }


    else if (sortValue === "cgpaHigh") {

        studentList.sort(function(a, b) {

            return b.cgpa - a.cgpa;

        });

    }


    else if (sortValue === "cgpaLow") {

        studentList.sort(function(a, b) {

            return a.cgpa - b.cgpa;

        });

    }


    return studentList;
}


// Display students
function displayStudents() {

    let result = getFilteredStudents();

    result = sortStudents(result);


    const start =
        (currentPage - 1) * recordsPerPage;

    const end =
        start + recordsPerPage;


    const pageStudents =
        result.slice(start, end);


    const studentList =
        document.getElementById("studentList");


    studentList.innerHTML = "";


    if (pageStudents.length === 0) {

        studentList.innerHTML =
            "<p>No student records found.</p>";

    }

    else {

        pageStudents.forEach(function(student) {

            studentList.innerHTML += `

                <div class="student">

                    <p class="student-id">
                        Student ID: ${student.id}
                    </p>

                    <span class="badge">
                        ${student.department}
                    </span>

                    <h3>
                        ${student.name}
                    </h3>

                    <p>
                        <strong>Email:</strong>
                        ${student.email}
                    </p>

                    <p>
                        <strong>Department:</strong>
                        ${student.department}
                    </p>

                    <p>
                        <strong>Year:</strong>
                        ${student.year}
                    </p>

                    <p>
                        <strong>CGPA:</strong>
                        ${student.cgpa}
                    </p>

                    <p>
                        <strong>City:</strong>
                        ${student.city}
                    </p>

                </div>

            `;

        });

    }


    document.getElementById("count").textContent =
        "Total Students: " + result.length;


    updatePagination(result.length);
}


// Update pagination
function updatePagination(totalStudents) {

    let totalPages =
        Math.ceil(totalStudents / recordsPerPage);


    if (totalPages === 0) {
        totalPages = 1;
    }


    document.getElementById("page").textContent =
        "Page " + currentPage + " of " + totalPages;


    document.getElementById("previous").disabled =
        currentPage === 1;


    document.getElementById("next").disabled =
        currentPage === totalPages;
}


// Search event
document.getElementById("search").addEventListener(
    "input",
    function() {

        currentPage = 1;

        displayStudents();

    }
);


// Department filter event
document.getElementById("department").addEventListener(
    "change",
    function() {

        currentPage = 1;

        displayStudents();

    }
);


// Sort event
document.getElementById("sort").addEventListener(
    "change",
    function() {

        currentPage = 1;

        displayStudents();

    }
);


// Previous button event
document.getElementById("previous").addEventListener(
    "click",
    function() {

        if (currentPage > 1) {

            currentPage--;

            displayStudents();

        }

    }
);


// Next button event
document.getElementById("next").addEventListener(
    "click",
    function() {

        const result = getFilteredStudents();

        const totalPages =
            Math.ceil(result.length / recordsPerPage);


        if (currentPage < totalPages) {

            currentPage++;

            displayStudents();

        }

    }
);


// Reload button event
document.getElementById("reloadBtn").addEventListener(
    "click",
    function() {

        loadStudents();

    }
);


// Load data when page opens
loadStudents();