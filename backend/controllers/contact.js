const nodemailer = require("nodemailer");

exports.getcontact = (req, res) => {
    res.render("home_packages/contact");
};

exports.postcontact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "muyenzija10@gmail.com",
                pass: "snvfcgbfzwegumzg" // Correct App Password (NO SPACES)
            }
        });

        const mailOptions = {
            from: `"Website Contact" <muyenzija10@gmail.com>`,
            replyTo: email,
            to: "muyenzija10@gmail.com",
            subject: `New Contact Message from ${name}`,
            html: `
                <h3>New Contact Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email (visitor):</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        req.flash("success_msg", "Your message has been sent successfully!");
        res.redirect("/contact");

    } catch (error) {
        console.error("Error sending email:", error);
        req.flash("error_msg", "Something went wrong. Please try again later.");
        res.redirect("/contact");
    }
};
