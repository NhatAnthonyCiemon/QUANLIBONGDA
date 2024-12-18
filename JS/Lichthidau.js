let currentRoundIndex = 0; // Chỉ số của vòng đấu hiện tại
let currentSeason = null; // Mùa giải hiện tại
let seasons = []; // Danh sách các mùa giải
let matches = []; // Danh sách các trận đấu
let tableResults = []; // Danh sách kết quả các trận đấu
let tableGoals = []; // Danh sách bàn thắng của các trận đấu
const maxRound = 20; // Số vòng đấu tối đa
let currentRound;
let currentMaxRound;
let currentMatch = []; //Trận đấu hiện tại đang xem kết quả
let currentGoalPlayerList = []; //Danh sách cầu thủ ghi bàn hiện tại
let currentGoalTypes; //Danh sách các loại bàn thắng hiện tại
let currentMaxGoalTime = 0; //Thời gian tối đa hiện tại

function firstLoad() {
    var _username = localStorage.getItem("username");
    var _password = localStorage.getItem("password");
    if (_username != null && _password != null) {
        return { username: _username, password: _password };
    }
    return null;
}
async function getSeasons() {
    try {
        const response = await fetch("http://localhost:3000/Seasons");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();
        seasons = data.map((season) => season.season);
        renderDropdown();
        currentSeason = seasons[0]; // Gán mùa giải hiện tại sau khi cập nhật seasons
        selectSeason(currentSeason); // Gọi hàm selectSeason với mùa giải hiện tại
    } catch (err) {
        console.error(err.stack);
    }
}
async function getMatches() {
    try {
        const response = await fetch("http://localhost:3000/Matches");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();

        data.forEach((match) => {
            formatTime = new Date(match.match_time).toLocaleString("en-GB");
            matches.push({
                Season: match.season,
                Round: match.round,
                team1: match.team1name,
                team2: match.team2name,
                time: formatTime,
                location: match.stadium,
            });
            tableResults.push({
                Season: match.season,
                Round: match.round,
                Match_id: match.schedule_id,
                team1: match.team1name,
                team2: match.team2name,
                Score: match.result,
                location: match.stadium,
                time: formatTime,
            });
        });
    } catch (err) {
        console.error(err.stack);
    }
}
async function getGoals() {
    try {
        const response = await fetch("http://localhost:3000/Goals");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data_goals = await response.json();
        tableGoals = [];
        data_goals.forEach((goal) => {
            tableGoals.push({
                Match_id: goal.schedule_id,
                Round: goal.round,
                player_id: goal.player_id,
                number: goal.ao_number,
                name: goal.player_name,
                team: goal.team_name,
                type: goal.goal_type,
                time: goal.goal_time,
            });
        });
    } catch (err) {
        console.error(err.stack);
    }
}
async function updateMatchResult(currentMatch) {
    const matchData = {
        schedule_id: currentMatch.Match_id, // Lấy từ thuộc tính đúng của currentMatch
        result: currentMatch.Score, // Lấy từ thuộc tính đúng của currentMatch
    };
    try {
        const response = await fetch(
            "http://localhost:3000/Matches/update-matches",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ matchData, info: firstLoad() }), // Gửi trực tiếp object matchData
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update match result");
        }
    } catch (err) {
        console.error("Error:", err);
        const errorMessage =
            err.message ||
            "Something went wrong while updating the match result.";
        //alert(errorMessage);
        showModal(errorMessage);
    }
}
async function getGoalTypes() {
    try {
        const response = await fetch(
            "http://localhost:3000/Standards/goal_types"
        );
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        currentGoalTypes = await response.json();
    } catch (error) {
        console.error("Error fetching goal types:", error);
    }
}
async function getMaxGoalTime() {
    try {
        const response = await fetch(
            "http://localhost:3000/Standards/max_goal_time"
        );
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();
        currentMaxGoalTime = data.max_goal_time;
    } catch (error) {
        console.error("Error fetching goal types:", error);
    }
}
async function updateGoalType(goalTypesArray) {
    try {
        const goalTypesString = goalTypesArray.join(", ");

        const response = await fetch(
            "http://localhost:3000/Standards/update_goal",
            {
                method: "PUT", // Sử dụng phương thức PUT để cập nhật
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    goalTypesString: goalTypesString, // Truyền goalTypesString vào yêu cầu
                    info: firstLoad(),
                }),
            }
        );

        // Kiểm tra phản hồi từ server
        if (!response.ok) {
            throw new Error("Failed to update goal type");
        }
    } catch (error) {
        console.error("Error updating goal type:", error);
    }
}
async function updateMaxGoalTime(maxGoalTime) {
    try {
        const response = await fetch(
            "http://localhost:3000/Standards/update_time",
            {
                method: "PUT", // Sử dụng phương thức PUT để cập nhật
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    maxGoalTime: maxGoalTime, // Truyền maxGoalTime vào yêu cầu
                    info: firstLoad(),
                }),
            }
        );

        // Kiểm tra phản hồi từ server
        if (!response.ok) {
            throw new Error("Failed to update max goal time");
        }
    } catch (error) {
        console.error("Error updating max goal time:", error);
    }
}
async function updateGoalPlayerList(goalData) {
    // Gửi yêu cầu API backend để cập nhật dữ liệu vào bảng goal
    try {
        const response = await fetch(
            "http://localhost:3000/Goals/update-goal",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    match_id: currentMatch.Match_id,
                    goalData: goalData,
                    info: firstLoad(),
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update goal data");
        }
        await getGoals();
        //alert('Goal data updated successfully');
        showModal("Goal data updated successfully");
    } catch (error) {
        console.error("Error updating goal data:", error);
        //alert('Không tìm thấy thông tin cầu thủ');
        showModal("Không tìm thấy thông tin cầu thủ");
        return false;
    }
    // Bước 1: Cập nhật currentGoalPlayerList từ goalData
    goalData.forEach((goal) => {
        const name = goal[1];
        const number = parseInt(goal[2]);
        const team = goal[3];
        const goal_type = goal[4];
        const goal_time = goal[5];
        // Kiểm tra xem cầu thủ đã có trong currentGoalPlayerList chưa
        let playerExists = false;
        currentGoalPlayerList.forEach((player) => {
            if (
                player.name == name &&
                player.number == number &&
                player.team == team &&
                player.time == goal_time
            ) {
                console.log("ok");
                playerExists = true;
                // Cập nhật thông tin cầu thủ nếu có thay đổi
                player.type = goal_type;
            }
        });

        // Nếu chưa có cầu thủ trong currentGoalPlayerList, thêm mới
        if (!playerExists) {
            currentGoalPlayerList.push({
                Match_id: currentMatch.Match_id,
                round: currentRound,
                player_id: null,
                number: number,
                name: name,
                team: team,
                type: goal_type,
                time: goal_time,
            });
        }
    });

    // Bước 2: Lọc các cầu thủ trong currentGoalPlayerList dựa trên goalData
    const goalDataNames = goalData.map((goal) => goal[1]);
    const goalDataNumber = goalData.map((goal) => goal[2]);
    const goalDataTeams = goalData.map((goal) => goal[3]);
    const goalDataTimes = goalData.map((goal) => goal[5]);

    // Bước 3: Xóa các cầu thủ không có trong goalData khỏi currentGoalPlayerList
    currentGoalPlayerList = currentGoalPlayerList.filter((player) => {
        return goalDataNames.some((name, index) => {
            return (
                name == player.name &&
                goalDataNumber[index] == player.number &&
                goalDataTeams[index] == player.team &&
                goalDataTimes[index] == player.time
            );
        });
    });
    console.log(currentGoalPlayerList);
    return true;
}
getSeasons();
getMatches();
getGoals();
getGoalTypes();
getMaxGoalTime();
console.log(matches);
console.log(tableResults);
console.log(tableGoals);
//ok
// Tạo và hiển thị danh sách các mùa trong dropdown
function renderDropdown() {
    dropdown.innerHTML = ""; // Xóa sạch nội dung cũ
    seasons.forEach((season) => {
        const seasonElement = document.createElement("a");
        seasonElement.className = "ml-12 rounded-lg";
        seasonElement.innerHTML = `<strong>${season}</strong>`;
        seasonElement.onclick = () => selectSeason(season); // Gán sự kiện onclick
        dropdown.appendChild(seasonElement);
    });
}

