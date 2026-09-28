// A snapshot on disk: JSON → gzip → age (X25519). The server only holds the
// public key (BACKUP_AGE_RECIPIENT); the private key stays offline with the
// maintainer, so a leaked server or storage key can't read the backups.
// Decrypt by hand with the `age` CLI: `age -d -i identity.txt f | gunzip`.

import { gunzipSync, gzipSync } from "node:zlib";
import { Decrypter, Encrypter } from "age-encryption";
import type { Snapshot } from "./snapshot";

export async function sealSnapshot(snapshot: Snapshot, recipient: string): Promise<Uint8Array<ArrayBuffer>> {
  const encrypter = new Encrypter();
  encrypter.addRecipient(recipient);
  const sealed = await encrypter.encrypt(gzipSync(JSON.stringify(snapshot)));
  return new Uint8Array(sealed);
}

export async function openSnapshot(sealed: Uint8Array, identity: string): Promise<Snapshot> {
  const decrypter = new Decrypter();
  decrypter.addIdentity(identity.trim());
  return JSON.parse(gunzipSync(await decrypter.decrypt(sealed)).toString("utf8"));
}
