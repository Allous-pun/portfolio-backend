Register a new user

Endpoint:
POST http://localhost:5000/api/auth/register
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "123456"
}

Access protected route

Endpoint:
GET http://localhost:5000/api/auth/me

| Feature            | Status | Example Endpoint                         |
| ------------------ | ------ | ---------------------------------------- |
| Register/Login     | ✅      | `/api/auth/register` / `/api/auth/login` |
| Protected routes   | ✅      | `/api/auth/me`, `/api/projects` (POST)   |
| Create project     | ✅      | `/api/projects`                          |
| Get all projects   | ✅      | `/api/projects`                          |
| Get single project | ✅      | `/api/projects/:id`                      |
| Update project     | ✅      | `/api/projects/:id`                      |
| Delete project     | ✅      | `/api/projects/:id`                      |

Create a project (auth required)

POST http://localhost:5000/api/projects
{
  "title": "AI Chatbot Portfolio",
  "description": "An AI-powered chatbot built with React and OpenAI API",
  "technologies": ["React", "Node.js", "Express", "MongoDB"],
  "githubLink": "https://github.com/username/chatbot",
  "liveDemo": "https://chatbot-demo.vercel.app",
  "featured": true
}


Create/Update Profile

POST http://localhost:5000/api/profile
{
  "title": "Full Stack Developer",
  "tagline": "Building modern apps",
  "bio": "Passionate about backend systems and automation.",
  "location": "Nairobi, Kenya",
  "website": "https://mywebsite.com",
  "github": "https://github.com/me",
  "linkedin": "https://linkedin.com/in/me",
  "twitter": "https://twitter.com/me",
  "experience": [
    {
      "company": "Tech Corp",
      "role": "Backend Developer",
      "location": "Remote",
      "startDate": "2023-01-01",
      "endDate": null,
      "isCurrent": true,
      "description": "Built APIs using Node.js"
    }
  ],
  "education": [
    {
      "school": "University of Nairobi",
      "degree": "BS Computer Science",
      "fieldOfStudy": "Software Engineering",
      "startDate": "2019-01-01",
      "endDate": "2023-01-01"
    }
  ],
  "certificates": [
    {
      "name": "AWS Cloud Practitioner",
      "issuingOrganization": "Amazon",
      "issueDate": "2024-06-01",
      "credentialUrl": "https://aws.amazon.com"
    }
  ],
  "languages": [
    { "language": "English", "proficiency": "Fluent" },
    { "language": "Swahili", "proficiency": "Native" }
  ],
  "interests": ["AI", "Open Source", "Traveling"]
}
{
  "title": "Full Stack Developer",
  "tagline": "Building modern apps",
  "bio": "Passionate about backend systems and automation.",
  "location": "Nairobi, Kenya",
  "website": "https://mywebsite.com",
  "github": "https://github.com/me",
  "linkedin": "https://linkedin.com/in/me",
  "twitter": "https://twitter.com/me",
  "experience": [
    {
      "company": "Tech Corp",
      "role": "Backend Developer",
      "location": "Remote",
      "startDate": "2023-01-01",
      "endDate": null,
      "isCurrent": true,
      "description": "Built APIs using Node.js"
    }
  ],
  "education": [
    {
      "school": "University of Nairobi",
      "degree": "BS Computer Science",
      "fieldOfStudy": "Software Engineering",
      "startDate": "2019-01-01",
      "endDate": "2023-01-01"
    }
  ],
  "certificates": [
    {
      "name": "AWS Cloud Practitioner",
      "issuingOrganization": "Amazon",
      "issueDate": "2024-06-01",
      "credentialUrl": "https://aws.amazon.com"
    }
  ],
  "languages": [
    { "language": "English", "proficiency": "Fluent" },
    { "language": "Swahili", "proficiency": "Native" }
  ],
  "interests": ["AI", "Open Source", "Traveling"]
}

| Action             | Method | Endpoint                | Access  |
| ------------------ | ------ | ----------------------- | ------- |
| Get my profile     | GET    | `/api/profile`          |         |
| Create/Update      | POST   | `/api/profile`          | Private |
| **Update profile** | PUT    | `/api/profile`          | Private |
| **Delete profile** | DELETE | `/api/profile`          | Private |
| Get public profile | GET    |                         |         |