//ok
// Gọi hàm renderDropdown khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    renderDropdown();
    // Đảm bảo dropdown được ẩn khi tải trang
    dropdown.style.display = "block"; // Thêm dòng này
});

//ok
// Hàm này được gọi khi chọn mùa giải
function selectSeason(season) {
    currentSeason = season; // Cập nhật mùa giải hiện tại
    currentRoundIndex = 0; // Đặt vòng đấu hiện tại là vòng đầu tiên
    document.getElementById("selected-season").textContent = season; // Cập nhật text của mùa đã chọn
    toggleDropdown(); // Đóng dropdown sau khi chọn
    updateRound(); // Cập nhật vòng đấu
}

// Hàm này cập nhật vòng đấu hiện tại
function updateRound() {
    //const roundList = Object.keys(matches[currentSeason]); // Lấy danh sách vòng đấu của mùa hiện tại

    let roundList = [];
    matches.forEach((match) => {
        if (match.Season === currentSeason) {
            roundList.push(match.Round);
        }
    });
    roundList = [...new Set(roundList)].sort((a, b) => a - b);
    currentMaxRound = roundList[roundList.length - 1];
    currentRound = roundList[currentRoundIndex]; // Lấy tên của vòng hiện tại
    document.getElementById("round-name").innerText = `Vòng ${currentRound}`; // Cập nhật tên vòng đấu

    updateMatches(currentSeason, currentRound); // Cập nhật danh sách trận đấu của vòng hiện tại
}

