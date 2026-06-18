// زر تغيير الوضع الليلي والنهاري
document.getElementById("toggle-theme").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// رسالة ترحيب ديناميكية
window.addEventListener("load", function() {
  const welcome = document.getElementById("welcome-message");
  const hours = new Date().getHours();
  let greeting;

  if (hours < 12) {
    greeting = "صباح الخير 🌞 يوسف جمال صادق";
  } else if (hours < 18) {
    greeting = "مساء الخير 🌤 يوسف جمال صادق";
  } else {
    greeting = "مساء هادئ 🌙 يوسف جمال صادق";
  }

  welcome.textContent = greeting;
});

// حركة سلسة عند الضغط على الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
