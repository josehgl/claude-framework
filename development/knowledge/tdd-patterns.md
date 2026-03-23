# TDD Patterns — Reference

Extends @global/methodology/tdd.md with practical patterns for test-driven development.

---

## The Red-Green-Refactor Cycle

### Red (Write a Failing Test)
1. Write the test BEFORE any implementation
2. Run it — it MUST fail
3. If it passes, either the feature exists or the test is trivially true
4. The failure message should clearly describe what's missing

### Green (Write Minimum Code)
1. Write the SIMPLEST code that makes the test pass
2. Don't optimize, don't generalize — just pass the test
3. Hard-coded values are acceptable if only one test exists
4. Run all tests — the new one passes, no others break

### Refactor (Clean Up)
1. Only refactor when all tests are green
2. One refactoring step at a time
3. Run tests after each step
4. If any test breaks → undo immediately

---

## Test Doubles

Use the right double for the right situation:

| Double | What It Does | When to Use |
|--------|-------------|-------------|
| **Stub** | Returns pre-configured values | Need predictable data from a dependency |
| **Mock** | Verifies interactions were called | Need to verify a side effect occurred |
| **Spy** | Records calls for later assertion | Want to verify calls without replacing behavior |
| **Fake** | Working but simplified implementation | Need realistic behavior (e.g., in-memory DB) |

### When NOT to Use Test Doubles

- Do NOT mock the thing you're testing
- Do NOT mock value objects or data structures
- Do NOT mock everything — only external boundaries
- Prefer fakes over mocks for complex dependencies (database, file system)
- If you're mocking more than 2 things, the code has too many dependencies

---

## Test Layers

### Unit Tests
- Test a single function or class in isolation
- Fast: < 10ms per test
- No I/O, no network, no filesystem
- Use stubs/mocks for external dependencies
- Run on every save

### Integration Tests
- Test interactions between 2+ modules
- May use real database (prefer test containers or in-memory)
- May use real filesystem (temp directories)
- Slower: 100ms-1s per test
- Run before commit

### End-to-End Tests
- Test complete user workflows
- Use real browser/API client
- Slowest: 1-10s per test
- Run in CI only
- Cover critical paths only (login, checkout, data loss scenarios)

### The Testing Pyramid

```
       /  E2E  \        Few: critical paths only
      /----------\
     / Integration \    Some: module boundaries
    /----------------\
   /    Unit Tests    \  Many: business logic
  /____________________\
```

---

## Framework-Specific Patterns

### JavaScript/TypeScript (Vitest/Jest)

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should return created user when input is valid', async () => {
      // Arrange
      const input = { name: 'Alice', email: 'alice@example.com' };
      const repo = { save: vi.fn().mockResolvedValue({ id: '1', ...input }) };
      const service = new UserService(repo);

      // Act
      const result = await service.createUser(input);

      // Assert
      expect(result).toEqual({ id: '1', name: 'Alice', email: 'alice@example.com' });
    });

    it('should throw ValidationError when email is invalid', async () => {
      const service = new UserService(mockRepo);
      await expect(service.createUser({ name: 'A', email: 'bad' }))
        .rejects.toThrow(ValidationError);
    });
  });
});
```

### Python (Pytest)

```python
class TestUserService:
    def test_create_user_returns_user_when_valid(self, mock_repo):
        # Arrange
        service = UserService(repo=mock_repo)
        mock_repo.save.return_value = User(id="1", name="Alice")

        # Act
        result = service.create_user(name="Alice", email="alice@example.com")

        # Assert
        assert result.name == "Alice"
        assert result.id == "1"

    def test_create_user_raises_when_email_invalid(self, mock_repo):
        service = UserService(repo=mock_repo)
        with pytest.raises(ValidationError):
            service.create_user(name="A", email="bad")
```

### Go (testing)

```go
func TestCreateUser_ReturnsUser_WhenValid(t *testing.T) {
    repo := &MockRepo{SaveFn: func(u User) (User, error) {
        return User{ID: "1", Name: u.Name}, nil
    }}
    svc := NewUserService(repo)

    result, err := svc.CreateUser("Alice", "alice@example.com")

    assert.NoError(t, err)
    assert.Equal(t, "Alice", result.Name)
}

func TestCreateUser_ReturnsError_WhenEmailInvalid(t *testing.T) {
    svc := NewUserService(&MockRepo{})

    _, err := svc.CreateUser("A", "bad")

    assert.ErrorIs(t, err, ErrValidation)
}
```

---

## Common TDD Mistakes

| Mistake | Fix |
|---------|-----|
| Writing tests after code | Always red first — proves the test catches failures |
| Testing implementation, not behavior | Assert on outputs and side effects, not internal calls |
| Too many mocks | Reduce dependencies, use fakes for complex ones |
| Not running tests after each change | Make it a habit — every save, every edit |
| Skipping the refactor phase | Green is not done — clean code is done |
| Writing too many tests at once | One test at a time, one implementation at a time |
| Tests that depend on each other | Each test must set up its own state |