// Hàm này được gọi khi click vào nút "Vòng trước"
function prevRound() {
    if (currentRoundIndex > 0) {
        currentRoundIndex -= 1; // Giảm chỉ số vòng đấu
        console.log(currentRoundIndex);

        updateRound(); // Cập nhật vòng đấu mới
    }
}
// Hàm này được gọi khi click vào nút "Vòng tiếp theo"
function nextRound() {
    if (currentRoundIndex < currentMaxRound - 1) {
        // 2 là số vòng đấu tối đa
        currentRoundIndex += 1; // Tăng chỉ số vòng đấu
        console.log(currentRoundIndex);

        updateRound(); // Cập nhật vòng đấu mới
    }
    console.log(currentRoundIndex);
}

// Hàm này cập nhật danh sách trận đấu của một vòng đấu
function updateMatches(season, round) {
    let roundMatches = [];
    let cnt = 0;
    matches.forEach((match) => {
        if (match.Season === season && match.Round === round) {
            cnt++;
            roundMatches.push({
                stt: cnt,
                team1: match.team1,
                team2: match.team2,
                time: match.time,
                location: match.location,
            });
        }
    });

    let tbody = document.getElementById("team");
    tbody.innerHTML = ""; // Xóa nội dung cũ

    roundMatches.forEach((match) => {
        cnt++;
        tbody.innerHTML += `
            <tr class="border-t border-white    ">
                <td>${match.stt}</td>
                <td>${match.team1}</td>
                <td>${match.team2}</td>
                <td>${match.time}</td>
                <td>${match.location}</td>
                <td>
                    <button class="w-[100px] h-[54px] bg-[#377453] hover:bg-[#5ABF89] transition-all duration-300 rounded-xl mt-4 text-xl shadow-md ml-0"
                        onclick="toggleRows('${season}', '${round}', '${match.team1}', '${match.team2}', '${match.time}')">Kết quả</button>
                </td>
            </tr>
        `;
    });
}

