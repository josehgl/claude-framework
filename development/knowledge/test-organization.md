# Test Organization — Reference

How to structure, name, and organize test files across different stacks.

---

## File Naming Conventions

| Stack | Pattern | Example |
|-------|---------|---------|
| JavaScript/TypeScript | `*.test.ts`, `*.spec.ts` | `user-service.test.ts` |
| Python | `test_*.py` | `test_user_service.py` |
| Go | `*_test.go` | `user_service_test.go` |
| Rust | `mod tests` in same file or `tests/` dir | inline or `tests/user_service.rs` |

**Rule**: match whatever convention already exists in the project. Never mix conventions.

---

## Directory Structure

### Co-located Tests (preferred for unit tests)

```
src/
├── services/
│   ├── user-service.ts
│   ├── user-service.test.ts      ← test next to source
│   ├── order-service.ts
│   └── order-service.test.ts
```

### Separate Test Directory (preferred for integration/e2e)

```
src/
├── services/
│   ├── user-service.ts
│   └── order-service.ts
tests/
├── unit/
│   ├── user-service.test.ts
│   └── order-service.test.ts
├── integration/
│   └── user-order-flow.test.ts
└── e2e/
    └── checkout.test.ts
```

### Python Convention

```
src/
├── services/
│   ├── user_service.py
│   └── order_service.py
tests/
├── unit/
│   ├── test_user_service.py
│   └── test_order_service.py
├── integration/
│   └── test_user_order_flow.py
└── conftest.py                   ← shared fixtures
```

---

## Test Naming

### Pattern: `should [expected behavior] when [condition]`

Good:
- `should return 404 when user not found`
- `should create order when cart is valid`
- `should throw ValidationError when email is empty`
- `should send notification when payment succeeds`

Bad:
- `test1` — meaningless
- `testCreateUser` — describes function, not behavior
- `it works` — not specific
- `should call repository.save` — tests implementation, not behavior

### Grouping: Describe blocks by unit under test

```typescript
describe('OrderService', () => {
  describe('createOrder', () => {
    it('should create order when cart is valid', ...);
    it('should throw when cart is empty', ...);
    it('should apply discount when coupon is valid', ...);
  });

  describe('cancelOrder', () => {
    it('should cancel order when status is pending', ...);
    it('should throw when order is already shipped', ...);
  });
});
```

---

## Fixtures and Test Data

### Factory Pattern (preferred)

Create factory functions that produce valid test data with sensible defaults:

```typescript
function createUser(overrides?: Partial<User>): User {
  return {
    id: 'test-id',
    name: 'Test User',
    email: 'test@example.com',
    createdAt: new Date('2024-01-01'),
    ...overrides,
  };
}

// Usage
const user = createUser({ name: 'Alice' });
const admin = createUser({ role: 'admin' });
```

### Fixture Files

For large or complex test data, use fixture files:

```
tests/
├── fixtures/
│   ├── valid-order.json
│   ├── invalid-order.json
│   └── large-catalog.json
```

### Rules

- Every test creates its own data — no shared mutable state
- Use factories over raw object literals — reduces duplication
- Fixture files for large/complex data — keeps tests readable
- Never use production data in tests — create synthetic data

---

## Test Isolation

### Database Tests

- Use transactions that rollback after each test
- Or: use a fresh database per test suite (test containers)
- Or: use in-memory database for unit tests

### File System Tests

- Use temp directories (`os.tmpdir()`, `tempfile.mkdtemp()`)
- Clean up in `afterEach`/`teardown`
- Never write to the project directory during tests

### Time-Dependent Tests

- Inject a clock/time source instead of using `Date.now()` or `time.time()`
- Use fake timers (`vi.useFakeTimers()`, `freezegun`)

### Network Tests

- Mock HTTP clients at the boundary
- Use recorded responses (VCR pattern) for integration tests
- Never call real external APIs in unit tests

---

## Coverage Targets

| Layer | Target | What to Measure |
|-------|--------|----------------|
| Business logic (services, domain) | > 80% | Branch coverage |
| API handlers/controllers | > 70% | Line coverage |
| Utilities/helpers | > 90% | Line coverage |
| UI components | > 60% | Line coverage (focus on logic) |
| Infrastructure (DB, cache) | > 50% | Integration test coverage |

**What NOT to measure:**
- Generated code (types, schemas)
- Configuration files
- Simple getters/setters
- Framework boilerplate
