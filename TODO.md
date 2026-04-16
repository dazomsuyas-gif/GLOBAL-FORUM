# Seller Rating & Review System - PART 7 TODO

## Plan Overview

Implemented iteratively based on approved plan. Track progress here.

## Steps

### 1. Update Prisma Schema (prisma/schema.prisma)

- [ ] Add to User model: `sellerRating Float? @default(0)`, `reviewCount Int? @default(0)`, `reviewsReceived Review[] @relation("ReviewsReceived")`
- [ ] Add to Review model: `sellerId String @db.ObjectId`, `seller User @relation(fields: [sellerId], references: [id])`
- [ ] Run `npx prisma db push`
- [ ] Run `npx prisma generate`

### 2. Create Base Pages

✅ src/app/marketplace/product/[productId]/page.tsx (product details + reviews tab)
✅ src/app/marketplace/seller/[sellerId]/page.tsx (seller store)
✅ src/app/marketplace/seller/[sellerId]/reviews/page.tsx (seller reviews list)

**Next: Step 3 - Create Components**

### 3. Create Components

- [ ] src/components/marketplace/SellerRating.tsx
- [ ] src/components/marketplace/ReviewModal.tsx (with StarRating)

### 4. Create API Routes

✅ src/app/api/reviews/create/route.ts (POST create + update avgs, purchase validation, avg update)
✅ src/app/api/reviews/get/route.ts (GET paginated by seller/product, stats)

**Next: Step 5 - Update Existing**

### 5. Update Existing

- [ ] src/components/marketplace/ProductCard.tsx (use real SellerRating)
- [ ] Integrate into product/seller pages

### 6. Test & Complete

- [ ] Test full flow: order -> review -> avgs update
- [ ] attempt_completion

**Current Progress: Starting Step 1**
