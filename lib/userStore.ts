// lib/userStore.ts
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

type User = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  preferredLanguage?: string | null;
  country?: string | null;
  businessType?: string | null;
  createdAt: string;
};

function readUsers(): User[] {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export function createUser(data: {
  fullName: string;
  email: string;
  passwordHash: string;
  preferredLanguage?: string | null;
  country?: string | null;
  businessType?: string | null;
}) {
  const users = readUsers();
  const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  if (exists) throw new Error("User with this email already exists");
  const user = {
    id: uuidv4(),
    fullName: data.fullName,
    email: data.email.toLowerCase(),
    passwordHash: data.passwordHash,
    preferredLanguage: data.preferredLanguage ?? null,
    country: data.country ?? null,
    businessType: data.businessType ?? null,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function findUserByEmail(email: string) {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserById(id: string) {
  const users = readUsers();
  return users.find((u) => u.id === id) ?? null;
}
