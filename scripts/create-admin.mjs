import crypto from "node:crypto";

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log("Usage: npm run hash-admin -- admin@example.com your-password");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");
const storedPassword = `${salt}:${hash}`;

console.log(`Email: ${email}`);
console.log(`Password hash: ${storedPassword}`);
console.log("");
console.log("SQL:");
console.log(
  `insert into admin_users (id, email, password) values (gen_random_uuid(), '${email.replace(/'/g, "''")}', '${storedPassword}');`
);
