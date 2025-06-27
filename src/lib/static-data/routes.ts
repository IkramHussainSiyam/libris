export const routes = {
  home: "/",
  auth: {
    login: "/login",
    signup: "/signup",
  },
  admin: {
    users: "/admin",
    books: {
      list: "/admin/books",
      details: (id: string) => `/admin/books/${id}`,
      create: "/admin/books?create-book",
      edit: (id: string) => `/admin/books?edit-book=${id}`,
    },
    subjects: "/admin/subjects",
  },
  bookInfo: {
    details: (id: string) => `/book/${id}`,
    reviews: (id: string) => `/book/${id}/reviews`,
    social: (id: string) => `/book/${id}/social`,
  },
  explore: "/explore",
  notifications: "/notifications",
  review: {
    list: "/reviews",
    details: (id: string) => `/reviews/${id}`,
    create: "/reviews/create",
    edit: (reviewId: string, bookSlug: string) =>
      `/reviews/edit?reviewId=${reviewId}&book_slug=${bookSlug}`,
  },
  settings: {
    general: "/settings",
    account: "/settings/account",
    booklist: "/settings/book-list",
    import_export: "/settings/import-export-lists",
  },
  social: {
    list: "/social",
    details: (id: string) => `/social/${id}`,
  },
  users: "/users",
  user: {
    profile: (userName: string) => `/users/${userName}`,
    booklist: {
      reading: (userName: string) => `/users/${userName}/booklist`,
      completed: (userName: string) => `/users/${userName}/booklist/completed`,
      on_hold: (userName: string) => `/users/${userName}/booklist/on_hold`,
      planning: (userName: string) => `/users/${userName}/booklist/planning`,
      dropped: (userName: string) => `/users/${userName}/booklist/dropped`,
      custom_list: (userName: string, customListId: string) =>
        `/users/${userName}/booklist/${customListId}`,
    },
    favorites: (userName: string) => `/users/${userName}/favorites`,
    social: {
      following: (userName: string) => `/users/${userName}/social`,
      followers: (userName: string) => `/users/${userName}/social/followers`,
      activities: (userName: string) => `/users/${userName}/social/activities`,
    },
    reviews: (userName: string) => `/users/${userName}/reviews`,
  },
  error: "/404",
};
