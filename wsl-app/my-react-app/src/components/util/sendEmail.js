import React from "react";
import axios from "axios";

const sendEmail = async (to, subject, html, apiBaseUrl) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/business/mail`,
      {
        to,
        subject,
        html,
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
export default sendEmail;
