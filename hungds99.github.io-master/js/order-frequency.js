// Lấy dữ liệu từ localStorage
let DATABASE = JSON.parse(localStorage.getItem('DATABASE')) || { ORDERS: [] };
let ORDERS = DATABASE.ORDERS;

// Hàm tính toán số lần xuất hiện của sản phẩm
function calculateProductFrequency(orders) {
    const frequencyMap = {};

    orders.forEach(order => {
        order.products.forEach(product => {
            if (frequencyMap[product.productName]) {
                frequencyMap[product.productName]++;
            } else {
                frequencyMap[product.productName] = 1;
            }
        });
    });

    return frequencyMap;
}

// Hàm hiển thị số lần xuất hiện của sản phẩm
function displayProductFrequency(frequencyMap) {
    const tableBody = document.getElementById('product-frequency-body');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ

    const entries = Object.entries(frequencyMap);

    if (entries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2" class="text-center">Không có dữ liệu để hiển thị</td></tr>`;
        return;
    }

    entries.forEach(([productName, count]) => {
        const row = `
            <tr>
                <td>${productName}</td>
                <td>${count}</td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}
// Hàm hiển thị biểu đồ
function displayProductFrequencyChart(frequencyMap) {
    const ctx = document.getElementById("productChart").getContext("2d");

    const labels = Object.keys(frequencyMap); // Tên sản phẩm
    const data = Object.values(frequencyMap); // Số lần đặt

    new Chart(ctx, {
        type: "bar", // Biểu đồ dạng cột
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Số Lần Đặt",
                    data: data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true, // Bắt đầu từ 0
                },
            },
        },
    });
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    const productFrequency = calculateProductFrequency(ORDERS);
    displayProductFrequency(productFrequency);
});