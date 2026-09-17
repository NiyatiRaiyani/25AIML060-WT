// ==========================================
// CHARUSAT STUDENT PORTAL
// Practical 6 - Fetch API
// ==========================================


// Store all student records here after fetching JSON
let students = [];


// Current page number
let currentPage = 1;


// Number of students displayed on one page
const studentsPerPage = 6;


// Get HTML elements
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const yearFilter = document.getElementById("yearFilter");
const sortFilter = document.getElementById("sortFilter");

const studentTableBody = document.getElementById("studentTableBody");

const totalStudents = document.getElementById("totalStudents");
const aimlStudents = document.getElementById("aimlStudents");
const cseStudents = document.getElementById("cseStudents");
const itStudents = document.getElementById("itStudents");

const resultCount = document.getElementById("resultCount");

const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

const reloadBtn = document.getElementById("reloadBtn");


// ==========================================
// LOAD STUDENTS FROM EXTERNAL JSON
// ==========================================

async function loadStudents() {

    loadingMessage.style.display = "flex";
    errorMessage.style.display = "none";
    emptyMessage.style.display = "none";

    studentTableBody.innerHTML = "";

    try {

        // Fetch external JSON file
        const response = await fetch("students.json");

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error("Unable to fetch student data.");
        }

        // Convert JSON response into JavaScript data
        students = await response.json();

        // Reset page after loading data
        currentPage = 1;

        // Update dashboard statistics
        updateStatistics();

        // Display student records
        displayStudents();

    } catch (error) {

        console.error(error);

        errorMessage.style.display = "flex";

        studentTableBody.innerHTML = "";

        resultCount.textContent = "0 records";

        pageInfo.textContent = "Page 1 of 1";

    } finally {

        // Hide loading message after success or error
        loadingMessage.style.display = "none";
    }
}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics() {

    const total = students.length;

    const aiml = students.filter(function(student) {
        return student.department === "AIML";
    }).length;

    const cse = students.filter(function(student) {
        return student.department === "CSE";
    }).length;

    const it = students.filter(function(student) {
        return student.department === "IT";
    }).length;


    totalStudents.textContent = total;
    aimlStudents.textContent = aiml;
    cseStudents.textContent = cse;
    itStudents.textContent = it;
}


// ==========================================
// GET FILTERED STUDENTS
// ==========================================

function getFilteredStudents() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedDepartment = departmentFilter.value;

    const selectedYear = yearFilter.value;


    let filteredStudents = students.filter(function(student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.id.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText);


        const matchesDepartment =
            selectedDepartment === "All" ||
            student.department === selectedDepartment;


        const matchesYear =
            selectedYear === "All" ||
            student.year === selectedYear;


        return matchesSearch && matchesDepartment && matchesYear;
    });


    return filteredStudents;
}


// ==========================================
// SORT STUDENTS
// ==========================================

function sortStudents(studentList) {

    const sortValue = sortFilter.value;


    if (sortValue === "name-asc") {

        studentList.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

    } else if (sortValue === "name-desc") {

        studentList.sort(function(a, b) {
            return b.name.localeCompare(a.name);
        });

    } else if (sortValue === "cgpa-high") {

        studentList.sort(function(a, b) {
            return b.cgpa - a.cgpa;
        });

    } else if (sortValue === "cgpa-low") {

        studentList.sort(function(a, b) {
            return a.cgpa - b.cgpa;
        });
    }


    return studentList;
}


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents() {

    let filteredStudents = getFilteredStudents();

    filteredStudents = sortStudents(filteredStudents);


    // Update result count
    resultCount.textContent =
        filteredStudents.length + " records";


    // If there are no matching students
    if (filteredStudents.length === 0) {

        studentTableBody.innerHTML = "";

        emptyMessage.style.display = "block";

        updatePagination(0);

        return;
    }


    emptyMessage.style.display = "none";


    // Calculate total pages
    const totalPages =
        Math.ceil(filteredStudents.length / studentsPerPage);


    // If current page becomes greater than total pages
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    // Calculate start and end positions
    const startIndex =
        (currentPage - 1) * studentsPerPage;

    const endIndex =
        startIndex + studentsPerPage;


    // slice() gets only the records for current page
    const pageStudents =
        filteredStudents.slice(startIndex, endIndex);


    studentTableBody.innerHTML = "";


    // Display every student in the current page
    pageStudents.forEach(function(student) {

        let departmentClass = "";

        if (student.department === "AIML") {
            departmentClass = "badge-aiml";
        } else if (student.department === "CSE") {
            departmentClass = "badge-cse";
        } else {
            departmentClass = "badge-it";
        }


        const row = `
            <tr>

                <td>
                    <span class="student-id">
                        ${student.id}
                    </span>
                </td>

                <td>
                    <span class="student-name">
                        ${student.name}
                    </span>
                </td>

                <td>
                    <a
                        class="email"
                        href="mailto:${student.email}"
                    >
                        ${student.email}
                    </a>
                </td>

                <td>
                    <span class="badge ${departmentClass}">
                        ${student.department}
                    </span>
                </td>

                <td>
                    <span class="badge year-badge">
                        ${student.year}
                    </span>
                </td>

                <td>
                    <span class="cgpa">
                        ${student.cgpa.toFixed(1)}
                    </span>
                </td>

                <td>
                    ${student.city}
                </td>

            </tr>
        `;


        studentTableBody.innerHTML += row;
    });


    updatePagination(totalPages);
}


// ==========================================
// UPDATE PAGINATION
// ==========================================

function updatePagination(totalPages) {

    if (totalPages === 0) {

        pageInfo.textContent = "Page 1 of 1";

        prevBtn.disabled = true;
        nextBtn.disabled = true;

        return;
    }


    pageInfo.textContent =
        "Page " + currentPage + " of " + totalPages;


    // Disable previous on first page
    prevBtn.disabled = currentPage === 1;


    // Disable next on last page
    nextBtn.disabled = currentPage === totalPages;
}


// ==========================================
// SEARCH AND FILTER EVENTS
// ==========================================

searchInput.addEventListener("input", function() {

    currentPage = 1;

    displayStudents();
});


departmentFilter.addEventListener("change", function() {

    currentPage = 1;

    displayStudents();
});


yearFilter.addEventListener("change", function() {

    currentPage = 1;

    displayStudents();
});


sortFilter.addEventListener("change", function() {

    currentPage = 1;

    displayStudents();
});


// ==========================================
// PREVIOUS BUTTON
// ==========================================

prevBtn.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayStudents();
    }
});


// ==========================================
// NEXT BUTTON
// ==========================================

nextBtn.addEventListener("click", function() {

    const filteredStudents = getFilteredStudents();

    const totalPages =
        Math.ceil(filteredStudents.length / studentsPerPage);


    if (currentPage < totalPages) {

        currentPage++;

        displayStudents();
    }
});


// ==========================================
// RELOAD BUTTON
// ==========================================

reloadBtn.addEventListener("click", function() {

    loadStudents();
});


// ==========================================
// LOAD DATA WHEN PAGE OPENS
// ==========================================

loadStudents();