| Method   | Endpoint       | Auth Required | Result                   |
| -------- | -------------- | ------------- | ------------------------ |
| `GET`    | `/api/profile` | ❌ Public      | Returns your profile     |
| `POST`   | `/api/profile` | ✅ Yes         | Create or update profile |
| `PUT`    | `/api/profile` | ✅ Yes         | Update existing          |
| `DELETE` | `/api/profile` | ✅ Yes         | Delete profile           |


const techSkills = skills.filter(s => s.category === "technical");
const softSkills = skills.filter(s => s.category === "non-technical");

Create a Skill
POST http://localhost:5000/api/skills

{
  "name": "React.js",
  "category": "technical",
  "level": "Expert",
  "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "description": "Building interactive UIs and SPAs using React and TypeScript."
}

Add Non-Technical Skill

POST http://localhost:5000/api/skills
{
  "name": "Team Leadership",
  "category": "non-technical",
  "level": "Advanced",
  "description": "Managing and motivating cross-functional engineering teams."
}


Get All Skills

GET http://localhost:5000/api/skills

| Feature                | Status    | Example                      |
| ---------------------- | --------- | ---------------------------- |
| **Create Skill**       | ✅ Working | `POST /api/skills`           |
| **Get All Skills**     | ✅ Working | `GET /api/skills`            |
| **Update Skill**       | ✅ Working | `PUT /api/skills/:id`        |
| **Delete Skill**       | ✅ Working | `DELETE /api/skills/:id`     |
| **Dynamic Categories** | ✅ Working | `technical`, `non-technical` |

Get All Skills

GET /api/skills

→ Returns all grouped by category.

2️⃣ Get Only Technical Skills

GET /api/skills?category=technical

→ Returns only technical skills.

3️⃣ Search by Name

GET /api/skills?search=react

→ Returns skills matching “react”.

4️⃣ Combined Filter

GET /api/skills?category=technical&search=node

→ Returns only technical skills containing “node”

| Query                                          | Description                  |
| ---------------------------------------------- | ---------------------------- |
| `/api/skills`                                  | Get all, grouped by category |
| `/api/skills?category=technical`               | Only technical               |
| `/api/skills?search=react`                     | Search by name               |
| `/api/skills?sort=-level`                      | Sort descending by level     |
| `/api/skills?category=non-technical&sort=name` | Non-technical sorted by name |



| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/services`                 | Get all active services   |
| GET    | `/api/services?category=design` | Filter by category        |
| POST   | `/api/services`                 | Add a new service (Admin) |
| PUT    | `/api/services/:id`             | Update a service          |
| DELETE | `/api/services/:id`             | Delete a service          |

POST http://localhost:5000/api/testimonials
{
  "name": "Alice Ken",
  "company": "Visionary Tech",
  "role": "Product Manager",
  "message": "Working with you was smooth and professional!",
  "rating": 5,
  "avatar": "/avatars/avatar2.png"
}

PUT http://localhost:5000/api/testimonials/:id

GET http://localhost:5000/api/testimonials

| Feature                       | Who can do it     | API endpoint                   |
| ----------------------------- | ----------------- | ------------------------------ |
| Testimonial form (submit)     | Public / visitors | `POST /api/testimonials`       |
| Display approved testimonials | Public            | `GET /api/testimonials`        |
| Admin dashboard - view all    | Admin only        | `GET /api/testimonials/admin`  |
| Approve / Reject testimonial  | Admin only        | `PUT /api/testimonials/:id`    |
| Delete testimonial            | Admin only        | `DELETE /api/testimonials/:id` |

| Endpoint                   | Type                  | Access |
| -------------------------- | --------------------- | ------ |
| `GET /api/blogs`           | Fetch published blogs | Public |
| `GET /api/blogs/:slug`     | Get blog by slug      | Public |
| `GET /api/blogs/admin/all` | View all blogs        | Admin  |
| `POST /api/blogs`          | Create blog           | Admin  |
| `PUT /api/blogs/:slug`     | Update blog           | Admin  |
| `DELETE /api/blogs/:slug`  | Delete blog           | Admin  |


