const tableResults = [
    ["Đội A", "2 - 0", "Đội B", "Sân A", "1/1/2024 - 2:00"],
    ["Đội C", "1 - 1", "Đội D", "Sân B", "2/1/2024 - 4:00"],
    ["Đội E", "3 - 2", "Đội F", "Sân C", "3/1/2024 - 6:00"]
];
let rowsVisible = new Array(tableResults.length).fill(false);

const tableGoals = [
    [
        ["1", "Cầu thủ A", "Đội A", "Ghi bàn", "45'"],
        ["2", "Cầu thủ B", "Đội B", "Phản lưới", "50'"]
    ],
    [
        ["1", "Cầu thủ C", "Đội C", "Ghi bàn", "30'"],
        ["2", "Cầu thủ D", "Đội D", "Phản lưới", "60'"]
    ],
    [
        ["1", "Cầu thủ E", "Đội E", "Ghi bàn", "20'"],
        ["2", "Cầu thủ F", "Đội F", "Phản lưới", "70'"]
    ]
];

function toggleRows(index) {
    const tableBody = document.getElementById('table_result_body');
    const tableBodyGoal = document.getElementById('table_goal_body');
    
    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
    }
    while (tableBodyGoal.rows.length > 0) {
        tableBodyGoal.deleteRow(0);
    }

    if (!rowsVisible[index]) {

        const row = tableBody.insertRow(0);
        Object.assign(row.style, { fontWeight: "500", fontSize: "30px", lineHeight: "38px" });

        const cellsData = tableResults[index];
        cellsData.forEach((data, cellIndex) => {
            const cell = row.insertCell(cellIndex);
            cell.innerHTML = data;
            if (cellIndex === 1) cell.style.color = "#40FF00";
        });


        tableGoals[index].forEach(goal => {
            const rowGoal = tableBodyGoal.insertRow(tableBodyGoal.rows.length);
            Object.assign(rowGoal.style, { fontWeight: "500", fontSize: "25px", lineHeight: "32px" });  
            goal.forEach((dataGoal, goalIndex) => {
                const cellGoal = rowGoal.insertCell(goalIndex);
                cellGoal.innerHTML = dataGoal;
            });
        });

        rowsVisible = rowsVisible.map((visible, i) => i === index);
    } else {
        rowsVisible[index] = false;
    }
}