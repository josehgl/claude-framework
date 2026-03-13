# Edge Case Categories — Reference

Systematic checklist for discovering edge cases. Not all categories apply to every story.

## 1. Boundary Values

| Boundary | What to Test |
|----------|-------------|
| Zero / Empty | Empty string, empty list, zero quantity, null |
| One | Single item, single character, first use |
| Maximum | Max length, max items, max file size |
| Just over limit | max + 1, length + 1 character |
| Negative | Negative numbers, negative dates, negative indexes |
| Whitespace | Spaces only, tabs, newlines, mixed |

## 2. State Transitions

| State | What to Test |
|-------|-------------|
| Doesn't exist | Acting on a non-existent entity |
| Already exists | Creating a duplicate |
| Deleted / Archived | Acting on a soft-deleted entity |
| In transition | Acting on an entity being processed |
| Completed | Acting on something already finished |
| Idempotency | Same action submitted twice |

## 3. Permissions & Access

| Scenario | What to Test |
|----------|-------------|
| Not authenticated | Anonymous user attempts action |
| Authenticated, not authorized | Wrong role or insufficient permissions |
| Owner vs viewer | Different access levels see different things |
| Permission revoked mid-session | Access removed while user is active |
| Shared resources | Multiple users with different permissions |

## 4. Time & Scheduling

| Scenario | What to Test |
|----------|-------------|
| Midnight | Operations at 00:00:00 |
| End of month | Feb 28/29, months with 30 vs 31 days |
| End of year | Dec 31 → Jan 1 transitions |
| Timezone differences | UTC vs local, international users |
| DST transitions | Spring forward, fall back |
| Expiration | Tokens, sessions, deadlines that expire |
| Clock skew | Client and server clocks differ |

## 5. Concurrency

| Scenario | What to Test |
|----------|-------------|
| Simultaneous edits | Two users modify the same entity |
| Double submission | User clicks "submit" twice |
| Race condition | Two operations depend on the same state |
| Optimistic lock failure | Entity modified between read and write |
| Background + foreground | Background job and user action overlap |

## 6. Integration & External

| Scenario | What to Test |
|----------|-------------|
| Service down | External dependency unreachable |
| Slow response | Timeout before response arrives |
| Unexpected format | API returns different schema than expected |
| Partial success | 2 of 3 operations succeed, 1 fails |
| Out-of-order delivery | Webhook events arrive in wrong order |
| Rate limiting | Too many requests to external API |

## 7. Data Quality

| Scenario | What to Test |
|----------|-------------|
| Unicode | Emojis, CJK characters, diacritics |
| RTL text | Arabic, Hebrew mixed with LTR |
| Very long input | 10x expected length |
| Special characters | Quotes, slashes, ampersands, HTML tags |
| Injection | SQL injection patterns, XSS payloads |
| File issues | Wrong format, too large, corrupted, zero bytes |

## 8. Scale & Volume

| Scenario | What to Test |
|----------|-------------|
| First time | No data exists yet (empty state) |
| Large volume | Thousands of items |
| Pagination boundaries | Last page, page with 1 item |
| Bulk operations | Acting on many items at once |

## Prioritization Matrix

| Could cause... | Priority |
|----------------|----------|
| Data loss or corruption | **Must have** |
| Security vulnerability | **Must have** |
| Application crash | **Must have** |
| Wrong data shown to user | **Must have** |
| Poor user experience | **Should have** |
| Cosmetic issues | **Could have** |
