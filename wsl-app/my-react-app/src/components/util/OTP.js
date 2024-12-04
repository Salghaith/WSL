import React from "react";
import axios from "axios";
const otpStore = new Map();
const sendOTP = (email, apiBaseUrl) => {
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  const otp = generateOTP();
  const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
  otpStore.set(email, { otp, expiry });
  const message = `Your OTP for reset password is ${otp}. It is valid for 1 hour`;
  sendEmail(email, message, apiBaseUrl);
  return otp;
};
const sendEmail = async (to, subject, apiBaseUrl) => {
  try {
    const html = "<p>No reply email, from WSL</p>";
    const response = await axios.post(
      `${apiBaseUrl}/business/mail`,
      {
        to,
        subject,
        html
      },
      { withCredentials: true }
    );

    if (response.status === 201) {
      console.log("Email sent successfully:", response.data);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const verifyOTP = (email, inputOtp) => {
  const record = otpStore.get(email);
  if (!record) return false;

  if (record.expiry < Date.now()) {
    otpStore.delete(email); // Remove expired OTP
    console.log("Expired OTP");
    return false;
  }

  if (String(record.otp) === inputOtp) {
    otpStore.delete(email); // Remove used OTP
    return true;
  }
  console.log("Does not match OTP");
  return false;
};

export { sendOTP, verifyOTP };
