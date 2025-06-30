# 📚 Libris – The next-generation book platform.

Track, discover, and share your favorite books with Libris. Discover top-rated and popular books through reviews and recommendations. Sign up for free!

> Inspired by [Anilist](https://anilist.co/)

---

## 🎥 Project Demo (Click to view on YouTube)

<a title="Full project walkthrough video (7 Min)" href="https://www.youtube.com/watch?v=Hl6N0ao1kys"><img src="https://i.ibb.co/5hQzdZcW/project-demo-docs.png" alt="Full project walkthrough video (7 Min)" /></a>

- 👩‍💻 GitHub: https://github.com/IkramHussainSiyam/libris
- 🔗 Live Link: https://libris.up.railway.app/

---

## ✨ Application Features

### 🎯 Core Features

#### Book Experience & Interaction

- **Book Details Page**
  - View detailed book information
  - Add/remove book from favorites
- **Book Entries**
  - Add books to reading lists via entry recorder modal (status, score, custom list, etc.)
  - Save entries from both book cards and detail page
- **Review System**
  - Submit, edit, or delete a review
  - Like/unlike reviews
- **Explore Page**
  - Browse all books
  - Search and filter by keywords and genres
  - Sort by published date and title

#### Activity Feed

- **Sidebar Activity**
  - Recent reading statuses
  - 3 recent reviews
  - 5 recently added books
- **Activity Engine**
  - Post, Update & Delete Activities
    - View activity details
    - Comment & Like activities

#### Profile System

- **Overview Tab**
  - Follow/unfollow users
    - User statistics
    - Recent Favorite books
    - Recent activities
- **Booklist Tab**
  - Track books by reading status
  - Filter/search entries
- **Reviews Tab**
  - List all reviews by the user
- **Social Tab**
  - View followers/following lists
  - List of user's all activities
- **Rich Profile**
  - Editable About section with rich text

#### Notifications

- In-app notifications for:
  - New followers
  - Likes on activities or reviews
  - Comments on activities
  - New activity posts by followed users
- Mark notifications as read.

#### Authentication & Access

- User authentication and session protection
- server actions and queries validation for admin & users.
- Middleware-based route protection

---

### 🏹 Power Features

#### Settings

- **General Settings**
  - Profile visibility, avatar, and basic account settings
- **Activity Feed Settings**
  - Following tab: Activities from followed users
  - Global tab: All user activities
- **Custom List Management**
  - Create/update/delete custom lists
  - Reset user's list scores
  - Delete all user's list entries with custom lists
  - Import/export book entries and lists **Mention the file format**
  - Even if past account deleted but user exported their book lists & custom lists they can import them into new account.
- **Account Termination**
  - Permanently delete user account

#### Admin & Content Management

- **Books (Admin)**
  - CRUD operations for books
  - Bulk create many books **Mention file format**
  - Make relation between one book to another `e.g. atomic habit & atomic habit part 2`
  - Duplicate check during insertion
- **Subjects/Genres (Admin)**
  - CRUD operations for subjects **mention format**
  - Bulk create many books
- **Users (Admin)**
  - List all users using the app

---

## 🛠 Tech Stack

- **Frontend**: TypeScript, React.js, Next.js, Tailwindcss, Zustand, Zod, React Hook Form, Shadcn/ui.
- **Database / Backend**: Next.js Server Actions, Prisma, MongoDB.
- **Authentication:** Better Auth, Next.js API Routes.

## 🚨 Challenges

- **Authentication**: Coming from a frontend background, implementing full-stack authentication without REST APIs was a big challenge. I learn Better Auth for authentication from their documentation and integrated it successfully into Libris without compromising the deadline.
- **Data Relationships**: Designing and managing complex schema relationships in Prisma and MongoDB — especially syncing user settings and booklist import/export — was very challenging. Handling data persistence after permarent account deletion added more complexity, but Alhamdulillah, I managed it.
- **Import/Export**: Designing logic for safely importing/exporting booklists (e.g., file structure, conditions, post account deletion import capability) pushed my limits.

## ✍ 5. Installation & Usage

1. Clone the repo

```
git clone https://github.com/IkramHussainSiyam/libris.git
```

2. Install dependencies

```
pnpm install
```

3. Update environment variables

   Check `.env.example` and update with your credentials to connect `prisma`, `mongodb` & `better-auth`

4. Generate Prisma & Push to DB

```
pnpm dlx prisma generate
```

```
pnpm dlx prisma db push
```

5. Start the server (Default Port: 5173)

```
pnpm dev
```

## 📁 Project Folder Structure

```
libris-root/
├── public/               # Static assets like images, favicon, etc.
│   └── assets/
├── prisma/               # Prisma schema and models
│   └── schema/           # For multi schema files
│	│   │── schema.prisma
│	│   └── books.prisma
├── src/                  # Main application source code
│   ├── components/       # All global components lives here.
│	│   │── common           # Common components e.g. <SubmitButton />
│	│   │── helpers          # Helper components e.g. <Show when={true}></Show>
│	│   │── layout              # Layout components e.g. <LoadingScreen />
│	│   │── ui                  # shacn/ui components e.g. <Dialog />
│   ├── app/              # Next.js app routes
│	│   │── users/
│	│	│   │── _components/    # specific components for that route
│	│	│   │── _hooks/         # sepecific hooks for that route
│	│	│   └── page.tsx
│   ├── lib/                  # Helpers, utilities, types, etc.
│	│   ├── conf/                 # global config files
│	│   ├── db/                   # all server actions for each models
│	│   ├── hooks/                # global hooks and zustand stores/hooks
│	│   ├── prisma/generated      # prisma generated files
│	│   ├── static-data/          # static data that used across app
│	│   ├── styles/               # all stylings
│	│   ├── types/                # all data types
│	│   ├── utils/                # utility functions, variables, etc.
│	│   ├── auth-client.ts        # BetterAuth client instance
│	│   ├── auth.ts               # BetterAuth server instance
│	├── middleware.ts       # Next.js middleware: for route protection, others.
├── .env                 # environment variables, e.g. Auth_SECRETE, etc.
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 👋 Final Words

This was just a portfolio project — I'm excited about continuing this as side project in future to learn more about refactoring existing project, migration & tech-switch, adding more complex features, etc. At the end this project taught me a ton about full-stack workflows.

> 💖 Thanks for your time! You can check out the repo, live link or demo video [here](https://github.com/IkramHussainSiyam/libris).
