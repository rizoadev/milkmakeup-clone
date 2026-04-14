# Milk Makeup - Full Specification

## Overview
- **Project:** Milk Makeup E-commerce + Distributor Portal
- **Stack:** Next.js 14 + Tailwind + Client-side State
- **URL:** https://milkmakeup-clone.vercel.app

---

## FEATURE LIST (COMPLETE)

### Customer Features
| # | Feature | Status |
|---|---------|--------|
| 1 | Order (checkout flow) | ✅ Basic |
| 2 | Pembayaran (multiple methods) | 🔲 Missing |
| 3 | Shipping choice (provider selection) | 🔲 Missing |
| 4 | Konfirmasi bayar manual (upload receipt) | 🔲 Missing |
| 5 | Konfirmasi bakar auto (payment verification) | 🔲 Missing |
| 6 | Detail pengiriman (shipping address) | ✅ Basic |
| 7 | Ask cancel (request cancellation) | 🔲 Missing |
| 8 | List order (order history) | 🔲 Missing |
| 9 | Tracking pengiriman (live tracking) | 🔲 Missing |
| 10 | Refund (full refund) | 🔲 Missing |
| 11 | Return order (return product) | 🔲 Missing |
| 12 | Cancel order (cancel order) | 🔲 Missing |
| 13 | Refund sebagian produk (partial refund) | 🔲 Missing |
| 14 | Dashboard pembelian (my account) | 🔲 Missing |
| 15 | Basic info (profile) | 🔲 Missing |
| 16 | Change password | 🔲 Missing |
| 17 | Login/Register | 🔲 Missing |
| 18 | Wishlist | 🔲 Missing |
| 19 | Address book | 🔲 Missing |
| 20 | Order confirmation email | 🔲 Missing |

### Distributor Features
| # | Feature | Status |
|---|---------|--------|
| 1 | Order from catalog | ✅ Basic |
| 2 | Tier distributor info | 🔲 Missing |
| 3 | Wholesale pricing per tier | 🔲 Missing |
| 4 | Territory assignment | 🔲 Missing |
| 5 | Distributor CRUD | 🔲 Partial |
| 6 | Payment upload | 🔲 Missing |
| 7 | Order history | ✅ Basic |
| 8 | Reports | ✅ Basic |
| 9 | Dashboard stats | ✅ Basic |

---

## DISTRIBUTOR/AGEN B2B PORTAL FEATURES

### Based on Real-World B2B Best Practices

#### Order Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **Quick Reorder** | One-click reorder dari order sebelumnya | 🔴 P1 |
| **Order Template** | Save fixed basket untuk recurring order | 🔴 P1 |
| **Scheduled Order** | Auto-order terjadwal (Setiap minggu/bulan) | 🟡 P2 |
| **Bulk Order** | Upload CSV/Excel untuk massal | 🟡 P2 |
| **Backorder** | Pre-order barang kosong | 🟡 P2 |
| **Consignment** | Barang konsinyasi (bayar setelah jual) | 🟢 P3 |
| **Partial Ship** | Pengiriman sebagian | 🔲 Missing |

#### Pricing & Discount
| Feature | Description | Priority |
|---------|-------------|----------|
| **Tier-based Pricing** | Harga berbeda per tier | 🔴 P1 |
| **Volume Discount** | Diskon berdasarkan quantity | 🔴 P1 |
| **Tier Upgrade Logic** | Auto upgrade berdasarkan total order | 🔴 P1 |
| **Special Price List** | Harga khusus per distributor | 🔴 P1 |
| **Promo Code** | Kode promo untuk distributor | 🟡 P2 |
| **Credit Limit** | Batas kredit yang bisa gunakan | 🟡 P2 |
| **Net Terms** | Pembayaran tempo (Net 7/14/30) | 🟡 P2 |

#### Payment
| Feature | Description | Priority |
|---------|-------------|----------|
| **Credit Facility** | Pembelian dengan kredit | 🔴 P1 |
| **Invoice** | Download invoice PDF | 🔴 P1 |
| **Statement** | Monthly statement | 🟡 P2 |
| **Auto-Payment** | Auto-debit setelah delivery | 🟢 P3 |
| **Multi-Currency** |multi currency (USD, SGD) | 🟢 P3 |

