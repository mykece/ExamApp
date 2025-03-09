Detailed Description:

ExamApp is a web-based platform developed using JavaScript, CSS, HTML, C#, and SCSS, aimed at providing a seamless experience for managing exams. The application allows teachers to create and manage exams, add questions, and categorize them based on subjects. Students can take exams and view their results, while administrators can oversee the entire process, ensuring everything runs smoothly. The project utilizes ASP.NET Core for backend development and integrates with SQL Server for robust data management. With a focus on user authentication and authorization, ExamApp ensures that all users can securely access and manage their respective functionalities.

## 📌 Project Description

ExamApp is a web application that allows users to create, manage, and analyze exam results. This project aims to digitalize the exam processes for educational institutions, teachers, and students.

## 🛠 Technologies Used

| Technology | Description |
|------------|-------------|
| **JavaScript** | Main development language |
| **CSS** | Styling and design |
| **HTML** | Markup language |
| **C#** | Backend development |
| **SCSS** | Enhanced version of CSS |

## 📁 Project Folder Structure

```plaintext
ExamApp
│── src
│   ├── components
│   ├── pages
│   ├── services
│── public
│   ├── assets
│   ├── index.html
│── .gitignore
│── package.json
│── README.md
```

## 📊 Database Schema

This project is a management system for exams, including user management, exam management, questions, and categories. Below is a detailed database schema and relationships.

---

## 📌 **Table Structures**

### 🔹 **User Management**
| **Table** | **Description** |
|-----------|-----------------|
| `Users` | Stores user information (Admin, Teacher, Student) |
| `Roles` | Contains user roles (Admin, Teacher, Student) |
| `UserRoles` | Manages the **many-to-many** relationship between users and roles |

---

### 📝 **Exam Management**
| **Table** | **Description** |
|-----------|-----------------|
| `Exams` | Contains exam information (Title, Description, Publish Date, Teacher) |
| `Questions` | Contains exam questions (Question Text, Options, Correct Answer) |
| `Categories` | Manages exam categories |
| `ExamQuestions` | Manages the **many-to-many** relationship between exams and questions |

---

### 🏷 **Category System**
| **Table** | **Description** |
|-----------|-----------------|
| `Categories` | Contains categories used in exams (Math, Science, History) |
| `ExamCategories` | Manages the **many-to-many** relationship between exams and categories |

---

## 🔗 **Database Relationships**
- **`Users` → `Exams`** → (1-N) **A user can create multiple exams.**
- **`Exams` → `Questions`** → (N-N) **An exam can have multiple questions.**
- **`Exams` → `Categories`** → (N-N) **An exam can belong to multiple categories.**

---

## Requirements

- **Node.js** and **npm**
- **SQL Server** or **SQL Server Express**
- **Visual Studio Code** or another IDE

## Getting Started

### 1. Clone the Project

First, clone the project from GitHub to your computer:

```bash
git clone https://github.com/mykece/ExamApp.git
```

### 2. Edit the Connection String

Edit the contents of the `appsettings.json` file as follows:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=ExamApp;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. Apply Database Migrations

Before running the project for the first time, you need to apply database migrations to create the database structure. Follow these steps:

a. Open the Package Manager Console (Visual Studio)

Open it from Tools > NuGet Package Manager > Package Manager Console.

b. Apply the Migrations

Run the following commands to apply the migrations:

```bash
Add-Migration InitialCreate
Update-Database
```

### 4. User Roles

In the project, add roles like `Teacher` and `Student` to the `Roles` table. You need to add these roles manually. Use a tool like SQL Server Management Studio (SSMS) to run the following SQL commands:

```sql
INSERT INTO Roles (Id, Name, NormalizedName) VALUES (NEWID(), 'Teacher', 'TEACHER');
INSERT INTO Roles (Id, Name, NormalizedName) VALUES (NEWID(), 'Student', 'STUDENT');
```

## Configuring the Mail Service

The project uses a mail service to send emails through the `MailService` class. You need a **Gmail account** to send emails via SMTP.

### 1. Create a Gmail Account

To use the mail service, you need a Gmail account. The project will send emails using this account. If you don't have a Gmail account, create one [here](https://accounts.google.com/signup).

### 2. Create an App Password in Gmail

For secure email sending, create an app password in your Gmail account. Sign in to your Gmail account and follow these steps:

1. [Sign In to Your Google Account](https://myaccount.google.com/).
2. Go to the "Security" tab.
3. Click on the "App passwords" section.
4. If 2-step verification (2FA) is enabled, create a new password here.
5. Create an "App password" and use it for SMTP authentication in the `MailService` class.

### 3. Configure the `MailService`

The `MailService` class in the project works as follows. Ensure you fill in the parameters correctly to send emails:

```csharp
public class MailService : IMailService
{
    public async Task SendMailAsync(SendMailDTO sendMailDTO)
    {
        try
        {
            var newMail = new MimeMessage();
            newMail.From.Add(MailboxAddress.Parse("YOUR-EMAIL"));  // Sender email address
            newMail.To.Add(MailboxAddress.Parse(sendMailDTO.Email));  // Recipient email address
            newMail.Subject = sendMailDTO.Subject;  // Email subject
            var builder = new BodyBuilder();
            builder.HtmlBody = sendMailDTO.Message;  // Email message content
            newMail.Body = builder.ToMessageBody();
            
            var smtp = new SmtpClient();
            
            // SMTP connection
            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            
            // Email account authentication
            await smtp.AuthenticateAsync("YOUR-EMAIL", "YOUR-EMAIL-PASSWORD");  // Use your Gmail app password here.
            
            // Send the email
            await smtp.SendAsync(newMail);
            await smtp.DisconnectAsync(true);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"An error occurred while sending the email: {ex.Message}");
        }
    }
}
```

### 4. Start the Application

After configuring everything related to the project, start the application by running the following command:

```bash
npm start
```

## Contributing

If you want to contribute, please start by opening an issue to discuss what you would like to work on. Pull requests are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, please contact [mykece](https://github.com/mykece).