//ok
// Hàm này mở hoặc đóng dropdown
function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
}

// Chọn mùa giải mặc định khi trang tải
window.onload = function () {
    selectSeason(seasons[0]);
    toggleDropdown();
    updateGoalInfo();
};

/*Phần điều chỉnh quy định*/
const modal = document.getElementById("myModal");
const image = document.getElementById("image");
const span = document.getElementsByClassName("close")[0];
const saveButton = document.getElementById("saveButton");
//Thông tin hiển thị
const goalInfo = document.getElementById("goalInfo");

// Mở modal khi click vào hình ảnh
image.onclick = function () {
    modal.style.display = "block";
};
// Lấy các modal
var closeButtons = document.getElementsByClassName("close");

// Đóng modal khi nhấn vào dấu X
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
        var modal = this.parentElement.parentElement;
        if (modal == resultModal) {
            document.getElementById("changeInfoButton").innerText =
                "Sửa đổi kết quả";
            document.getElementById("changeInfoButton").onclick = function () {
                changeToEditMode(); // Đưa trở lại chế độ chỉnh sửa
            };

            const addPlayerButton = document.querySelector(".addPlayerButton");
            if (addPlayerButton) {
                addPlayerButton.remove();
            }
        }
        modal.style.display = "none";
    };
}
// Đóng modal khi click ra ngoài modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == resultModal) {
        document.getElementById("changeInfoButton").innerText =
            "Sửa đổi kết quả";
        document.getElementById("changeInfoButton").onclick = function () {
            changeToEditMode(); // Đưa trở lại chế độ chỉnh sửa
        };
        // Xóa nút "Thêm cầu thủ"
        const addPlayerButton = document.querySelector(".addPlayerButton");
        if (addPlayerButton) {
            addPlayerButton.remove();
        }
        resultModal.style.display = "none";
    }
};

// Hàm để cập nhật đoạn văn "goalInfo"
function updateGoalInfo() {
    goalInfo.innerHTML = `
        <li>Có <span style="color: #AAFFA7;">${
            currentGoalTypes.length
        }</span> loại bàn thắng: ${currentGoalTypes.join(
        ", "
    )}.<li> <li>Thời điểm ghi bàn từ 0 đến ${currentMaxGoalTime}.</li> `;
}
// Khi nhấn nút "Lưu"
saveButton.onclick = function () {
    // Lấy giá trị từ input
    const newGoalTypes = document.getElementById("goalTypes").value;
    const newMaxGoalTime = document.getElementById("maxGoalTime").value;

    // Kiểm tra nếu có giá trị mới được nhập, thì cập nhật các biến
    if (newGoalTypes) {
        goalTypes = newGoalTypes.split(",").map((type) => {
            // Chuyển chữ cái đầu thành chữ hoa, các ký tự còn lại giữ nguyên
            return type.trim().charAt(0).toUpperCase() + type.trim().slice(1);
        });
        console.log(goalTypes);
        updateGoalType(goalTypes);
        currentGoalTypes = goalTypes;
    }

    // Kiểm tra nếu thời gian ghi bàn là số không âm
    if (newMaxGoalTime) {
        const parsedMaxGoalTime = parseFloat(newMaxGoalTime, 10);
        if (parsedMaxGoalTime > 0 && Number.isInteger(parsedMaxGoalTime)) {
            maxGoalTime = parsedMaxGoalTime;
            updateMaxGoalTime(maxGoalTime);
            currentMaxGoalTime = maxGoalTime;
        } else {
            //alert('Thời điểm ghi bàn phải là một số nguyên dương!');  // Thông báo nếu giá trị âm
            showModal("Thời điểm ghi bàn phải là một số nguyên dương!");
            return;
        }
    }

    // Cập nhật lại đoạn văn với giá trị mới
    updateGoalInfo();
    modal.style.display = "none"; // Đóng modal
};

