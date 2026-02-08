# Testing Personas & Test Credentials

## Test User Personas

### Persona 1: Standard Customer
**Name**: John Doe
**Email**: john.doe@example.com
**Role**: Regular customer
**Use Case**: Standard product purchase

**Test Scenarios**:
- Browse products
- Add items to cart
- Complete checkout
- View order history

---

### Persona 2: Premium Customer
**Name**: Jane Smith
**Email**: jane.smith@example.com
**Role**: Premium/VIP customer
**Use Case**: High-value transactions

**Test Scenarios**:
- Premium features access
- Multiple item purchases
- Payment method management
- Customer support interaction

---

### Persona 3: Mobile User
**Name**: Mike Johnson
**Email**: mike.johnson@example.com
**Role**: Mobile-first user
**Device**: iPhone/Android
**Use Case**: Mobile shopping experience

**Test Scenarios**:
- Mobile navigation
- Mobile checkout
- Touch interactions
- Mobile performance

---

## Stripe Test Credentials

### Test Card Numbers

**Successful Payment**:
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Payment Declined**:
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**Insufficient Funds**:
```
Card Number: 4000 0000 0000 9995
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**Card Declined (Generic)**:
```
Card Number: 4000 0000 0000 0069
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

**Requires Authentication (3D Secure)**:
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## Test Environment Access

### Development Environment
- **URL**: http://localhost:3000
- **API Mode**: Test mode
- **Stripe Key**: pk_test_... (from environment variables)

### Staging Environment
- **URL**: TBD
- **API Mode**: Test mode
- **Access**: Restricted

---

## Testing Guidelines

### DO's
- ✅ Use Stripe test card numbers only
- ✅ Test all payment scenarios (success, decline, errors)
- ✅ Test across different browsers and devices
- ✅ Verify error messages are user-friendly
- ✅ Check mobile responsiveness
- ✅ Test theme switching
- ✅ Verify data validation

### DON'Ts
- ❌ Never use real credit card numbers in test mode
- ❌ Don't skip error scenario testing
- ❌ Don't test in production
- ❌ Don't share test credentials publicly
- ❌ Don't assume desktop testing covers mobile

---

## Test Data

### Sample Products
1. **Product A**: $10.00
2. **Product B**: $25.00
3. **Product C**: $100.00

### Sample Addresses

**US Address**:
```
123 Test Street
Apt 4B
San Francisco, CA 94105
United States
```

**International Address**:
```
456 Example Road
London, W1A 1AA
United Kingdom
```

---

## Test Checklist

### Payment Flow
- [ ] Card validation works correctly
- [ ] Payment processes successfully
- [ ] Error handling for declined cards
- [ ] 3D Secure authentication flow
- [ ] Payment confirmation displayed
- [ ] Receipt/confirmation email sent (if applicable)

### User Interface
- [ ] Forms are user-friendly
- [ ] Error messages are clear
- [ ] Loading states shown
- [ ] Success states shown
- [ ] Responsive on mobile
- [ ] Theme switching works

### Edge Cases
- [ ] Empty cart handling
- [ ] Network error handling
- [ ] Timeout scenarios
- [ ] Invalid input validation
- [ ] Browser back/forward navigation
- [ ] Page refresh during checkout

---

## Reporting Issues

When testing, if you find issues:
1. Document the issue in [Issues Log](../planning/issues_log.md)
2. Include steps to reproduce
3. Note the persona/test credentials used
4. Capture screenshots if possible
5. Note browser/device information

---

Last Updated: 2026-02-08
