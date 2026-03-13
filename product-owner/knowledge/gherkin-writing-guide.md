# Gherkin Writing Guide — Reference

## Format

```gherkin
Scenario: [descriptive name]
  Given [complete initial state]
    And [additional context]
  When [single action]
  Then [observable outcome]
    And [additional outcome]
```

## Rules for Each Keyword

### Given (initial state)
- Describes the complete context BEFORE the action
- Must be self-contained — reader should understand the starting state without reading other scenarios
- Use past tense or present state: "Given the user is logged in", "Given the cart has 3 items"
- Multiple conditions use `And`

**Good**: `Given a user with email "test@example.com" exists and is verified`
**Bad**: `Given the usual setup` (what setup?)

### When (action)
- Exactly ONE action per scenario
- Use present tense: "When the user clicks submit"
- If you need `And` after When, you probably need two scenarios

**Good**: `When the user submits the registration form`
**Bad**: `When the user fills the form and clicks submit and waits` (three actions)

### Then (outcome)
- Must be observable and verifiable by a test
- Use present tense: "Then a confirmation email is sent"
- Multiple outcomes use `And`
- Specify exact values when possible

**Good**: `Then the error message "Email already registered" is displayed`
**Bad**: `Then an appropriate error is shown` (what error? where?)

## Word Ban List

These words are NEVER allowed in AC:

| Banned Word | Why | Replace With |
|------------|-----|-------------|
| correctly | Not measurable | Specify the exact behavior |
| properly | Not measurable | Specify the exact behavior |
| quickly | Not measurable | "within 2 seconds" or similar |
| appropriate | Subjective | Specify what's appropriate |
| relevant | Subjective | Specify the criteria |
| user-friendly | Subjective | Describe the specific interaction |
| seamless | Subjective | Describe the flow step by step |
| etc. | Incomplete | List all cases |
| should | Uncertain | Use "is" or "does" (declarative) |
| may/might | Uncertain | Decide: does it or doesn't it? |

## Implementation Word Ban List

No technology names in AC:

| Banned | Replace With |
|--------|-------------|
| database, SQL, table | "is persisted", "is stored" |
| API, endpoint, REST | "the system", "the service" |
| component, React, Vue | describe the UI behavior |
| click, tap | "selects", "activates" (device-agnostic) |
| JSON, XML, CSV | "the data", "the export" (unless format IS the requirement) |
| cache, Redis, queue | "is available immediately", "is processed" |

## Scenario Naming

Format: `[what is being tested] [under what condition]`

**Good names**:
- "User registration with valid email"
- "Login fails when password is incorrect"
- "Cart total updates when item quantity changes"

**Bad names**:
- "Test 1" (meaningless)
- "Happy path" (too generic)
- "It should work" (not descriptive)

## Examples Tables

When the same scenario applies to multiple data sets:

```gherkin
Scenario Outline: Password validation
  Given the user enters password "<password>"
  When the user submits the form
  Then the validation message "<message>" is displayed

  Examples:
    | password | message |
    | ab       | "Password must be at least 8 characters" |
    | abcdefgh | (none — valid) |
    | abc12345 | (none — valid) |
```

Use Examples tables when you have 3+ data variations for the same behavior.

## Common Anti-Patterns with Fixes

| Anti-Pattern | Before | After |
|-------------|--------|-------|
| Missing Given | `When user clicks submit` | `Given the form is filled with valid data When user clicks submit` |
| Compound When | `When user logs in and navigates to dashboard` | Split into 2 scenarios |
| Vague Then | `Then it works` | `Then the user is redirected to the dashboard` |
| Implementation | `Then a row is inserted into users table` | `Then the user account is created` |
| Testing UI details | `Then a green button appears at (100, 200)` | `Then a success action is available` |