// Hàm này cập nhật thông tin kết quả của một trận đấu
function toggleRows(season, round, team1, team2, matchTime) {
    const curDate = new Date();
    const [datePart, timePart] = matchTime.split(", ");
    const [day, month, year] = datePart.split("/");

    const date2 = new Date(`${year}-${month}-${day}T${timePart}`);
    if (date2 > curDate) {
        showModal("Trận đấu chưa diễn ra");
        return;
    }
    const modal = document.getElementById("resultModal");
    const modalResultBody = document.getElementById("modalResultBody");
    const modalGoalBody = document.getElementById("modalGoalBody");

    // Xóa nội dung cũ
    modalResultBody.innerHTML = "";
    modalGoalBody.innerHTML = "";
    currentMatch = [];
    currentGoalPlayerList = [];

    // Lấy dữ liệu kết quả và ghi bàn
    const resultData = [];
    const goalData = [];

    tableResults.forEach((matchResult) => {
        // Kiểm tra xem round, team1 và team2 có khớp không
        if (
            matchResult.Round == round &&
            matchResult.team1 == team1 &&
            matchResult.team2 == team2
        ) {
            currentMatch = matchResult;
            // Thêm thông tin kết quả vào resultData
            resultData.push(
                matchResult.team1,
                matchResult.Score,
                matchResult.team2,
                matchResult.location,
                matchResult.time
            );
            stt = 1;
            tableGoals.forEach((goal) => {
                if (goal.Match_id == matchResult.Match_id) {
                    currentGoalPlayerList.push(goal);
                    goalData.push([
                        stt,
                        goal.name,
                        goal.number,
                        goal.team,
                        goal.type,
                        goal.time,
                    ]);
                    stt++;
                }
            });
        }
    });
    console.log(currentMatch);
    console.log(currentGoalPlayerList);
    // Thêm thông tin kết quả trận đấu vào modal
    const resultRow = document.createElement("tr");
    resultData.forEach((data) => {
        const cell = document.createElement("td");
        cell.textContent = data;
        resultRow.appendChild(cell);
    });
    modalResultBody.appendChild(resultRow);
    // Thêm thông tin ghi bàn vào modal
    goalData.forEach((goal) => {
        const goalRow = document.createElement("tr");
        goal.forEach((goalDetail) => {
            const goalCell = document.createElement("td");
            goalCell.textContent = goalDetail;
            goalRow.appendChild(goalCell);
        });
        modalGoalBody.appendChild(goalRow);
    });

    // Hiển thị modal
    modal.style.display = "block";
}

document.getElementById("changeInfoButton").onclick = function () {
    changeToEditMode(); // Chuyển sang chế độ chỉnh sửa
};

