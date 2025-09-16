// Dynamic configuration for telemedicine platform
export const siteConfig = {
  name: "Nabha Telemedicine",
  description: "Professional healthcare platform offering remote consultations, symptom checking, pharmacy services, and medical records management.",
  url: "https://nabha-telemedicine.com",
  ogImage: "https://nabha-telemedicine.com/og.jpg",
  links: {
    twitter: "https://twitter.com/nabhahealth",
    github: "https://github.com/nabha-telemedicine",
  },
}

export const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Symptom Checker", href: "/symptom-checker" },
    { name: "Consultation", href: "/consultation" },
    { name: "Pharmacy", href: "/pharmacy" },
    { name: "Records", href: "/records" },
  ],
  footer: [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Consultations", href: "/consultation" },
        { name: "Health Records", href: "/records" },
        { name: "Pharmacy", href: "/pharmacy" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Emergency", href: "/emergency" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "HIPAA Compliance", href: "/hipaa" },
      ],
    },
  ],
}

export const heroSection = {
  title: "Professional Healthcare",
  subtitle: "At Your Fingertips",
  description: "Connect with licensed healthcare professionals through secure video consultations, track your health with our AI-powered symptom checker, and manage your medical records—all from the comfort of your home.",
  primaryButton: {
    text: "Start Consultation",
    href: "/consultation",
  },
  secondaryButton: {
    text: "Check Symptoms",
    href: "/symptom-checker",
  },
}

export const statsSection = {
  title: "Trusted Healthcare Platform",
  description: "Join thousands of patients who trust our platform for their healthcare needs",
  stats: [
    {
      value: "50K+",
      label: "Active Patients",
      description: "Trust our platform for their healthcare needs",
    },
    {
      value: "1,200+",
      label: "Licensed Doctors",
      description: "Available for consultations 24/7",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      description: "Of patients recommend our services",
    },
    {
      value: "24/7",
      label: "Available Support",
      description: "Emergency and routine care support",
    },
  ],
}

export const featuresSection = {
  title: "Complete Healthcare Solution",
  description: "Everything you need to manage your health in one secure platform",
  features: [
    {
      title: "Video Consultations",
      description: "Connect with licensed healthcare professionals through secure, HIPAA-compliant video calls.",
      icon: "Video",
      color: "primary",
    },
    {
      title: "AI Symptom Checker",
      description: "Get preliminary health insights with our advanced AI-powered symptom analysis tool.",
      icon: "Brain",
      color: "secondary",
    },
    {
      title: "Digital Pharmacy",
      description: "Order prescriptions online and track deliveries with our integrated pharmacy service.",
      icon: "Pill",
      color: "tertiary",
    },
    {
      title: "Health Records",
      description: "Securely store and access your complete medical history, test results, and prescriptions.",
      icon: "FileText",
      color: "primary",
    },
    {
      title: "Appointment Scheduling",
      description: "Book appointments with specialists and receive automated reminders and updates.",
      icon: "Calendar",
      color: "secondary",
    },
    {
      title: "Health Monitoring",
      description: "Track vital signs, symptoms, and health metrics with our comprehensive monitoring tools.",
      icon: "Activity",
      color: "tertiary",
    },
  ],
}

export const dashboardConfig = {
  title: "Your Health Dashboard",
  description: "Access all your healthcare services and information in one place",
  quickActions: [
    {
      title: "Schedule Consultation",
      description: "Book an appointment with a healthcare professional",
      href: "/consultation",
      icon: "Video",
      color: "primary",
      urgent: false,
    },
    {
      title: "Check Symptoms",
      description: "Use our AI-powered tool to assess your symptoms",
      href: "/symptom-checker",
      icon: "Brain",
      color: "secondary",
      urgent: false,
    },
    {
      title: "View Prescriptions",
      description: "Manage your medications and pharmacy orders",
      href: "/pharmacy",
      icon: "Pill",
      color: "tertiary",
      urgent: false,
    },
    {
      title: "Medical Records",
      description: "Access your complete health history and test results",
      href: "/records",
      icon: "FileText",
      color: "primary",
      urgent: false,
    },
  ],
  recentActivity: {
    title: "Recent Activity",
    items: [
      {
        type: "consultation",
        title: "Video consultation completed",
        description: "Dr. Sarah Johnson - General Medicine",
        time: "2 hours ago",
        status: "completed",
      },
      {
        type: "prescription",
        title: "Prescription filled",
        description: "Amoxicillin 500mg - Ready for pickup",
        time: "1 day ago",
        status: "ready",
      },
      {
        type: "test",
        title: "Lab results available",
        description: "Blood work results from City Lab",
        time: "3 days ago",
        status: "new",
      },
    ],
  },
}