#### Shipping & Fulfillment
| Feature | Description | Priority |
|---------|-------------|----------|
| **Multiple Address** | Multiple shipping addresses | 🔴 P1 |
| **Address Groups** | Group by store/location | 🔴 P1 |
| **Split Delivery** | Kirim ke beberapa alamat | 🟡 P2 |
| **Drop Shipping** | Kirim langsung ke end customer | 🟡 P2 |
| **Packing List** | Custom packing list | 🟡 P2 |
| **Private Label** | Label dengan brand distributor | 🟢 P3 |

#### Inventory & Stock
| Feature | Description | Priority |
|---------|-------------|----------|
| **Stock Alert** | Notify saat stock rendah | 🔴 P1 |
| **Stock Reservation** | Reserve inventory | 🟡 P2 |
| **Pre-Order** | Pre-order produk baru | 🟡 P2 |
| **Stock History** | Riwayat stock | 🟢 P3 |

#### Communication
| Feature | Description | Priority |
|---------|-------------|----------|
| **Announcements** | Product news, promo | 🔲 Missing |
| **Catalog Download** | Download PDF catalog | 🔲 Missing |
| **Support Ticket** | Helpdesk system | 🔲 Missing |
| **Chat** | Live chat with manager | 🔲 Missing |

#### Reporting
| Feature | Description | Priority |
|---------|-------------|----------|
| **Order History Export** | Export ke Excel | 🔲 Missing |
| **Sales Report** | Report penjualan per periode | 🔲 Missing |
| **Inventory Report** | Stock report | 🔲 Missing |
| **Payment History** | Riwayat pembayaran | 🔲 Missing |
| **Tax Invoice** | Faktur pajak | 🔲 Missing |

#### Account Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **Sub-accounts** | Multiple user per distributor | 🔲 Missing |
| **Role-based Access** | Admin, Sales, Viewer | 🔲 Missing |
| **Audit Log** | Log semua activities | 🔲 Missing |
| **API Access** | API untuk integrasi | 🔲 Missing |

---

## NEW DISTRIBUTOR FEATURES TO ADD (Based on Analysis)

### Tier System (Complete)
| Tier | Min Order/Month | Discount |
|------|----------------|----------|
| Bronze | Rp 0 | 20% |
| Silver | Rp 5,000,000 | 25% |
| Gold | Rp 15,000,000 | 30% |
| Platinum | Rp 50,000,000 | 35% |

### Credit System
- Credit limit per distributor
- Net 7/14/30 terms
- Auto-invoice generation

### Order Features
- Quick reorder dari history
- Order template (fixed basket)
- Scheduled recurring order
- Bulk order via CSV

### Shipping Features
- Multiple shipping addresses
- Address groups (by store)
- Split delivery

### Reporting
- Download invoice PDF
- Order history export
- Monthly statement
- Tax invoice

---

## 1. FRONTEND (Customer-Facing)

### Pages Created
| Page | Status | Notes |
|------|--------|-------|
| `/` | ✅ | Homepage |
| `/shop` | ✅ | Product listing |
| `/products/[slug]` | ✅ | Product detail |
| `/cart` | ✅ | Shopping cart |
| `/checkout` | ✅ | Checkout form |
| `/checkout/success` | ✅ | Success page |
| `/blog` | ✅ | Blog listing |
| `/blog/[slug]` | ✅ | Blog post |
| `/about` | ✅ | About |
| `/contact` | ✅ | Contact |
| `/faq` | ✅ | FAQ |
| `/terms` | ✅ | Terms |
| `/privacy` | ✅ | Privacy |
| `/admin` | ✅ | Distributor portal |

### Pages Needed (Priority 1 - Auth & Account)
| Page | Status |
|------|--------|
| `/login` | 🔲 Missing |
| `/register` | 🔲 Missing |
| `/account` | 🔲 Missing |
| `/account/orders` | 🔲 Missing |
| `/account/orders/[id]` | 🔲 Missing |
| `/account/settings` | 🔲 Missing |
| `/account/password` | 🔲 Missing |
| `/account/wishlist` | 🔲 Missing |
| `/account/addresses` | 🔲 Missing |