function changeToEditMode() {
    const modalResultBody = document.getElementById("modalResultBody");
    const modalGoalBody = document.getElementById("modalGoalBody");

    // Chuyển đổi các ô kết quả trận đấu thành các input để chỉnh sửa
    Array.from(modalResultBody.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, cellIndex) => {
            if (cellIndex != 1) return;
            const originalText = cell.textContent;
            cell.innerHTML = `<input " type="text" value="${originalText}" />`;
        });
    });

    // Chuyển đổi các ô ghi bàn thành các input để chỉnh sửa
    Array.from(modalGoalBody.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, cellIndex) => {
            if (cellIndex == 0) return;
            const originalText = cell.textContent;
            if (cellIndex == 5 || cellIndex == 2)
                cell.innerHTML = `<input " type="number" class="center-input" value="${originalText}" />`;
            else
                cell.innerHTML = `<input " type="text" class="center-input" value="${originalText}" />`;
        });

        // Thêm nút "Xóa" cho mỗi cầu thủ
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton"); // Thêm class để áp dụng CSS

        // Ký tự dấu "×" thay vì hình ảnh
        deleteButton.innerHTML = "&times;";

        // Gắn sự kiện xóa hàng
        deleteButton.onclick = function () {
            modalGoalBody.deleteRow(rowIndex); // Xóa hàng cầu thủ
        };

        // Thêm nút "Xóa" vào cuối hàng
        row.appendChild(deleteButton);
    });

    // Thêm nút "Thêm cầu thủ"
    const addPlayerButton = document.createElement("button");
    addPlayerButton.classList.add("addPlayerButton");
    addPlayerButton.innerText = "Thêm cầu thủ";
    addPlayerButton.onclick = function () {
        addPlayerRow(modalGoalBody); // Gọi hàm thêm hàng cầu thủ mới
    };
    modalGoalBody.parentElement.appendChild(addPlayerButton); // Thêm nút vào dưới bảng ghi bàn

    // Thay đổi nút "Sửa đổi kết quả" thành nút "Lưu"
    document.getElementById("changeInfoButton").innerText = "Lưu";
    document.getElementById("changeInfoButton").onclick = function () {
        // Xóa tất cả các nút "Xóa" khi bấm "Lưu"
        const deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach((button) => button.remove());

        // Xóa nút "Thêm cầu thủ" khi bấm "Lưu"
        const addPlayerButton = document.querySelector(".addPlayerButton");
        if (addPlayerButton) {
            addPlayerButton.remove();
        }
        saveChanges(modalResultBody, modalGoalBody)
            .then((result) => {
                if (!result) {
                    changeToEditMode();
                }
            })
            .catch((error) => {
                console.error("Error occurred during saveChanges:", error);
            });
        // if(!saveChanges(modalResultBody, modalGoalBody)) {
        //     changeToEditMode();
        // }  // Gọi hàm lưu dữ liệu
    };
}

