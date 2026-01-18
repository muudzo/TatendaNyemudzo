/**
 * Portfolio Data - Extracted from Tatenda Nyemudzo's CV
 * This data will be used to populate the portfolio apps in Phase 3
 */

const PortfolioData = {
    // Personal Information
    name: "Tatenda Nyemudzo",
    title: "Full Stack Developer",
    location: "Leeuwarden, The Netherlands",
    phone: "+31 6 4717 9310",
    email: "tatendawalter62@gmail.com",
    github: "github.com/muudzo",

    // Professional Summary
    summary: `I'm a Full Stack Developer combining design with a "product-first" mindset. I have a proven ability to architect and deploy end to end solutions (Laravel, Node.js, PWA), moving rapidly from idea to prototype and then production. Distinguished by a track record of identifying market gaps specifically in Fintech, Agritech, and public welfare and engineering technical solutions that secured buy-in and executive sponsorship. Recipient of the NHL Stenden Excellency Scholarship.`,

    // Technical Arsenal
    skills: {
        languages: [
            "PHP 8+",
            "JavaScript (ES6+)",
            "TypeScript",
            "Python",
            "SQL"
        ],
        frameworks: [
            "Laravel (MVC)",
            "React.js",
            "Express",
            "FastAPI"
        ],
        webTechnologies: [
            "Progressive Web Apps (PWA)",
            "REST APIs",
            "Service Workers"
        ],
        devOpsTools: [
            "Git",
            "GitHub",
            "MySQL",
            "MongoDB",
            "Figma (UI/UX)"
        ]
    },

    // Projects Portfolio
    projects: [
        {
            id: "zse-platform",
            title: "ZSE Investment Learning Platform",
            role: "Full Stack DEVELOPER",
            description: "Designed and shipped a simulation platform to democratize access to the Zimbabwe Stock Exchange (ZSE).",
            technologies: ["Laravel", "MySQL", "JavaScript", "PWA"],
            highlights: [
                "Backend Architecture (Laravel): Built a robust MVC application using Laravel to handle complex user authentication, portfolio management, and secure data transactions.",
                "Database Design: Leveraged Eloquent ORM to manage intricate relationships between user profiles, virtual wallets, and real-time stock data.",
                "Frontend Logic: Developed a responsive interface optimized for low-bandwidth environments, ensuring accessibility for the target demographic."
            ],
            category: "Fintech"
        },
        // More projects can be added as user provides them
    ],

    // About Me (from professional summary)
    about: {
        intro: "Full Stack Developer with a product-first mindset",
        focus: "Fintech, Agritech, and public welfare solutions",
        approach: "Rapid prototyping from idea to production",
        recognition: "NHL Stenden Excellency Scholarship Recipient"
    }
};

// Export for use in apps
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioData;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
    window.PortfolioData = PortfolioData;
}
