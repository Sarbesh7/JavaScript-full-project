const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const file = document.getElementById("file").files[0];
  const password = document.getElementById("password").value;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  try {
    if (name.length < 3) throw new Error("Name must be at least 3 characters.");
    if (name.length > 12) throw new Error("Name must be less than 13 characters.");
    if (/\s/.test(name)) throw new Error("Name must not contain spaces.");
    if (/\d/.test(name)) throw new Error("Name must not contain numbers.");
    if (/[!@#$%^&*()_+]/.test(name)) throw new Error("Name must not contain special characters.");
    if (name[0] !== name[0].toUpperCase()) throw new Error("Name must start with an uppercase letter.");
    for (let i = 1; i < name.length; i++) {
      if (name[i] === name[i].toUpperCase()) {
        throw new Error("Only first letter should be uppercase.");
      }
    }

    if (!email.includes("@")) throw new Error("Enter a valid email address.");

    if (!file) throw new Error("Please upload a file.");
    if (file.size > 2000000) throw new Error("File must be less than 2MB.");
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) throw new Error("Only png, jpg, jpeg allowed.");

    if (!passwordRegex.test(password)) {
      throw new Error("Password must be 8+ characters, include uppercase, lowercase, number, and symbol.");
    }

    alert("✅ Form submitted successfully!");
  } catch (err) {
    alert("❌ " + err.message);
  }
});
