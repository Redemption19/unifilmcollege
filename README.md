# 🎓 Unifilm College Website

<div align="center">
  <img src="/public/images/unifilm-logo.PNG" alt="Unifilm College Logo" width="200"/>
  <p>Ghana's Premier Film & Creative Arts Institution</p>
</div>

## 🌟 Overview

Unifilm College is a modern web application built for Ghana's premier practical training institution for aspiring creatives. The platform offers comprehensive information about courses, admissions, and campus life while providing an intuitive interface for prospective students.

## ✨ Features

- 🎯 Interactive course catalog
- 📝 Online admission form purchase
- 💳 Multiple payment integration (Paystack)
- 📱 Responsive design
- 🖼️ Dynamic image gallery
- 📧 Contact form with email integration
- 🎨 Modern UI with animations

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Email](https://react.email/) - Email Templates
- [Paystack](https://paystack.com/) - Payment Processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/unifilmcollege.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add necessary environment variables
```bash
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
unifilmcollege/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admissions/        # Admissions page
│   ├── contact/           # Contact page
│   └── courses/           # Courses page
├── components/            # Reusable components
├── emails/                # Email templates
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_key
EMAIL_SERVER_HOST=your_email_host
EMAIL_SERVER_PORT=your_email_port
EMAIL_SERVER_USER=your_email_user
EMAIL_SERVER_PASSWORD=your_email_password
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (320px to 767px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Contact

- Website: [unifilmcollege.com](https://unifilmcollege.com)
- Email: universalfilmcollege@gmail.com
- Location: Kwashieman – Hong Kong, Lapaz Road, Ghana
- GPS: GA-528-3698
- Phone: 
  - 055 109 7942
  - 030 398 0046
  - 059 170 0051

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

<div align="center">
  Made with ❤️ by Unifilm College Team
</div>
