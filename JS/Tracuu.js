//js của nút nhất chọn năm
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const arrowIcon = dropdownBtn.querySelector('svg');

dropdownBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    arrowIcon.classList.toggle('rotate');
});

// Close dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button') && !event.target.closest('.dropdown-button')) {
        dropdownMenu.style.display = 'none';
        arrowIcon.classList.remove('rotate');
    }
};
//Thiếu hiển thị theo dữ liệu


// js button danh sach cau thu với báo cáo mùa giải
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các nút và div tương ứng
    const playerButton = document.querySelector('.button-group .btn1');
    const reportButton = document.querySelector('.button-group .btn2');
    
    const playerListDiv = document.querySelector('.danhsachcauthu');
    const goalScorersDiv = document.querySelector('.danhsachcaccauthughiban');
    const rankingDiv = document.querySelector('.bangxephang');

    // Ẩn tất cả các div khi trang được tải
    playerListDiv.style.display = 'none';
    goalScorersDiv.style.display = 'none';
    rankingDiv.style.display = 'none';

    // Thêm sự kiện click cho nút "Danh sách cầu thủ"
    playerButton.addEventListener('click', function() {
        playerListDiv.style.display = 'block'; // Hiện div "Danh sách cầu thủ"
        goalScorersDiv.style.display = 'none'; // Ẩn div "Danh sách cầu thủ ghi bàn"
        rankingDiv.style.display = 'none'; // Ẩn div "Bảng xếp hạng"
    });

    // Thêm sự kiện click cho nút "Báo cáo mùa giải"
    reportButton.addEventListener('click', function() {
        playerListDiv.style.display = 'none'; // Ẩn div "Danh sách cầu thủ"
        goalScorersDiv.style.display = 'block'; // Hiện div "Danh sách cầu thủ ghi bàn"
        rankingDiv.style.display = 'block'; // Hiện div "Bảng xếp hạng"
    });

    // Thêm sự kiện keyup cho ô tìm kiếm
    const searchBox = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.icon');

    searchIcon.addEventListener('click', function() {
        const filter = searchBox.value.toLowerCase();
        const table = document.querySelector('table tbody');
        const rows = table.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let found = false;

            for (let j = 1; j < cells.length; j++) { // Bỏ qua cột STT
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
    const pointsWin = localStorage.getItem('pointsWin') || '3';
    const pointsDraw = localStorage.getItem('pointsDraw') || '1';
    const pointsLose = localStorage.getItem('pointsLose') || '0';
    //const ranking = localStorage.getItem('ranking') || 'điểm, hiệu số, tổng bàn thắng, đối kháng';

    document.getElementById('points-win').innerText = pointsWin;
    document.getElementById('points-draw').innerText = pointsDraw;
    document.getElementById('points-lose').innerText = pointsLose;
    //document.getElementById('rule-2').innerHTML = ` + Xếp hạng theo thứ tự: ${ranking}.`;
}

// Gọi hàm để tải quy định khi trang được tải
loadRules();

document.getElementById('change-rules-btn').addEventListener('click', function() {
    // Nhập nội dung mới cho quy định 1
    const pointsWin = prompt("Nhập điểm số thắng:", "3");
    const pointsDraw = prompt("Nhập điểm số hòa:", "1");
    const pointsLose = prompt("Nhập điểm số thua:", "0");
    //const newRanking = prompt("Nhập nội dung mới cho xếp hạng:", "điểm, hiệu số, tổng bàn thắng, đối kháng");

    // Chuyển đổi các giá trị nhập vào thành số
    const win = parseInt(pointsWin);
    const draw = parseInt(pointsDraw);
    const lose = parseInt(pointsLose);

    // Kiểm tra điều kiện: thắng > hòa > thua
    if (win > draw && draw > lose) {
        if (pointsWin) {
            document.getElementById('points-win').innerText = pointsWin;
            localStorage.setItem('pointsWin', pointsWin); // Lưu vào localStorage
        }
        
        if (pointsDraw) {
            document.getElementById('points-draw').innerText = pointsDraw;
            localStorage.setItem('pointsDraw', pointsDraw); // Lưu vào localStorage
        }

        if (pointsLose) {
            document.getElementById('points-lose').innerText = pointsLose;
            localStorage.setItem('pointsLose', pointsLose); // Lưu vào localStorage
        }

        // if (newRanking) {
        //     document.getElementById('rule-2').innerHTML = ` + Xếp hạng theo thứ tự: ${newRanking}.`;
        //     localStorage.setItem('ranking', newRanking); // Lưu vào localStorage
        // }
    } else {
        alert("Điểm số không hợp lệ! Vui lòng nhập lại: Điểm thắng > Điểm hòa > Điểm thua.");
    }
});
