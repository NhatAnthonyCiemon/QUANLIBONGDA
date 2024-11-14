const seasons = {
    '2024–2025': ['Vòng 1', 'Vòng 2'],
    '2023–2024': ['Vòng 1', 'Vòng 2'],
    '2022–2023': ['Vòng 1', 'Vòng 2']
};

const matches = {
    '2024–2025': {
        'Vòng 1': [
            { stt: 1, team1: 'Đội A', team2: 'Đội B', time: '1/1/2024 - 2:00', location: 'Sân A' },
            { stt: 2, team1: 'Đội B', team2: 'Đội A', time: '5/1/2024 - 2:00', location: 'Sân B' }
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
            ["Đội A", "2 - 0", "Đội B", "Sân A", "1/1/2024 - 2:00"],
            ["Đội B", "1 - 1", "Đội A", "Sân B", "5/1/2024 - 2:00"]
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
            [
                ["1", "Cầu thủ A", "Đội A", "Ghi bàn", "45'"],
                ["2", "Cầu thủ B", "Đội B", "Phản lưới", "50'"]
            ],
            [
                ["1", "Cầu thủ B", "Đội B", "Ghi bàn", "60'"],
                ["2", "Cầu thủ A", "Đội A", "Phản lưới", "80'"]
            ]
        ],
        'Vòng 2': [
            [
                ["1", "Cầu thủ B", "Đội B", "Ghi bàn", "60'"],
                ["2", "Cầu thủ A", "Đội A", "Phản lưới", "80'"]
            ]
        ]
    },
    '2023–2024': {
        'Vòng 1': [
            [
                ["1", "Cầu thủ E", "Đội E", "Ghi bàn", "30'"]
            ]
        ],
        'Vòng 2': [
            [
                ["1", "Cầu thủ F", "Đội E", "Ghi bàn", "40'"]
            ]
        ]
    },
    '2022–2023': {
        'Vòng 1': [
            [
                ["1", "Cầu thủ K", "Đội L", "Ghi bàn", "35'"]
            ]
        ],
        'Vòng 2': [
            [
                ["1", "Cầu thủ L", "Đội L", "Ghi bàn", "25'"],
                ["2", "Cầu thủ K", "Đội K", "Phản lưới", "75'"]
            ]
        ]
    }   
};

let currentTableResults = null;
let currentTableGoals = null;


const mua = ['2024–2025', '2023–2024', '2022–2023'];
let currentSeason = mua[0]; // Mùa giải hiện tại, mặc định là mùa mới nhất
let currentRoundIndex = 0; // Chỉ số của vòng đấu hiện tại
var currentIndex = 0;//Chỉ số của trận hiện tại


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

// Hàm này mở hoặc đóng dropdown
function toggleDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Chọn mùa giải mặc định khi trang tải
window.onload = function() {
    selectSeason('2024–2025');
    updateGoalInfo();
};

/*Phần điều chỉnh quy định*/
const modal = document.getElementById("myModal");
const image = document.getElementById("image");
const span = document.getElementsByClassName("close")[0];
const saveButton = document.getElementById("saveButton");
//Thông tin hiển thị
const goalInfo = document.getElementById("goalInfo");
// Giá trị mặc định
let defaultGoalTypes = ['Ghi bàn', 'Phản lưới', 'Phạt đền'];
let defaultMaxGoalTime = 96;
// Lấy giá trị từ localStorage hoặc sử dụng giá trị mặc định
let goalTypes = localStorage.getItem('goalTypes') ? JSON.parse(localStorage.getItem('goalTypes')) : defaultGoalTypes;
let maxGoalTime = localStorage.getItem('maxGoalTime') ? parseInt(localStorage.getItem('maxGoalTime')) : defaultMaxGoalTime;

// Mở modal khi click vào hình ảnh
image.onclick = function () {
    modal.style.display = "block";
}

// Lấy các modal
var closeButtons = document.getElementsByClassName("close");

// Đóng modal khi nhấn vào dấu X
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
        var modal = this.parentElement.parentElement;
        if (modal == resultModal) {
            document.getElementById("changeInfoButton").innerText = "Sửa đổi kết quả";
            document.getElementById("changeInfoButton").onclick = function () {
                changeToEditMode();  // Đưa trở lại chế độ chỉnh sửa
            };
        }
        modal.style.display = "none";
    }
}
// Đóng modal khi click ra ngoài modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == resultModal) {
        document.getElementById("changeInfoButton").innerText = "Sửa đổi kết quả";
        document.getElementById("changeInfoButton").onclick = function () {
            changeToEditMode();  // Đưa trở lại chế độ chỉnh sửa
        };
        resultModal.style.display = "none";
    }
}
// Hàm để cập nhật đoạn văn "goalInfo"
function updateGoalInfo() {
    goalInfo.innerHTML =`
        <li>Có <span style="color: #AAFFA7;">${goalTypes.length}</span> loại bàn thắng: ${goalTypes.join(", ")}.<li> <li>Thời điểm ghi bàn từ 0 đến ${maxGoalTime}.</li> `
}
// Khi nhấn nút "Lưu"
saveButton.onclick = function () {
// Lấy giá trị từ input
    const newGoalTypes = document.getElementById('goalTypes').value;
    const newMaxGoalTime = document.getElementById('maxGoalTime').value;

// Kiểm tra nếu có giá trị mới được nhập, thì cập nhật các biến và localStorage
    if (newGoalTypes) {
        goalTypes = newGoalTypes.split(',').map(type => type.trim());
        localStorage.setItem('goalTypes', JSON.stringify(goalTypes));  // Lưu vào localStorage
    }

// Kiểm tra nếu thời gian ghi bàn là số không âm
    if (newMaxGoalTime) {
        const parsedMaxGoalTime = parseInt(newMaxGoalTime, 10);
        if (parsedMaxGoalTime >= 0) {
            maxGoalTime = parsedMaxGoalTime;
            localStorage.setItem('maxGoalTime', maxGoalTime);  // Lưu vào localStorage
        } else {
            alert('Thời điểm ghi bàn phải là một số không âm!');  // Thông báo nếu giá trị âm
            return;
        }
    }

    // Cập nhật lại đoạn văn với giá trị mới
    updateGoalInfo();
    modal.style.display = "none"; // Đóng modal
};