function addPlayerRow(modalGoalBody) {
    const newRow = modalGoalBody.insertRow(); // Tạo hàng mới

    const playerCount = modalGoalBody.rows.length;

    const sttCell = newRow.insertCell(0);
    sttCell.innerHTML = playerCount;
    // Thêm các ô nhập liệu cho hàng mới
    for (let i = 1; i < 6; i++) {
        // 5 ô cho các thông tin Tên cầu thủ, Số áo, Đội, Loại bàn thắng, Thời điểm
        const newCell = newRow.insertCell(i);
        if (i != 5 && i != 2) {
            newCell.innerHTML = `<input type="text" class="center-input" value="" />`;
        } else {
            newCell.innerHTML = `<input type="number" class="center-input" value="" />`;
        }
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton"); // Thêm class để áp dụng CSS

    deleteButton.innerHTML = "&times;";

    // Gắn sự kiện xóa hàng
    deleteButton.onclick = function () {
        modalGoalBody.deleteRow(newRow.sectionRowIndex); // Xóa hàng cầu thủ mới tạo
    };

    // Thêm nút "Xóa" vào cuối hàng
    newRow.appendChild(deleteButton);

    // Thêm nút "Xóa" cho hàng mới
}

async function saveChanges(modalResultBody, modalGoalBody) {
    // Tạo đối tượng để lưu dữ liệu kết quả trận đấu
    let matchResult = [];
    // Lưu kết quả trận đấu từ input
    Array.from(modalResultBody.rows).forEach((row) => {
        Array.from(row.cells).forEach((cell, cellIndex) => {
            let cellValue;
            if (cellIndex != 1) cellValue = cell.textContent;
            else {
                cellValue = cell.querySelector("input").value;
            }
            cell.innerHTML = cellValue;
            matchResult.push(cellValue);
        });
    });

    // Tạo đối tượng để lưu dữ liệu ghi bàn
    let goalData = [];

    // Lưu thông tin ghi bàn từ input
    Array.from(modalGoalBody.rows).forEach((row, rowIndex) => {
        let rowData = [];
        Array.from(row.cells).forEach((cell, cellIndex) => {
            let inputValue;
            if (cellIndex == 0) inputValue = cell.textContent;
            else if (cellIndex == 1) {
                data = cell.querySelector("input").value;
                inputValue = data
                    .toLowerCase()
                    .split(" ") // Tách tên thành mảng các từ
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu mỗi từ
                    .join(" "); // Kết hợp các từ lại thành tên đầy đủ
            } else if (cellIndex == 4) {
                data = cell.querySelector("input").value;
                inputValue =
                    data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
            } else inputValue = cell.querySelector("input").value;
            cell.innerHTML = inputValue; // Thay thế input bằng giá trị đã lưu
            rowData.push(inputValue); // Thêm giá trị vào mảng hàng
        });

        if (rowData.slice(1).every((item) => item === "")) {
            row.remove(); // Xóa hàng nếu không có dữ liệu
            return; // Dừng lại không lưu vào goalData
        }
        goalData.push(rowData); // Thêm hàng vào dữ liệu ghi bàn nếu không trống
    });
    if (goalData.some((row) => row.some((cell) => cell.trim() === ""))) {
        //alert("Vui lòng nhập đủ thông tin");
        showModal("Vui lòng nhập đủ thông tin");
        return false;
    }
    if (matchResult[1] == "") {
        //alert("kết quả trống");
        showModal("kết quả trống");
        return false;
    }

    if (!checkGoalsMatchScore(goalData, matchResult)) {
        return false;
    }

    for (let i = 0; i < goalData.length; i++) {
        goalData[i][4] = goalData[i][4].toLowerCase();
        if (!currentGoalTypes.includes(goalData[i][4])) {
            //alert("Thông tin bàn thắng không phù hợp");
            console.log(currentGoalTypes);
            showModal("Thông tin bàn thắng không phù hợp");
            return false;
        }
        goalTime = parseFloat(goalData[i][5]);
        // Kiểm tra nếu thời gian không phải là số thực hợp lệ, số nguyên dương nhỏ hơn 96
        if (
            goalTime < 0 ||
            goalTime > currentMaxGoalTime ||
            !Number.isInteger(goalTime)
        ) {
            //alert(`Thời gian ghi bàn không phù hợp`);
            showModal(`Thời gian ghi bàn không phù hợp`);
            return false;
        }
    }

    if (!checkDuplicateGoals(goalData)) {
        return false;
    }
    if (matchResult[1] != currentMatch.Score) {
        currentMatch.Score = matchResult[1];
        updateMatchResult(currentMatch);
    }
    console.log(goalData);
    const result = await updateGoalPlayerList(goalData);
    if (!result) {
        console.log("fail");
        return false;
    }

    //tableGoals=[]; // Không biết tại sao nhưng
    // mà vô tình thêm vào nó chạy được :)
    // Thay đổi nút "Lưu" lại thành "Sửa đổi kết quả"
    document.getElementById("changeInfoButton").innerText = "Sửa đổi kết quả";
    document.getElementById("changeInfoButton").onclick = function () {
        changeToEditMode(); // Đưa trở lại chế độ chỉnh sửa
    };
    console.log("success");
    return true;
}

function checkDuplicateGoals(goalData) {
    const seenGoals = new Map(); // Dùng Map để theo dõi cầu thủ, đội và thời gian

    for (let goal of goalData) {
        const playerName = goal[1];
        const playerNumber = goal[2];
        const teamName = goal[3];
        const goalTime = goal[5];

        // Tạo key duy nhất để kiểm tra sự trùng lặp
        const goalKey = `${goalTime}`;

        // Kiểm tra xem key đã tồn tại trong Map chưa
        if (seenGoals.has(goalKey)) {
            //alert(`Cầu thủ ${playerName} (số ${playerNumber}) đã có bàn thắng vào thời điểm ${goalTime} cho đội ${teamName}.`);
            showModal(
                `Không được có 2 cầu thủ ghi bàn cùng 1 thời điểm trong trận đấu.`
            );
            return false; // Nếu trùng lặp, trả về false
        } else {
            seenGoals.set(goalKey, true); // Nếu không trùng lặp, thêm vào Map
        }
    }

    console.log("Không có trùng lặp.");
    return true; // Nếu không có trùng lặp, trả về true
}

const alertmodal = document.getElementById("alertModal");
const closeModal = document.getElementById("closeModal");
let new__season = false;

function showModal(message, type = "error") {
    document.getElementById("alert-content").textContent = message;
    alertmodal.classList.remove("hidden");
    if (type === "new__season") {
        new__season = true;
    }
}

closeModal.addEventListener("click", () => {
    alertmodal.classList.add("hidden");
    if (new__season) {
        location.reload();
    }
});

function checkGoalsMatchScore(goalData, matchResult) {
    const score = matchResult[1].split("-").map(Number);
    const team1Goals = goalData.filter(
        (goal) => goal[3] === matchResult[0]
    ).length;
    const team2Goals = goalData.filter(
        (goal) => goal[3] === matchResult[2]
    ).length;

    if (!validatePlayersBelongToTeams(goalData, matchResult)) {
        showModal("Cầu thủ phải nằm trong 2 đội.");
        return false;
    }

    if (team1Goals !== score[0] || team2Goals !== score[1]) {
        showModal("Số bàn thắng không khớp với tỷ số.");
        return false;
    }
    return true;
}
const start_new = document.getElementById("start__new");
let nextSeason = "";
if (!firstLoad()) {
    document.getElementById("image").remove();
    document.getElementById("changeInfoButton").style.display = "none";
    start_new.remove();
} else {
    start_new.addEventListener("click", () => {
        //không tôi chỉ muốn get /createSchedule/:season thôi
        fetch("http://localhost:3000/admin/createSchedule/" + nextSeason, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create new schedule");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                //alert("New schedule created successfully");
                showModal("New schedule created successfully", "new__season");
                getMatches();
            })
            .catch((error) => {
                console.error("Error creating new schedule:", error);
                showModal("Failed to create new schedule");
            });
    });
}
const nex__season = document.getElementById("nex__season");

