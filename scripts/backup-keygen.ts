// Create the key pair for database backups (plan §7.11).
//
//   npm run backup:keygen
//
// Writes the private key to rebuild-backup-identity.txt (gitignored,
// readable only by you) and prints the public key for Risved. Keep the
// private key offline, e.g. in your password manager, then delete the file:
// without it, no backup can be read, by anyone.

import { existsSync, writeFileSync } from "node:fs";
import { generateX25519Identity, identityToRecipient } from "age-encryption";

const FILE = "rebuild-backup-identity.txt";
if (existsSync(FILE)) {
  console.error(`${FILE} already exists. Move it somewhere safe first; this won't overwrite it.`);
  process.exit(1);
}

const identity = await generateX25519Identity();
const recipient = await identityToRecipient(identity);
writeFileSync(FILE, `# Rebuild database backup key, created ${new Date().toISOString()}\n# public key: ${recipient}\n${identity}\n`, {
  mode: 0o600,
});

console.log(`Private key written to ${FILE}.

1. Save that file's contents in your password manager (it's the only way to read backups), then delete the file.
2. In Risved, set:
     BACKUP_AGE_RECIPIENT=${recipient}
`);
