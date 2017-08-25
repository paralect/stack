#load "SMTPSettings.csx"

public static SMTPSettings GetSMTPSettings() {
    return new SMTPSettings() { Host = "smtp.mailgun.org", User = "postmaster@sandbox3ef592e5fa6848168815b2a34ad9ceb6.mailgun.org", Passwd = "74ca78619db9bd6f519366162bf01380", From = "akulik@paralect.com" };
}