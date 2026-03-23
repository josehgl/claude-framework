# Refactoring Patterns — Reference

Safe refactoring techniques for the Implementer's "refactor" phase.
Every refactoring must keep all tests green.

---

## Golden Rule

**Run tests after every refactoring step.** If any test fails, undo immediately.
A refactoring that breaks tests is not a refactoring — it's a behavior change.

---

## Catalog

### Extract Function

**When**: A block of code does a distinct, nameable thing inside a larger function.

```
Before:
  function processOrder(order) {
    // validate
    if (!order.items.length) throw new Error('Empty');
    if (order.total < 0) throw new Error('Negative');
    // ... 20 more lines
  }

After:
  function processOrder(order) {
    validateOrder(order);
    // ... rest
  }

  function validateOrder(order) {
    if (!order.items.length) throw new Error('Empty');
    if (order.total < 0) throw new Error('Negative');
  }
```

**Risk**: Low. Tests should still pass because behavior is unchanged.

---

### Extract Variable

**When**: A complex expression is hard to read.

```
Before:
  if (user.age >= 18 && user.country === 'US' && user.verified) {

After:
  const isEligible = user.age >= 18 && user.country === 'US' && user.verified;
  if (isEligible) {
```

**Risk**: Very low.

---

### Rename

**When**: A name doesn't describe intent.

```
Before: const d = new Date();
After:  const createdAt = new Date();

Before: function proc(x) {
After:  function calculateDiscount(price) {
```

**Risk**: Low if done with find-and-replace across the project.

---

### Inline

**When**: An extracted function/variable adds indirection without adding clarity.

```
Before:
  function isEligible(user) { return user.age >= 18; }
  // only used once, in an obvious context

After:
  if (user.age >= 18) {
```

**Risk**: Low. Only inline when the original is clearer.

---

### Decompose Conditional

**When**: Complex if/else chains are hard to follow.

```
Before:
  if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
    charge = quantity * winterRate;
  } else {
    charge = quantity * summerRate;
  }

After:
  if (isSummer(date)) {
    charge = quantity * summerRate;
  } else {
    charge = quantity * winterRate;
  }

  function isSummer(date) {
    return !date.before(SUMMER_START) && !date.after(SUMMER_END);
  }
```

**Risk**: Low. Extract the condition into a named function.

---

### Replace Magic Numbers with Constants

**When**: Numeric literals appear without explanation.

```
Before:
  if (password.length < 8) {
  if (retries > 3) {

After:
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_RETRIES = 3;
  if (password.length < MIN_PASSWORD_LENGTH) {
  if (retries > MAX_RETRIES) {
```

**Risk**: Very low.

---

### Introduce Parameter Object

**When**: Multiple parameters travel together.

```
Before:
  function createEvent(title, startDate, endDate, location, organizer) {

After:
  function createEvent(params: CreateEventParams) {

  interface CreateEventParams {
    title: string;
    startDate: Date;
    endDate: Date;
    location: string;
    organizer: string;
  }
```

**Risk**: Medium. All callers must be updated.

---

### Replace Inheritance with Composition

**When**: A class inherits behavior it doesn't fully need.

```
Before:
  class AdminUser extends User {
    // inherits 20 methods, overrides 2
  }

After:
  class AdminUser {
    private user: User;
    // delegates what it needs, adds admin-specific behavior
  }
```

**Risk**: Medium. Requires updating tests and callers.

---

### Guard Clause (Replace Nested Conditional with Guard)

**When**: Deep nesting makes the happy path hard to find.

```
Before:
  function getPayAmount(employee) {
    if (employee.isSeparated) {
      return separatedAmount();
    } else {
      if (employee.isRetired) {
        return retiredAmount();
      } else {
        return normalAmount();
      }
    }
  }

After:
  function getPayAmount(employee) {
    if (employee.isSeparated) return separatedAmount();
    if (employee.isRetired) return retiredAmount();
    return normalAmount();
  }
```

**Risk**: Low.

---

## When NOT to Refactor

- Tests are not all green — fix tests first
- Under time pressure with no test coverage — refactoring without tests is gambling
- The code works and won't be touched again — leave it alone
- "Just because" — refactoring needs a reason (readability, duplication, complexity)
- During the Red phase — only refactor during Green
