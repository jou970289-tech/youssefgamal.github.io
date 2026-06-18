<?php
// قراءة ملف CSV
$file = "clients.csv";

echo "<!DOCTYPE html>
<html lang='ar' dir='rtl'>
<head>
    <meta charset='UTF-8'>
    <title>لوحة العملاء</title>
    <style>
        body {
            font-family: Tahoma, sans-serif;
            background: #f4f7f9;
            padding: 20px;
        }
        h1 {
            text-align: center;
            color: #2c3e50;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: #fff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        th, td {
            border: 1px solid #ccc;
            padding: 12px;
            text-align: center;
        }
        th {
            background: #3498db;
            color: #fff;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        img {
            max-width: 100px;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <h1>📋 قائمة العملاء المسجلين</h1>
    <table>
        <tr>
            <th>الاسم الكامل</th>
            <th>رقم الهاتف</th>
            <th>العمر</th>
            <th>عدد الأيام</th>
            <th>صورة الجواز</th>
            <th>الصورة الشخصية</th>
            <th>تاريخ التسجيل</th>
        </tr>";

if(file_exists($file)){
    $handle = fopen($file, "r");
    while(($data = fgetcsv($handle)) !== FALSE){
        echo "<tr>";
        echo "<td>".$data[0]."</td>";
        echo "<td>".$data[1]."</td>";
        echo "<td>".$data[2]."</td>";
        echo "<td>".$data[3]."</td>";
        echo "<td><img src='".$data[4]."' alt='Passport'></td>";
        echo "<td><img src='".$data[5]."' alt='Photo'></td>";
        echo "<td>".$data[6]."</td>";
        echo "</tr>";
    }
    fclose($handle);
} else {
    echo "<tr><td colspan='7'>لا يوجد بيانات مسجلة بعد</td></tr>";
}

echo "</table>
</body>
</html>";
?>
