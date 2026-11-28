import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const deriveKey = promisify(scrypt);
const keyLength = 64;

/** @param {string} password */
export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = await deriveKey(password, salt, keyLength);
  return `${salt}:${key.toString("hex")}`;
}

/** @param {string} password @param {string} passwordHash */
export async function verifyPassword(password, passwordHash) {
  const [salt, hash] = passwordHash.split(":");
  if (!salt || !hash || !/^[a-f0-9]{32}$/.test(salt) || !/^[a-f0-9]{128}$/.test(hash)) {
    return false;
  }

  const key = await deriveKey(password, salt, keyLength);
  return timingSafeEqual(key, Buffer.from(hash, "hex"));
}
