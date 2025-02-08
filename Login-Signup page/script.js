import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPhoneNumber, 
    GoogleAuthProvider, 
    signInWithPopup, 
    RecaptchaVerifier 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBU0viMQ4ij_Twv7mrQvQwJR_b5A891Q9E",
    authDomain: "login-page-a4f20.firebaseapp.com",
    projectId: "login-page-a4f20",
    storageBucket: "login-page-a4f20.appspot.com",
    messagingSenderId: "872882392216",
    appId: "1:872882392216:web:f06d7a14f57a6fb48a94ed"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let recaptchaVerifier;
function initRecaptcha() {
    if (!recaptchaVerifier) {
        recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("reCAPTCHA Verified:", response);
            }
        }, auth);
        recaptchaVerifier.render().then(widgetId => {
            console.log("reCAPTCHA Rendered, Widget ID:", widgetId);
        });
    }
}

window.sendOTP = function() {
    const phoneNumber = document.getElementById("phone").value;
    const countryCode = document.getElementById("country").value;
    const fullPhoneNumber = countryCode + phoneNumber;

    if (!phoneNumber) {
        alert("Please enter a valid phone number.");
        return;
    }

    initRecaptcha(); 

    signInWithPhoneNumber(auth, fullPhoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP Sent Successfully!");
        })
        .catch((error) => {
            console.error("Error sending OTP:", error.message);
            alert("Failed to send OTP: " + error.message);
        });
};

window.verifyOTP = function() {
    const otp = document.getElementById("otp").value;

    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    window.confirmationResult.confirm(otp)
        .then((result) => {
            console.log("Signup successfully!");
            alert("Signup successfully!");
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            console.error("Error verifying OTP:", error.message);
            alert("Invalid OTP: " + error.message);
        });
};

window.signInWithGoogle = function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Signup successfully!");
            alert("Signup successfully!");
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error.message);
            alert("Google Sign-In Failed: " + error.message);
        });
};
