
const studentData = document.getElementById("studentData");
const eventData = document.getElementById("eventData");
const faqData = document.getElementById("faqData");

const status = document.getElementById("status");
const studentCount = document.getElementById("studentCount");

const search = document.getElementById("search");
const yearFilter = document.getElementById("yearFilter");
const sortBy = document.getElementById("sortBy");

const fetchBtn = document.getElementById("fetchBtn");
const reloadBtn = document.getElementById("reloadBtn");

const pagination = document.getElementById("pagination");

let students = [];
let currentPage = 1;

const recordsPerPage = 6;


// Fetch all JSON files
async function fetchData() {

    status.innerHTML = "Loading data...";

    try {

        const studentResponse = await fetch("students.json");
        const eventResponse = await fetch("events.json");
        const faqResponse = await fetch("faqs.json");

        if (
            !studentResponse.ok ||
            !eventResponse.ok ||
            !faqResponse.ok
        ) {
            throw new Error("JSON file could not be loaded");
        }

        students = await studentResponse.json();

        const events = await eventResponse.json();
        const faqs = await faqResponse.json();

        displayStudents();
        displayEvents(events);
        displayFAQs(faqs);

        status.innerHTML =
            "Data loaded successfully ✓";

    } catch (error) {

        status.innerHTML =
            "Unable to load data. Check JSON files.";

        console.log(error);
    }
}


// Get filtered and sorted students
function getStudents() {

    let result = students.filter(function(student) {

        const text =
            student.name + " " +
            student.email + " " +
            student.course;

        const searchMatch =
            text.toLowerCase()
                .includes(search.value.toLowerCase());

        const yearMatch =
            yearFilter.value == "all" ||
            student.year == yearFilter.value;

        return searchMatch && yearMatch;
    });


    if (sortBy.value == "name") {

        result.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

    } else if (sortBy.value == "high") {

        result.sort(function(a, b) {
            return b.cgpa - a.cgpa;
        });

    } else {

        result.sort(function(a, b) {
            return a.cgpa - b.cgpa;
        });
    }

    return result;
}


// Display student records
function displayStudents() {

    const result = getStudents();

    studentCount.innerHTML =
        result.length + " Students";


    const start =
        (currentPage - 1) * recordsPerPage;

    const pageData =
        result.slice(start, start + recordsPerPage);


    if (pageData.length == 0) {

        studentData.innerHTML =
            "<p class='status'>No student found.</p>";

        pagination.innerHTML = "";

        return;
    }


    studentData.innerHTML =
        pageData.map(function(student) {

            return `
                <div class="student-card">

                    <div class="student-top">

                        <div class="avatar">
                            ${student.name.charAt(0)}
                        </div>

                        <div>
                            <h3>${student.name}</h3>
                            <p>${student.email}</p>
                        </div>

                    </div>

                    <p>
                        <b>Course:</b> ${student.course}
                    </p>

                    <p>
                        <b>Year:</b> ${student.year}
                    </p>

                    <div class="badges">

                        <span class="badge">
                            ${student.course}
                        </span>

                        <span class="badge cgpa">
                            CGPA ${student.cgpa}
                        </span>

                    </div>

                </div>
            `;

        }).join("");


    createPagination(result.length);
}


// Pagination
function createPagination(totalRecords) {

    const totalPages =
        Math.ceil(totalRecords / recordsPerPage);

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");

        button.innerHTML = i;
        button.className = "page-btn";

        if (i == currentPage) {
            button.classList.add("active");
        }

        button.onclick = function() {

            currentPage = i;
            displayStudents();

        };

        pagination.appendChild(button);
    }
}


// Display events
function displayEvents(events) {

    eventData.innerHTML =
        events.map(function(event) {

            return `
                <div class="event-card">

                    <div class="event-date">
                        ${event.date}
                    </div>

                    <h3>${event.title}</h3>

                    <p>${event.description}</p>

                    <br>

                    <span class="badge">
                        ${event.category}
                    </span>

                </div>
            `;

        }).join("");
}


// Display FAQs
function displayFAQs(faqs) {

    faqData.innerHTML =
        faqs.map(function(faq) {

            return `
                <div class="faq">

                    <h3>${faq.question}</h3>

                    <p>${faq.answer}</p>

                </div>
            `;

        }).join("");
}


// Search
search.addEventListener("input", function() {

    currentPage = 1;
    displayStudents();

});


// Year filter
yearFilter.addEventListener("change", function() {

    currentPage = 1;
    displayStudents();

});


// Sorting
sortBy.addEventListener("change", function() {

    currentPage = 1;
    displayStudents();

});


// Fetch button
fetchBtn.addEventListener("click", function() {

    fetchData();

});


// Reload button
reloadBtn.addEventListener("click", function() {

    fetchData();

});
