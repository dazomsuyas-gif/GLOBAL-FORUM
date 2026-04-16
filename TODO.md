# PART 8: Dispute Resolution - Implementation Steps

## 1. Database Schema

- [x] Update prisma/schema.prisma (Dispute model + relations)
- [x] Run `npx prisma db push`

## 2. API Routes

- [x] Create src/app/api/disputes/list/route.ts (GET)
- [x] Create src/app/api/disputes/create/route.ts (POST)
- [x] Create src/app/api/disputes/[id]/route.ts (PUT for update)

## 3. Components

- [x] src/components/disputes/DisputeStatusBadge.tsx
- [x] src/components/disputes/DisputeTimeline.tsx

## 4. User Pages

- [x] src/app/disputes/new/page.tsx (file dispute form)
- [x] src/app/disputes/[id]/page.tsx (detail view)
- [x] src/app/dashboard/orders/page.tsx (create w/ Report Issue buttons)

## 5. Admin Pages

- [x] src/app/admin/disputes/page.tsx (management table)
- [x] Update src/app/admin/layout.tsx (add nav link)
- [x] Update src/app/admin/dashboard/page.tsx (pending count card)

## 6. Data & Integration

- [x] Update src/data/adminData.ts (mock pendingDisputes)

## 7. Testing

- [ ] Test flow: file dispute → admin review → resolve
- [ ] Add to Navbar admin link (role check)

Proceed step-by-step.
