# AutoNest Security Specification

## 1. Data Invariants
1. **Owner-Only PII Isolation**: `users/{userId}` contains `email` and `users/{userId}/orders/{orderId}` contains `phone`, `address`, and `pincode`. No unauthenticated user or other authenticated user may read, list, create, update, or delete another user's profile or orders.
2. **Email Verification Gate**: All authenticated writes require `request.auth.token.email_verified == true`.
3. **Identity Integrity**: `users/{userId}.uid == request.auth.uid` and `orders/{orderId}.userId == request.auth.uid`.
4. **Temporal Integrity**: `createdAt` and `updatedAt` must strictly equal `request.time`; `createdAt` is immutable on update.
5. **Strict Key & Boundary Limits**: Every document write enforces `hasAll(...)` and `hasOnly(...)` on creation and `affectedKeys().hasOnly(...)` on update, with explicit `.size()` and regex checks on every string and ID.
6. **Terminal/Immutable Orders**: Orders created with `status == 'confirmed'` cannot be altered by client SDKs to fake prices, totals, or shipping status (`allow update, delete: if false;`).

## 2. Dirty Dozen Payloads (Must Return PERMISSION_DENIED)
1. Unauthenticated read of `/users/u123`.
2. Authenticated read by `u999` of `/users/u123`.
3. Unverified email token (`email_verified: false`) creating `/users/u123`.
4. Shadow field injection (`isAdmin: true`) on `/users/u123` create.
5. Spoofed `uid` (`uid: "victim"`) inside `/users/u123` payload.
6. Client-forged `createdAt` timestamp not equal to `request.time`.
7. Modifying `uid` or `createdAt` during `/users/u123` update.
8. Oversized `displayName` (>120 chars) on `/users/u123`.
9. Unauthenticated or cross-user list query on `/users/u123/orders`.
10. Invalid `pincode` (`"ABC123"`) or `orderNumber` (`"FAKE"`) on `/users/u123/orders/ord1`.
11. Negative or mismatched `total` / `itemCount` on order creation.
12. Client attempt to update or delete an existing order under `/users/u123/orders/ord1`.
