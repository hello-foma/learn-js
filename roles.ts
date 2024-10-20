export type RoleName = 'admin' | 'editor' | 'user' | string;

export const Roles = {
    admin: {
      permissions: {
        all: true,
      },
    },
    editor: {
      permissions: {
        edit: true,
        post: true,
      },
    },
    user: {
      permissions: {
        view: true,
        comment: true,
      },
    },
    visitor: {
      permissions: {
        view: true,
      },
    },
    banned: {
      permissions: null,
    },
    guest: {
      view: true,
    },
  };