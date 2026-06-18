<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $fullName = $_POST['fullName'];
    $phone = $_POST['phone'];
    $age = $_POST['age'];
    $days = $_POST['days'];

    // مجلد لحفظ الصور
    $uploadDir = "uploads/";
    if(!is_dir($uploadDir)){
        mkdir($uploadDir, 0777, true);
    }

    // اسم موحد للملفات
    $timestamp = time();

    // حفظ صورة الجواز
    $passportPath = $uploadDir . $timestamp . "_passport_" . basename($_FILES["passport"]["name"]);
    $photoPath    = $uploadDir . $timestamp . "_photo_" . basename($_FILES["photo"]["name"]);

    if(move_uploaded_file($_FILES["passport"]["tmp_name"], $passportPath) &&
       move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath)) {

        // حفظ نسخة في ملف CSV
        $file = fopen("./clients.csv", "a");// فتح الملف في وضع الإضافة
        fputcsv($file, [$fullName, $phone, $age, $days, $passportPath, $photoPath, date("Y-m-d H:i:s")]);
        fclose($file);

        // إرسال إيميل
        $to = "youssefgami21@gmail.com"; 
        $subject = "طلب حجز عمرة جديد";
        $message = "الاسم: $fullName\nالهاتف: $phone\nالعمر: $age\nعدد الأيام: $days\n"
                 . "صورة الجواز: $passportPath\n"
                 . "الصورة الشخصية: $photoPath\n";
        $headers = "From: youssefgami21@gmail.com"; // تأكد من تغيير هذا إلى بريدك الإلكتروني الفعلي

        if(mail($to, $subject, $message, $headers)){
            echo "<div class='success-message success'>✅ تم إرسال البيانات وحفظ الصور بنجاح</div>";
        } else {
            echo "<div class='success-message error'>❌ حدث خطأ أثناء إرسال الإيميل</div>";
        }
    } else {
        echo "<div class='success-message error'>❌ فشل رفع الصور</div>";
    }
}
?>
