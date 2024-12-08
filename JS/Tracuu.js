// //js của nút nhất chọn năm
// const dropdownBtn = document.getElementById('dropdownBtn');
// const dropdownMenu = document.getElementById('dropdownMenu');
// const arrowIcon = dropdownBtn.querySelector('svg');

// dropdownBtn.addEventListener('click', () => {
//     dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
//     arrowIcon.classList.toggle('rotate');
// });

// Close dropdown if clicked outside

// js button danh sach cau thu với báo cáo mùa giải
document.addEventListener("DOMContentLoaded", function () {
    // Lấy các nút và div tương ứng
    const playerButton = document.querySelector(".button-group .btn1");
    const reportButton = document.querySelector(".button-group .btn2");

    const playerListDiv = document.querySelector(".danhsachcauthu");
    const goalScorersDiv = document.querySelector(".danhsachcaccauthughiban");
    const rankingDiv = document.querySelector(".bangxephang");

    // Ẩn tất cả các div khi trang được tải
    playerListDiv.style.display = "none";
    goalScorersDiv.style.display = "none";
    rankingDiv.style.display = "none";

    // Thêm sự kiện click cho nút "Danh sách cầu thủ"
    playerButton.addEventListener("click", function () {
        playerListDiv.style.display = "block"; // Hiện div "Danh sách cầu thủ"
        goalScorersDiv.style.display = "none"; // Ẩn div "Danh sách cầu thủ ghi bàn"
        rankingDiv.style.display = "none"; // Ẩn div "Bảng xếp hạng"
    });

    // Thêm sự kiện click cho nút "Báo cáo mùa giải"
    reportButton.addEventListener("click", function () {
        playerListDiv.style.display = "none"; // Ẩn div "Danh sách cầu thủ"
        goalScorersDiv.style.display = "block"; // Hiện div "Danh sách cầu thủ ghi bàn"
        rankingDiv.style.display = "block"; // Hiện div "Bảng xếp hạng"
    });

    // Thêm sự kiện keyup cho ô tìm kiếm
    const searchBox = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".fa-magnifying-glass");

    searchIcon.addEventListener("click", function () {
        const filter = searchBox.value.toLowerCase();
        const table = document.querySelector("table tbody");
        const rows = table.getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            let found = false;

            for (let j = 1; j < cells.length; j++) {
                // Bỏ qua cột STT
                if (cells[j].innerText.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }

            rows[i].style.display = found ? "" : "none";
        }
    });
});

//js thay đổi quy định
// Hàm để cập nhật nội dung từ localStorage
function loadRules() {
    const pointsWin = localStorage.getItem("pointsWin") || "3";
    const pointsDraw = localStorage.getItem("pointsDraw") || "1";
    const pointsLose = localStorage.getItem("pointsLose") || "0";
    //const ranking = localStorage.getItem('ranking') || 'điểm, hiệu số, tổng bàn thắng, đối kháng';

    //document.getElementById("points-win").innerText = pointsWin;
    //document.getElementById("points-draw").innerText = pointsDraw;
    //document.getElementById("points-lose").innerText = pointsLose;
    //document.getElementById('rule-2').innerHTML = ` + Xếp hạng theo thứ tự: ${ranking}.`;
}

// Gọi hàm để tải quy định khi trang được tải
loadRules();

//Hiển thị theo dữ liệu

const rowsPerPage = 20;
let currentPage = 1;
let playerData = [];
let playerData1 = [];
//let rannkData = [];

async function fetchData() {
    try {
        const response = await fetch(
            "http://localhost:3000/Research/totalplayers"
        );
        playerData = await response.json();
        displayPage(currentPage);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function fetchData1() {
    try {
        const response = await fetch(
            "http://localhost:3000/Research/playershasgoal"
        );
        playerData1 = await response.json();
        displayPage1(currentPage);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchData2() {
    try{
        const response = await fetch(
            "http://localhost:3000/Research/team"
        );
        const rannkData = await response.json();
        displayRank(rannkData,currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRank(data,page) {
    const teamList = document.getElementById('team-list-BXH');
    teamList.innerHTML = '';

    data.forEach((team, index) => {
        //console.log(team,index);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.team_name}</td>
            <td>${team.win}</td>
            <td>${team.draw}</td>
            <td>${team.lose}</td>
            <td>${team.difference}</td>
            <td>${team.point}</td>
        `;
        teamList.appendChild(row); // Sửa lỗi tại đây
    });

}


function displayPage(page) {
    const tbody = document.getElementById("player-list-danhsachcauthu");
    tbody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = playerData.slice(start, end);

    pageData.forEach((player, index) => {
        const stt = start + index + 1;
        const row = `<tr>
            <td>${stt}</td>
            <td>${player.player_name}</td>
            <td>${player.team_name}</td>
            <td>${player.player_type}</td>
            <td>${player.total_goals}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById(
        "page-info"
    ).innerText = `Page ${page} of ${Math.ceil(
        playerData.length / rowsPerPage
    )}`;
}
function displayPage1(page) {
    const playerGB = document.getElementById("player-list-GB");
    playerGB.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData1 = playerData1.slice(start, end);

    pageData1.forEach((player, index) => {
        const stt = start + index + 1;
        const row = `<tr>
            <td>${stt}</td>
            <td>${player.player_name}</td>
            <td>${player.team_name}</td>
            <td>${player.player_type}</td>
            <td>${player.total_goals}</td>
        </tr>`;
        playerGB.innerHTML += row;
    });
    document.getElementById(
        "page-info1"
    ).innerText = `Page ${page} of ${Math.ceil(
        playerData1.length / rowsPerPage
    )}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

function nextPage() {
    if (currentPage < Math.ceil(playerData.length / rowsPerPage)) {
        currentPage++;
        displayPage(currentPage);
    }
}

function prevPage1() {
    if (currentPage > 1) {
        currentPage--;
        displayPage1(currentPage);
    }
}

function nextPage1() {
    if (currentPage < Math.ceil(playerData1.length / rowsPerPage)) {
        currentPage++;
        displayPage1(currentPage);
    }
}

fetchData();
document.addEventListener('DOMContentLoaded', fetchData2);
fetchData1();

