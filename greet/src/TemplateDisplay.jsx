
import React from 'react';

const TemplateDisplay = () => {
    const template = {
        "_id": "6758311204ba7116afdcc4d4",
        "name": "celebration",
        "subject": "Celebrate with Us!",
        "content": "<div style='background-color:#f1efee'><h2>Dear </h2><p>We hope this message finds you in great spirits! Today, we celebrate [insert occasion or reason for greeting, e.g., your special day or the joy of the season].</p><p>May your day be filled with joy, laughter, and cherished moments. We are honored to share this wonderful journey with you.</p><a href='[Insert CTA Link]' class='cta-button'>Celebrate with Us</a><div class='footer'><p>Thank you for being part of our journey. Stay connected with us for more updates!</p><p><a href='[Unsubscribe Link]'>Unsubscribe</a> | <a href='[Contact Link]'>Contact Us</a></p></div></div>",
        "category": "celebration",
        "createdBy": "admin",
        "createdAt": "2024-12-10T12:16:18.500Z",
        "updatedAt": "2024-12-10T12:16:18.500Z",
        "__v": 0
      };
  return (
    <div>
      <h1>{template.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: template.content}} />
    </div>
  );
};

export default TemplateDisplay;