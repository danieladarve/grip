import sendgrid from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";
const Cipher = require("basic-cipher");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const formId = body.settings.formId;
    async function fetchGoogleVerification(body) {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${process.env.RECAPTCHA_SECRET}&response=${body.token}`,
        }
      );
      return await response.json();
    }

    const googleResponse = await fetchGoogleVerification(body);

    if (googleResponse?.score > 0.5) {
      const to = Cipher.decode(
        body.settings.recipients,
        process.env.SECURE_AUTH_KEY
      );
      let values = "";
      for (const [key, value] of Object.entries(body)) {
        if (key !== `settings` && key !== `token`) {
          const name = key.replaceAll(`${formId}--`, "");
          values += `<li><strong>${name}:</strong> ${value}</li>`;
        }
      }
      let error = false;
      await sendgrid
        .send({
          to: to.replaceAll(" ", "").split(","),
          from: "testing@evermade.life",
          // from: "getintouch@gripinsights.com.au",
          subject: body?.settings?.subject || "Contact from Grip",
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <head>
          <meta charset="utf-8" content="">
          <title>Contact Form</title>
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        </head>
        <body><ul>${values}</ul></body>
        </html>`,
        })
        .then(() => {
          error = false;
        })
        .catch(() => {
          error = true;
        });

      res.status(!error ? 200 : 500).json({
        status: !error ? "success" : "failure",
        message: !error
          ? "Enquiry submitted successfully"
          : "Your message could not be sent!",
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Google Recaptcha Failure",
      });
    }
  } catch (error) {
    res.status(405).json({
      status: "failure",
      message: "Error submitting the enquiry form",
    });
  }
}