// Hàm này cập nhật thông tin kết quả của một trận đấu
function toggleRows(season, round, index) {
    currentIndex = index;
    const modal = document.getElementById('resultModal');
    const modalResultBody = document.getElementById('modalResultBody');
    const modalGoalBody = document.getElementById('modalGoalBody');

    // Xóa nội dung cũ
    modalResultBody.innerHTML = '';
    modalGoalBody.innerHTML = '';

    // Lấy dữ liệu kết quả và ghi bàn
    if (!currentTableResults) {
        currentTableResults = tableResults;
    }
    if (!currentTableGoals) {
        currentTableGoals = tableGoals;
    }
    
    const resultData =currentTableResults[season][round][index];
    const goalData = currentTableGoals[season][round][index];

    // Thêm thông tin kết quả trận đấu vào modal
    const resultRow = document.createElement('tr');
    resultData.forEach(data => {
        const cell = document.createElement('td');
        cell.textContent = data;
        resultRow.appendChild(cell);
    });
    modalResultBody.appendChild(resultRow);

    // Thêm thông tin ghi bàn vào modal
    goalData.forEach(goal => {
        const goalRow = document.createElement('tr');
        goal.forEach(goalDetail => {
            const goalCell = document.createElement('td');
            goalCell.textContent = goalDetail;
            goalRow.appendChild(goalCell);
        });
        modalGoalBody.appendChild(goalRow);
    });

    // Hiển thị modal
    modal.style.display = 'block';
    console.log(resultData);
}

document.getElementById("changeInfoButton").onclick = function () {
    changeToEditMode();  // Chuyển sang chế độ chỉnh sửa
};

function changeToEditMode() {
    const modalResultBody = document.getElementById('modalResultBody');
    const modalGoalBody = document.getElementById('modalGoalBody');

    // Chuyển đổi các ô kết quả trận đấu thành các input để chỉnh sửa
    Array.from(modalResultBody.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, cellIndex) => {
            const originalText = cell.textContent;
            cell.innerHTML = `<input " type="text" value="${originalText}" />`;
        });
    });

    // Chuyển đổi các ô ghi bàn thành các input để chỉnh sửa
    Array.from(modalGoalBody.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, cellIndex) => {
            const originalText = cell.textContent;
            cell.innerHTML = `<input type="text" value="${originalText}" />`;
        });
    });

    // Thay đổi nút "Sửa đổi kết quả" thành nút "Lưu"
    document.getElementById("changeInfoButton").innerText = "Lưu";
    document.getElementById("changeInfoButton").onclick = function () {
        saveChanges(modalResultBody, modalGoalBody);  // Gọi hàm lưu dữ liệu
    };
}

function saveChanges(modalResultBody, modalGoalBody) {
    // Tạo đối tượng để lưu dữ liệu kết quả trận đấu
    let matchResult = [];

    // Lưu kết quả trận đấu từ input
    Array.from(modalResultBody.rows).forEach((row) => {
        Array.from(row.cells).forEach((cell) => {
            const inputValue = cell.querySelector('input').value;
            cell.innerHTML = inputValue;  // Thay thế input bằng giá trị đã lưu
            matchResult.push(inputValue ); // Thêm giá trị vào mảng hàng
        });  // Thêm hàng vào dữ liệu kết quả trận đấu
    });


    // Tạo đối tượng để lưu dữ liệu ghi bàn
    let goalData = [];

    // Lưu thông tin ghi bàn từ input
    Array.from(modalGoalBody.rows).forEach((row, rowIndex) => {
        let rowData = [];
        Array.from(row.cells).forEach((cell, cellIndex) => {
            const inputValue = cell.querySelector('input').value;
            cell.innerHTML = inputValue;  // Thay thế input bằng giá trị đã lưu
            rowData.push(inputValue);  // Thêm giá trị vào mảng hàng
        });
        goalData.push(rowData);  // Thêm hàng vào dữ liệu ghi bàn
    });
    const roundlist = Object.keys(matches[currentSeason]);
    // Lưu dữ liệu vào localStorage
    currentTableResults[currentSeason][roundlist[currentRoundIndex]][currentIndex] = matchResult;
    currentTableGoals[currentSeason][roundlist[currentRoundIndex]][currentIndex] = goalData;
    // Thay đổi nút "Lưu" lại thành "Sửa đổi kết quả"
    document.getElementById("changeInfoButton").innerText = "Sửa đổi kết quả";
    document.getElementById("changeInfoButton").onclick = function () {
        changeToEditMode();  // Đưa trở lại chế độ chỉnh sửa
    };
}