// storysell-shopify-app/src/api/auth.api.ts

export type User = {
  fullName: string;
  email: string;
  password: string;
};

const USERS_KEY = "fake_users";
const LOGGED_USER_KEY = "logged_user";

// Recupera usuários do localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Salva usuários no localStorage
const setUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Login
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Email ou senha incorretos"));
      }
    }, 1000); // simula delay de 1s
  });
};

// Register
export const register = async ({
  fullName,
  email,
  password,
}: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const existing = users.find((u) => u.email === email);
      if (existing) {
        reject(new Error("Usuário já existe"));
        return;
      }
      const newUser = { fullName, email, password };
      users.push(newUser);
      setUsers(users);
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 1000);
  });
};

// Logout
export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(LOGGED_USER_KEY);
      resolve();
    }, 500);
  });
};

// Recupera usuário logado
export const getLoggedUser = (): User | null => {
  const user = localStorage.getItem(LOGGED_USER_KEY);
  return user ? JSON.parse(user) : null;
};
