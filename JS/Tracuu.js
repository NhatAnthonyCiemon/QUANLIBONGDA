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