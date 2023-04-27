# Migration Script

The migration script has different behavior in Node.JS and React Native.

## React Native

In React Native, the script fails with `Invalid key data` when migrate the first key. The opening of the wallet goes OK. As you can see the bytes of the key are the same, so it correctly fetches it from the database and decodes it from base58.

```
 LOG  TRACE: Creating backup from '/var/mobile/Containers/Data/Application/6E8C72A2-702B-4A4A-9657-0E0A9E31DCE0/Documents/.indy_client/wallet/walletId/sqlite.db' to '/private/var/mobile/Containers/Data/Application/6E8C72A2-702B-4A4A-9657-0E0A9E31DCE0/tmp//.afj/walletId.db'
 INFO  INFO: Migration indy-sdk database structure to askar
 INFO  INFO: Migrating category: Indy::Key
 LOG  found keys 4
 DEBUG  DEBUG: Migrating Cx95o48WB4TXVxWzSBvyh7NEYQkJh37cDDWRMBDNp2oF to the new askar format
 LOG  signKey 4rgCSiSo3i6dW2eGomCvHqTaazuFVkimo8TTp2BNtpi8gBJzSzCu6tTNoQTzV114BtkkWnkjYASwEEQWqQ2QYwf
 LOG  length 64
 LOG  keySk [3, 83, 95, 222, 141, 16, 52, 36, 78, 251, 113, 45, 26, 31, 12, 255, 194, 188, 145, 104, 156, 82, 225, 219, 124, 111, 188, 160, 86, 88, 57, 178, 177, 144, 163, 200, 108, 234, 84, 107, 192, 8, 111, 225, 217, 107, 48, 84, 248, 210, 6, 145, 212, 107, 89, 186, 97, 92, 73, 240, 115, 34, 117, 70]
 ERROR  ERROR: Migration failed. Restoring state. Invalid key data
 LOG  TRACE: Deleting the backup file at '/private/var/mobile/Containers/Data/Application/6E8C72A2-702B-4A4A-9657-0E0A9E31DCE0/tmp//.afj/walletId.db
```

## Node.JS

In Node.JS the script succeeds. The order of the keys is a bit different. So the second key in the node.js script is the same one as the one that fails in React Native.

This script runs the migration on the RN sqlite database, which as been copied.

```sh
yarn install
yarn ts-node index.ts
```

```
WARN: Node.JS is not fully supported. Using this will likely leave the wallet in a half-migrated state
TRACE: Creating backup from '/Users/timo/Developer/migration-test/rn-db.db' to '/var/folders/l3/xy8jzyvj4p5_d9g1123rt4bw0000gn/T/.afj/walletId.db'
INFO: Migration indy-sdk database structure to askar
INFO: Migrating category: Indy::Key
DEBUG: Migrating A4Qm4wv2JhStwa4Y8D3WAoMo4oaPUPjx3RukhGSLeJrj to the new askar format
signKey 2qpQRTbj2Txmc9JxsQVFJBmCJnK1mnTH2kmzsYWs1CxLKSve5cPQpvUkruUPn5xQo9E23oFe3V21z8q42hRvUXfd
length 64
keySk [
  92,  29, 125,  42, 133, 184,  51, 188,  17,  79,  41,
 159, 121,  61,  48,  12,  74,  32, 237,  48,   6, 105,
 158,  91, 228,  18, 124, 187,  58,  98, 211, 188, 134,
 152, 202,  64, 167, 128,  96,   2,  10, 121, 171, 167,
 174,   2, 131,  87, 133, 124, 196, 163, 242, 233,  45,
  13, 247, 108, 238,  48,  93,  32,  60,   0
]
after
DEBUG: Migrating Cx95o48WB4TXVxWzSBvyh7NEYQkJh37cDDWRMBDNp2oF to the new askar format
signKey 4rgCSiSo3i6dW2eGomCvHqTaazuFVkimo8TTp2BNtpi8gBJzSzCu6tTNoQTzV114BtkkWnkjYASwEEQWqQ2QYwf
length 64
keySk [
   3,  83,  95, 222, 141,  16,  52,  36,  78, 251, 113,
  45,  26,  31,  12, 255, 194, 188, 145, 104, 156,  82,
 225, 219, 124, 111, 188, 160,  86,  88,  57, 178, 177,
 144, 163, 200, 108, 234,  84, 107, 192,   8, 111, 225,
 217, 107,  48,  84, 248, 210,   6, 145, 212, 107,  89,
 186,  97,  92,  73, 240, 115,  34, 117,  70
]
after
DEBUG: Migrating Asbzgzw4ydEKyxAJ8cHbT9SjDopVKBtyqxhEE4ybLypu to the new askar format
signKey Nj8WrBzVcXYpnfnHEzajVxbDrt8XGshi1pRFUmBnDpYRm4r7PVRFhzgwagpyk7eBysdJ3o3QEvEFEHZgKBmfByB
length 64
keySk [
  18, 188, 106,  98, 125, 186, 134, 246, 147,  47,  99,
  91, 111, 230, 128, 135,  13, 212, 124, 169, 126, 205,
  67, 134,  92,  15, 178,  63, 138, 182, 168,  47, 146,
 175, 202, 150, 255, 175, 116,  22, 151,  90,  60, 231,
   4, 245, 160, 133,  34, 208, 134, 206,  67, 222, 220,
  31,  19,  49,  67, 223, 203,  30,  39,  18
]
after
DEBUG: Migrating GdiY63bzJVXDGAJ8o1MvLHoRsRrjy4Q5uTMekSLVB8cT to the new askar format
signKey 66CpGZfrm1gJ8FSnr7xz3b5eQwDWozqVrZ7H3nF9DkJwuM7dEJAEiXpcUHGRJqUJrg5RHkXgEnJMYFrTkrPpWXpX
length 64
keySk [
 254, 146, 141, 114,  31, 141,  62,  66,  79,  52,   6,
 243,  77,  56,  95, 196, 208, 126,  88, 241, 234, 149,
 251,  56, 153, 192,  57, 129, 107, 182,  97,  94, 232,
  71,  45, 139,  80, 229, 144, 184,  46, 177,  91, 248,
  70, 147, 142,  66, 186, 240,  97,  99, 118, 101,  76,
 107, 135, 240, 100, 255, 196, 166, 102, 244
]
after
INFO: Migrated 4 records of type Indy::Key
INFO: Migrating category: Indy::CredentialDefinition
INFO: Migrating category: Indy::MasterSecret
INFO: Default link secret id for migration is walletId
DEBUG: Migrating walletId to the new askar format
INFO: Migrated 1 records of type Indy::MasterSecret
INFO: Migrating category: Indy::Credential
DEBUG: Migrating 6c629c66-b2bd-4010-9eed-7814313f8850 to the new askar format
INFO: Migrated 1 records of type Indy::Credential
TRACE: Moving upgraded database from /var/folders/l3/xy8jzyvj4p5_d9g1123rt4bw0000gn/T/.afj/walletId.db to /Users/timo/.afj/data/wallet/walletId/sqlite.db
TRACE: Deleting the backup file at '/var/folders/l3/xy8jzyvj4p5_d9g1123rt4bw0000gn/T/.afj/walletId.db'
✨  Done in 10.79s.
```
