/**
 * Lightweight user storage backed by a JSON file.
 *
 * For v1, this avoids a database dependency so the plan stays focused on
 * the payment flow. Data lives at `data/users.json` (gitignored).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");

export interface User {
  id: string;
  email: string;
  tier: "free" | "premium";
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string;
}

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers(): User[] {
  ensureDataDir();
  if (!existsSync(USERS_FILE)) return [];
  try {
    const raw = readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  ensureDataDir();
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

/** Find a user by email address. */
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

/** Create a new free-tier user. Returns the created user. */
export async function createUser(email: string): Promise<User> {
  const users = readUsers();
  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) return existing;

  const user: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    tier: "free",
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

/** Update a user's tier and optional Stripe identifiers. */
export async function updateUserTier(
  email: string,
  tier: "free" | "premium",
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
): Promise<void> {
  const users = readUsers();
  const idx = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (idx === -1) return;

  users[idx].tier = tier;
  if (stripeCustomerId !== undefined) {
    users[idx].stripeCustomerId = stripeCustomerId;
  }
  if (stripeSubscriptionId !== undefined) {
    users[idx].stripeSubscriptionId = stripeSubscriptionId;
  }
  writeUsers(users);
}

/** Find a user by their Stripe customer ID. */
export async function getUserByStripeCustomerId(
  customerId: string
): Promise<User | null> {
  const users = readUsers();
  return users.find((u) => u.stripeCustomerId === customerId) ?? null;
}
