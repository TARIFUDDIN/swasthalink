markdown
# Nabha Telemedicine Platform

A modern telemedicine platform built with Next.js that connects patients with doctors for online consultations, prescription management, and pharmacy services.

## 🌟 Features

- **Video Consultations**: Secure video calls with doctors using Jitsi Meet
- **Appointment Booking**: Easy scheduling with real-time availability
- **Doctor Profiles**: Browse qualified doctors with specialties and languages
- **Health Records**: Digital storage of medical history and prescriptions
- **Pharmacy Integration**: Find medicines and nearby pharmacies
- **User Authentication**: Secure login with Clerk authentication

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed
- A GitHub account
- A code editor (VS Code recommended)

### Step 1: Clone the Repository

```bash
# Copy the project to your computer
git clone https://github.com/your-username/telemedicine-nabha.git

# Move into the project folder
cd telemedicine-nabha
Step 2: Install Dependencies
bash
# Install all required packages
npm install
Step 3: Environment Setup
Create a .env file in the root folder

Copy this template and fill in your values:

env
# Database (Get from Neon.tech - free tier)
DATABASE_URL="your_database_connection_string_here"

# Authentication (Get from Clerk.dev - free tier)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Optional: Google AI API (for future features)
GOOGLE_AI_API_KEY="your_google_ai_key"

# Use this connection string format for Neon
DATABASE_URL="postgresql://neondb_owner:npg_5wz6nABGjWqM@ep-damp-waterfall-adoxtcu7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&connection_limit=5"

# Keep your other variables the same
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJpbmctcGFyYWtlZXQtODEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_hNJhMFnyTHjHAqzzwHexqYYa5nKep2k4HKBDtEFCmW
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
GOOGLE_AI_API_KEY=AIzaSyBV5CxrONQeT3cnNH_EcuzJN60FVorIQVo
Step 4: Get Your Free API Keys
🔐 Clerk Authentication (Free)
Go to https://clerk.dev

Sign up for free

Create a new application

Copy the Publishable Key and Secret Key to your .env file

🗄️ Neon Database (Free)
Go to https://neon.tech

Sign up for free

Create a new PostgreSQL database

Copy the connection string to your .env file

Important: Add ?sslmode=require at the end of your connection string

Step 5: Setup Database
bash
# Generate Prisma client
npx prisma generate

# Push schema to your database
npx prisma db push

# (Optional) View and edit your database visually
npx prisma studio
Step 6: Add Sample Data
After running npx prisma studio, add some test doctors:

Click "User" model → "Add record"

Create a doctor with these values:

id: doc1

clerkId: test_doctor_1

email: doctor@example.com

firstName: Rajesh

lastName: Kumar

role: DOCTOR

specialization: General Medicine

experience: 8

languages: ["Hindi", "English"]

Step 7: Run the Development Server
bash
# Start the development server
npm run dev
Open http://localhost:3000 in your browser to see the application!

📁 Project Structure
text
telemedicine-nabha/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── consultation/   # Consultation booking page
│   │   └── dashboard/      # User dashboard
│   ├── components/         # Reusable React components
│   └── lib/               # Utility functions and configurations
├── prisma/
│   └── schema.prisma      # Database schema
└── public/                # Static assets
🛠️ Common Issues & Solutions
❌ "Can't reach database server"
Check your Neon database is running

Verify your connection string in .env

Make sure you added ?sslmode=require at the end

❌ "Clerk authentication failed"
Verify your Clerk keys in .env

Check that your Clerk app URL is set to http://localhost:3000

❌ "No doctors available"
Run npx prisma studio and add doctor accounts

Make sure doctor accounts have role: DOCTOR

❌ "Port 3000 already in use"
bash
# Use a different port
npm run dev -- -p 3001
📞 Support
If you get stuck, here are some resources:

Check the Next.js documentation

Join our Discord community

Create an issue on GitHub

🚀 Deployment
Deploy to Vercel (Recommended)
Push your code to GitHub

Go to vercel.com

Import your GitHub repository

Add your environment variables in Vercel dashboard

Deploy!

Environment Variables for Production
Make sure to add these in your hosting platform:

DATABASE_URL

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

🤝 Contributing
We welcome contributions! Please feel free to:

Fork the project

Create a feature branch

Make your changes

Submit a pull request

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🙏 Acknowledgments
Built with Next.js

Authentication by Clerk

Database by Neon

Video calls by Jitsi Meet

Icons by Lucide

Happy coding! 🎉 If you have any questions, don't hesitate to ask in the issues section.

text

This README includes:
1. **Step-by-step instructions** for complete beginners
2. **Visual cues** with emojis for better readability
3. **Troubleshooting section** for common issues
4. **Free service links** for all required APIs
5. **Simple language** that non-technical users can understand
6. **Deployment instructions** for going live

The guide assumes zero prior knowledge and walks through every step from cloning to deployment.