---

## 2. ORDER FLOW (Complete)

### Current Flow (Basic)
```
Cart → Checkout Form → Submit → Success
```

### Target Flow (Complete)
```
1. Cart
2. Checkout
   - Select shipping method (JNE/J&T/SiCepat/Grab)
   - Select payment method (Bank Transfer/E-wallet/Card)
   - Select/Edit address
   - Apply coupon code
3. Order Created (status: pending)
4. Customer upload payment proof
5. Admin verify payment (auto/manual)
6. Status: paid → processing → shipped
7. Tracking number added
8. Delivered
9. Customer can:
   - Request return (if defective)
   - Request refund (partial/full)
   - Request cancel (if pending)
```

### Order Statuses
| Status | Description |
|--------|-------------|
| `pending` | Awaiting payment |
| `paid` | Payment confirmed |
| `processing` | Preparing order |
| `shipped` | On the way |
| `delivered` | Received |
| `cancelled` | Cancelled |
| `return_requested` | Return requested |
| `return_received` | Return received |
| `refund_requested` | Refund requested |
| `refunded` | Refunded |

---

## 3. API ENDPOINTS (Conceptual)

### Customer
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/user/profile
PUT  /api/user/profile
PUT  /api/user/password

GET  /api/orders
GET  /api/orders/[id]
POST /api/orders
POST /api/orders/[id]/cancel
POST /api/orders/[id]/return
POST /api/orders/[id]/refund

GET   /api/addresses
POST  /api/addresses
PUT   /api/addresses/[id]
DELETE /api/addresses/[id]

GET  /api/wishlist
POST /api/wishlist
DELETE /api/wishlist/[productId]
```

### Payment
```
POST /api/payment/verify
POST /api/payment/upload-proof
GET  /api/payment/invoice/[id]
```

### Shipping
```
GET  /api/shipping/calculate
GET  /api/shipping/tracking
POST /api/shipping/address
```

### Distributor
```
GET    /api/admin/distributors
POST   /api/admin/distributors
PUT    /api/admin/distributors/[id]
DELETE /api/admin/distributors/[id]

GET    /api/admin/orders
PUT    /api/admin/orders/[id]/status
POST   /api/admin/orders/[id]/tracking

GET    /api/admin/reports/export
GET    /api/admin/invoice/[id]
```

---

## 4. PRIORITY IMPLEMENTATION

### Phase 1 (Auth & Account)
- [ ] Login/Register
- [ ] My Account dashboard
- [ ] Order list + detail
- [ ] Change password

### Phase 2 (Order Full Flow)
- [ ] Payment methods
- [ ] Shipping selection
- [ ] Cancel/Refund request
- [ ] Invoice download

### Phase 3 (Distributor B2B)
- [ ] Tier system + pricing
- [ ] Credit limit
- [ ] Quick reorder
- [ ] Invoice

### Phase 4 (Advanced)
- [ ] Order template
- [ ] Scheduled order
- [ ] Bulk order
- [ ] Sub-accounts

---

## 5. NEW COMPONENTS TO BUILD

```
components/
├── AuthForm.tsx           ← Login/Register
├── OrderCard.tsx          ← Order list item
├── OrderDetail.tsx        ← Full order view
├── TrackingStatus.tsx     ← Progress tracker
├── ShippingSelector.tsx   ← Provider choice
├── PaymentSelector.tsx    ← Method choice
├── PaymentUpload.tsx      ← Receipt upload
├── CancelModal.tsx       ← Request cancel
├── RefundModal.tsx        ← Request refund
├── AddressForm.tsx         ← Add/Edit address
├── PasswordForm.tsx        ← Change password
├── TierBadge.tsx          ← Distributor tier
├── InvoicePDF.tsx         ← Download invoice
├── QuickReorder.tsx       ← Reorder from history
├── OrderTemplate.tsx     ← Saved basket
└── StockAlert.tsx         ← Low stock alert
```

---

*Spec generated: 2026-04-14 | Last updated: 2026-04-14*