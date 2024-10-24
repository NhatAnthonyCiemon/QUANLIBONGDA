const seasons = {
    '2024–2025': ['Vòng 1', 'Vòng 2'],
    '2023–2024': ['Vòng 1', 'Vòng 2'],
    '2022–2023': ['Vòng 1', 'Vòng 2']
};

const matches = {
    '2024–2025': {
        'Vòng 1': [
            { stt: 1, team1: 'Đội A', team2: 'Đội B', time: '1/1/2024 - 2:00', location: 'Sân A' }  
        ],
        'Vòng 2': [
            { stt: 1, team1: 'Đội B', team2: 'Đội A', time: '5/1/2024 - 2:00', location: 'Sân B' }
        ]
    },
    '2023–2024': {
        'Vòng 1': [
            { stt: 1, team1: 'Đội E', team2: 'Đội F', time: '1/1/2024 - 2:00', location: 'Sân E' }  
        ],
        'Vòng 2': [
            { stt: 1, team1: 'Đội F', team2: 'Đội E', time: '5/1/2024 - 2:00', location: 'Sân F' }
        ]
    },
    '2022–2023': {
        'Vòng 1': [
            { stt: 1, team1: 'Đội K', team2: 'Đội L', time: '1/1/2024 - 2:00', location: 'Sân K' }  
        ],
        'Vòng 2': [
            { stt: 1, team1: 'Đội L', team2: 'Đội K', time: '5/1/2024 - 2:00', location: 'Sân L' }
        ]
    },
};

const tableResults = {
    '2024–2025': {
        'Vòng 1': [
            ["Đội A", "2 - 0", "Đội B", "Sân A", "1/1/2024 - 2:00"]
        ],
        'Vòng 2': [
            ["Đội B", "1 - 1", "Đội A", "Sân B", "5/1/2024 - 2:00"]
        ]
    },
    '2023–2024': {
        'Vòng 1': [
            ["Đội E", "1 - 0", "Đội F", "Sân E", "1/1/2024 - 2:00"]
        ],
        'Vòng 2': [
            ["Đội F", "0 - 1", "Đội E", "Sân F", "5/1/2024 - 2:00"]
        ]
    },
    '2022–2023': {
        'Vòng 1': [
            ["Đội K", "0 - 1", "Đội L", "Sân K", "1/1/2024 - 2:00"]
        ],
        'Vòng 2': [
            ["Đội L", "1 - 1", "Đội K", "Sân L", "5/1/2024 - 2:00"]
        ]
    }
};

const tableGoals = {
    '2024–2025': {
        'Vòng 1': [
            ["1", "Cầu thủ A", "Đội A", "Ghi bàn", "45'"],
            ["2", "Cầu thủ B", "Đội B", "Phản lưới", "50'"]
        ],
        'Vòng 2': [
            ["1", "Cầu thủ B", "Đội B", "Ghi bàn", "60'"],
            ["2", "Cầu thủ A", "Đội A", "Phản lưới", "80'"]
        ]
    },
    '2023–2024': {
        'Vòng 1': [
            ["1", "Cầu thủ E", "Đội E", "Ghi bàn", "30'"]
        ],
        'Vòng 2': [
            ["1", "Cầu thủ F", "Đội E", "Ghi bàn", "40'"]
        ]
    },
    '2022–2023': {
        'Vòng 1': [
            ["1", "Cầu thủ K", "Đội L", "Ghi bàn", "35'"]
        ],
        'Vòng 2': [
            ["1", "Cầu thủ L", "Đội L", "Ghi bàn", "25'"],
            ["2", "Cầu thủ K", "Đội K", "Phản lưới", "75'"]
        ]
    }   
};

const mua = ['2024–2025', '2023–2024', '2022–2023'];
let currentSeason = mua[0]; // Mùa giải hiện tại, mặc định là mùa mới nhất
let currentRoundIndex = 0; // Chỉ số của vòng đấu hiện tại


// Tạo và hiển thị danh sách các mùa trong dropdown
function renderDropdown() {
    dropdown.innerHTML = ''; // Xóa sạch nội dung cũ
    mua.forEach(season => {
        const seasonElement = document.createElement('a');
        seasonElement.className = 'ml-12 rounded-lg';
        seasonElement.innerHTML = `<strong>${season}</strong>`;
        seasonElement.onclick = () => selectSeason(season); // Gán sự kiện onclick
        dropdown.appendChild(seasonElement);
    });
}

