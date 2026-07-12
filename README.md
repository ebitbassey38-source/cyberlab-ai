# CyberLab AI

An AI-powered cybersecurity platform backend, built entirely on an Android phone using Termux, Node.js, Express, and MongoDB Atlas.

CyberLab AI provides a secure, multi-user system for tracking security assets, vulnerabilities, compliance, risk, and running AI-assisted security testing and analysis — combining traditional GRC (Governance, Risk, Compliance) tooling with live AI integration.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Authentication:** JWT + bcrypt password hashing
- **AI Integration:** Groq API (Llama 3.3 70B)
- **File Handling:** Multer

## Features

### Core Security
- User authentication (register/login) with hashed passwords
- Role-Based Access Control (admin/user)
- JWT-based protected routes

### Security Management Modules
- **Asset Inventory** — track servers, workstations, applications, and more
- **Vulnerability Management** — log and track vulnerabilities linked to assets
- **Scan History** — record security scans with timestamps and findings
- **Security Reports** — aggregate summaries linking multiple assets and vulnerabilities
- **Compliance Tracking** — track requirements against frameworks (ISO27001, NIST, PCI-DSS, GDPR, SOC2)
- **Risk Assessment** — likelihood/impact-based risk tracking with mitigation plans
- **File Uploads** — attach evidence files to assets, scoped per user

### AI-Powered Modules (Groq / Llama 3.3)
- **AI Security Assistant** — ask general cybersecurity questions
- **AI Code Review** — submit code snippets for AI-driven vulnerability analysis
- **White-box Testing** — AI-analyzed code review with structured severity extraction
- **Black-box Testing** — AI-analyzed behavioral testing based on observed system responses
- **Red/Blue/Purple Team Exercises** — log security exercises with optional AI-generated recommendations
- **Penetration Testing** — record findings and receive AI-generated executive risk summaries
- **AI Agent System** — an autonomous agent that queries live user data (assets, vulnerabilities, risks) to answer open-ended security questions with real, data-grounded context

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT | No |
| GET | `/auth/profile` | Get current user profile | Yes |
| GET | `/auth/admin-only` | Example admin-only route | Yes (admin) |
| POST | `/assets` | Create an asset | Yes |
| GET | `/assets` | List your assets | Yes |
| POST | `/vulnerabilities` | Report a vulnerability | Yes |
| GET | `/vulnerabilities` | List your vulnerabilities | Yes |
| POST | `/scans` | Record a scan | Yes |
| GET | `/scans` | List scan history | Yes |
| POST | `/reports` | Create a security report | Yes |
| GET | `/reports` | List your reports | Yes |
| POST | `/compliance` | Add a compliance record | Yes |
| GET | `/compliance` | List compliance records | Yes |
| POST | `/risks` | Add a risk assessment | Yes |
| GET | `/risks` | List risk assessments | Yes |
| POST | `/files` | Upload a file | Yes |
| GET | `/files` | List uploaded files | Yes |
| POST | `/ai/ask` | Ask the AI Security Assistant | Yes |
| POST | `/code-review` | Submit code for AI review | Yes |
| POST | `/whitebox-tests` | Run a white-box test | Yes |
| GET | `/whitebox-tests` | List white-box tests | Yes |
| POST | `/blackbox-tests` | Run a black-box test | Yes |
| GET | `/blackbox-tests` | List black-box tests | Yes |
| POST | `/team-exercises` | Log a team exercise | Yes |
| GET | `/team-exercises` | List team exercises | Yes |
| POST | `/pentests` | Record a penetration test | Yes |
| GET | `/pentests` | List penetration tests | Yes |
| POST | `/agent/query` | Query the AI agent | Yes |

## Architecture Highlights

- Every module follows a consistent Model → Controller → Route pattern
- Data isolation: users only ever see their own data, enforced at the query level
- Relational data via Mongoose references (`ObjectId` + `.populate()`) linking Assets, Vulnerabilities, Reports, and more
- AI responses are parsed into structured data (e.g., severity ratings extracted via regex) rather than left as unstructured text
- Secrets (database credentials, JWT secret, AI API keys) are never hardcoded — managed via environment variables

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
4. Run `node index.js`

## Author

Built by Bassey (ebitbassey38-source) — a self-taught full-stack developer building toward professional developer status, entirely from an Android phone using Termux.