fetch("http://localhost:3000/admin/checkNextSeason", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to check next season");
        }
        return response.json();
    })
    .then((data) => {
        if (data.nextSeason === null) {
            const calendar =
                document.getElementsByClassName("create-calendar")[0];
            calendar.children[0].remove();
            const nex__season = document.getElementById("nex__season");
            new__season.parentElement.innerHTML =
                "Không có mùa giải tiếp theo. Tạo mùa giải mới?";
            const start__new = document.getElementById("start__new");
            start__new.innerHTML = "Tạo mùa giải mới";
            start__new.onclick = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:3000/admin/createNextSeason",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to create new season");
                    }
                    const data = await response.json();
                    //alert("New season created successfully");
                    showModal("New season created successfully", "new__season");
                    location.reload();
                } catch (error) {
                    console.error("Error creating new season:", error);
                    //alert("Failed to create new season");
                    showModal("Failed to create new season");
                }
            };
            return;
        }
        nextSeason = data.nextSeason;
        nex__season.textContent = data.nextSeason;
        document.getElementById("register__teams").textContent =
            data.numTeamsNextSeason;
        document.getElementById("remain__teams").textContent =
            5 - Number(data.numTeamsNextSeason);
    })
    .catch((error) => {
        console.error("Error checking next season:", error);
        showModal("Failed to check next season");
    });

function validatePlayersBelongToTeams(goalData, matchResult) {
    const team1 = matchResult[0];
    const team2 = matchResult[2];
    for (const goal of goalData) {
        if (goal[3] !== team1 && goal[3] !== team2) {
            return false;
        }
    }
    return true;
}
