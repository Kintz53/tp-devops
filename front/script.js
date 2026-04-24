async function fetchData() {
  try {
    const departmentsResponse = await fetch("/api/departments");
    const studentsResponse = await fetch("/api/students");

    const departments = await departmentsResponse.json();
    const students = await studentsResponse.json();

    displayDepartments(departments);
    displayStudents(students, departments);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
}

function displayDepartments(departments) {
  const container = document.getElementById("departments");
  container.innerHTML = "";

  departments.forEach((department) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = department.name;
    container.appendChild(card);
  });
}

function displayStudents(students, departments) {
  const tbody = document.getElementById("students");
  tbody.innerHTML = "";

  students.forEach((student) => {
    const department = departments.find(
      (dep) => dep.id === student.department_id || dep.id === student.departmentId
    );

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.first_name || student.firstName}</td>
      <td>${student.last_name || student.lastName}</td>
      <td>${department ? department.name : "Unknown"}</td>
    `;

    tbody.appendChild(row);
  });
}

fetchData();