// Gọi hàm renderDropdown khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    renderDropdown();
    // Đảm bảo dropdown được ẩn khi tải trang
    dropdown.style.display = 'block'; // Thêm dòng này
});


// Hàm này được gọi khi chọn mùa giải
function selectSeason(season) {
    currentSeason = season; // Cập nhật mùa giải hiện tại
    currentRoundIndex = 0; // Đặt vòng đấu hiện tại là vòng đầu tiên
    document.getElementById('selected-season').textContent = season; // Cập nhật text của mùa đã chọn
    toggleDropdown(); // Đóng dropdown sau khi chọn
    updateRound(); // Cập nhật vòng đấu
}

// Hàm này cập nhật vòng đấu hiện tại
function updateRound() {
    const roundList = Object.keys(matches[currentSeason]); // Lấy danh sách vòng đấu của mùa hiện tại
    const currentRound = roundList[currentRoundIndex]; // Lấy tên của vòng hiện tại
    document.getElementById('round-name').innerText = currentRound; // Cập nhật tên vòng đấu

    updateMatches(currentSeason, currentRound); // Cập nhật danh sách trận đấu của vòng hiện tại
}

// Hàm này được gọi khi click vào nút "Vòng trước"
function prevRound() {
    const roundList = seasons[currentSeason];
    if (currentRoundIndex > 0) {
        currentRoundIndex--; // Giảm chỉ số vòng đấu
        updateRound(); // Cập nhật vòng đấu mới
    }
}
// Hàm này được gọi khi click vào nút "Vòng tiếp theo"
function nextRound() {
    const roundList = seasons[currentSeason];
    if (currentRoundIndex < roundList.length - 1) {
        currentRoundIndex++; // Tăng chỉ số vòng đấu
        updateRound(); // Cập nhật vòng đấu mới
    }
}


// Hàm này cập nhật danh sách trận đấu của một vòng đấu
function updateMatches(season, round) {
    const roundMatches = matches[season][round];
    let tbody = document.getElementById('team');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    roundMatches.forEach((match, index) => {
        tbody.innerHTML += `
            <tr class="border-t border-white">
                <td>${match.stt}</td>
                <td>${match.team1}</td>
                <td>${match.team2}</td>
                <td>${match.time}</td>
                <td>${match.location}</td>
                <td>
                    <button class="w-[132px] h-[54px] bg-[#377453] hover:bg-[#5ABF89] transition-all duration-300 rounded-xl mt-4 text-xl shadow-md"
                        onclick="toggleRows('${season}', '${round}', ${index})">Kết quả</button>
                </td>
            </tr>
        `;
    });
}


// Hàm này cập nhật thông tin kết quả của một trận đấu
function toggleRows(season, round, index) {
    const tableBody = document.getElementById('table_result_body');
    const tableBodyGoal = document.getElementById('table_goal_body');
    
    // Clear table body
    tableBody.innerHTML = '';
    tableBodyGoal.innerHTML = '';

    // Add new row
    const resultData = tableResults[season][round][index];
    const goalData = tableGoals[season][round];

    const row = tableBody.insertRow(0);
    Object.assign(row.style, { fontWeight: "500", fontSize: "30px", lineHeight: "38px" });

    resultData.forEach((data, cellIndex) => {
        const cell = row.insertCell(cellIndex);
        cell.innerHTML = data;
        if (cellIndex === 1) cell.style.color = "#40FF00"; // Highlight score
    });

    goalData.forEach(goal => {
        const rowGoal = tableBodyGoal.insertRow();
        Object.assign(rowGoal.style, { fontWeight: "500", fontSize: "25px", lineHeight: "32px" });  
        goal.forEach((dataGoal, goalIndex) => {
            const cellGoal = rowGoal.insertCell(goalIndex);
            cellGoal.innerHTML = dataGoal;
        });
    });
}

// Hàm này mở hoặc đóng dropdown
function toggleDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Chọn mùa giải mặc định khi trang tải
window.onload = function() {
    selectSeason('2024–2025');
};
