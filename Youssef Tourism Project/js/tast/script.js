document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("umrahForm");
    const successMessage = document.getElementById("successMessage");

    const passportInput = document.getElementById("passport");
    const photoInput = document.getElementById("photo");

    // معاينة الصور
    passportInput.addEventListener("change", function() {
        previewImage(this, "passportPreview");
    });
    photoInput.addEventListener("change", function() {
        previewImage(this, "photoPreview");
    });

    function previewImage(input, previewId) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let img = document.getElementById(previewId);
                if (!img) {
                    img = document.createElement("img");
                    img.id = previewId;
                    img.style.maxWidth = "150px";
                    img.style.marginTop = "10px";
                    input.parentNode.appendChild(img);
                }
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // إظهار رسالة خطأ تحت كل خانة
    function showError(input, message) {
        let error = input.parentNode.querySelector(".error-message");
        if (!error) {
            error = document.createElement("div");
            error.className = "error-message";
            error.style.color = "red";
            error.style.fontSize = "14px";
            error.style.marginTop = "5px";
            input.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(el => el.remove());
    }

    // التحقق من الصور
    function validateImages() {
        const passportFile = passportInput.files[0];
        const photoFile = photoInput.files[0];

        if (!passportFile) {
            showError(passportInput, "❌ يجب رفع صورة الجواز.");
            return false;
        }

        if (!photoFile) {
            showError(photoInput, "❌ يجب رفع صورة شخصية بخلفية بيضاء.");
            return false;
        }

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function() {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // أخذ عينة من البكسلات في الأطراف للتأكد من أنها بيضاء
                    const sample = ctx.getImageData(5, 5, 10, 10).data;
                    let isWhite = true;
                    for (let i = 0; i < sample.length; i += 4) {
                        const r = sample[i], g = sample[i+1], b = sample[i+2];
                        if (!(r > 200 && g > 200 && b > 200)) {
                            isWhite = false;
                            break;
                        }
                    }

                    if (!isWhite) {
                        showError(photoInput, "❌ الصورة الشخصية يجب أن تكون بخلفية بيضاء.");
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                };
            };
            reader.readAsDataURL(photoFile);
        });
    }

    // التحقق من النموذج
    async function validateForm() {
        clearErrors();

        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const age = parseInt(document.getElementById("age").value);
        const days = parseInt(document.getElementById("days").value);

        let valid = true;

        if (fullName.length < 5) {
            showError(document.getElementById("fullName"), "❌ الاسم يجب أن يكون على الأقل 5 أحرف.");
            valid = false;
        }

        const phoneRegex = /^(05|01)\d{8,9}$/;
        if (!phoneRegex.test(phone)) {
            showError(document.getElementById("phone"), "❌ رقم الهاتف غير صحيح.");
            valid = false;
        }

        if (isNaN(age) || age < 18) {
            showError(document.getElementById("age"), "❌ العمر يجب أن يكون 18 سنة أو أكثر.");
            valid = false;
        }

        if (isNaN(days) || days < 1) {
            showError(document.getElementById("days"), "❌ عدد الأيام يجب أن يكون 1 أو أكثر.");
            valid = false;
        }

        if (!valid) return false;

        const imagesValid = await validateImages();
        return imagesValid;
    }

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (await validateForm()) {
            successMessage.style.display = "block";
            successMessage.innerHTML = `
                <h2>✅ البيانات صحيحة!</h2>
                <p>تم استلام طلبك بنجاح وسنتواصل معك قريباً.</p>
            `;
            form.reset();
        } else {
            successMessage.style.display = "block";
            successMessage.innerHTML = `
                <h2>❌ البيانات غير صحيحة!</h2>
                <p>من فضلك صحح الأخطاء وحاول مرة أخرى.</p>
            `;
        }
    });
});
