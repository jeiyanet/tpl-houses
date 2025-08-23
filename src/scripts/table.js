document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem("students");
    const students = stored ? JSON.parse(stored) : [];
    const tbody = document.getElementById("studentsBody");

    if (!tbody) return;

    if (students.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="4" class="px-4 py-3 text-gray-400">No students found.</td>
        </tr>`;
        return;
    }

    students.forEach((student) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="border border-yellow-500 px-4 py-2">${student.firstName}</td>
        <td class="border border-yellow-500 px-4 py-2">${student.lastName}</td>
        <td class="border border-yellow-500 px-4 py-2">${student.courseSection}</td>
        <td class="border border-yellow-500 px-4 py-2">${student.house ? student.house : '-'}</td>
        `;
        tbody.appendChild(tr);
    });
    
    const downloadBtn = document.getElementById("download-csv");
    const table = document.querySelector("table");

    downloadBtn.addEventListener("click", () => {
      if (!table) return;

      let csv = [];
      const rows = table.querySelectorAll("tr");

      rows.forEach(row => {
        let cols = row.querySelectorAll("td, th");
        let rowData = [];
        cols.forEach(col => rowData.push(`"${col.innerText}"`));
        csv.push(rowData.join(","));
      });

      const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(csvFile);
      downloadLink.download = "list.csv";
      downloadLink.click();
    });
});