const localDateTimeString = "2024-04-06T10:30:00"; // Chuỗi LocalDateTime mẫu

// Phân tích chuỗi thành đối tượng Date
const dateTime = new Date(localDateTimeString);
console.log(dateTime.toISOString());


// Trích xuất phần ngày
const localDate = dateTime.toISOString().split('T')[0];

console.log(localDate);