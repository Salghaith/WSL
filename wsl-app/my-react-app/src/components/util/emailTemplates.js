export const userReviewEmailTemplate = () => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">Thank You for Your Review!</h2>
        <p>Dear User,</p>
        <p>
          Thank you for taking the time to share your review! We truly value your feedback and are glad to hear about your experience.
        </p>
        <p>Your review helps us improve and allows others to make informed decisions. If you have any additional thoughts or suggestions, feel free to let us know.</p>
        <p>We appreciate your support and look forward to serving you again in the future.</p>
        <p>Best regards,<br>WSL</p>
      </div>
    `;
};

export const ownerReviewNotificationTemplate = (
  reviewerName,
  reviewSnippet
) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007bff;">New Review for Your Business!</h2>
        <p>Dear Business Owner,</p>
        <p>
          Great news! A new review has been submitted for your business on WSL.
        </p>
        <p><strong>Reviewer Name:</strong> ${reviewerName}</p>
        <p><strong>Review:</strong> "${reviewSnippet}"</p>        
        <p>Thank you for being an essential part of our platform!</p>
        <p>Best regards,<br>WSL</p>
      </div>
    `;
};
