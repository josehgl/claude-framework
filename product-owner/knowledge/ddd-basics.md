# Domain-Driven Design Basics — Reference

## Core Concepts for Product Owners

DDD is primarily a technical methodology, but these concepts are critical for writing good specs.

## Ubiquitous Language

The single most important DDD concept for POs: **everyone uses the same words for the same things**.

Rules:
- Developers, POs, and users use identical terminology
- Terms are defined in the glossary — no synonyms, no ambiguity
- Code mirrors the language (class names = domain terms)
- If you change a term, change it everywhere

**Why it matters**: A spec that says "customer" when the code says "user" and the database says "account" creates bugs.

## Bounded Contexts

A boundary within which a term has one specific meaning.

Example: "Account" means different things in:
- **Billing context**: payment method, invoices, subscription
- **Auth context**: login credentials, permissions, sessions
- **CRM context**: company profile, contacts, history

**Why it matters for POs**: When writing AC, specify which context you mean. "When the account is updated" is ambiguous if you have multiple contexts.

## Entities vs Value Objects

| Concept | Has Identity? | Example | In AC |
|---------|:----------:|---------|-------|
| **Entity** | Yes — tracked over time | User, Order, Invoice | "Given user #123 exists" |
| **Value Object** | No — defined by attributes | Address, Money, DateRange | "Given the price is $10.00" |

**Why it matters**: Entities need unique identifiers in your AC. Value objects are interchangeable.

## Aggregates

A cluster of entities/value objects treated as one unit for data changes.

Example: an **Order** aggregate contains OrderLines, ShippingAddress, and PaymentInfo. You modify the Order as a whole, not its parts independently.

**Why it matters for POs**: When writing stories, respect aggregate boundaries. "Update the shipping address on an order" is one story. "Update the shipping address independently of the order" might break the aggregate.

## Domain Events

Something that happened that the domain cares about.

Format: `[Entity][PastTenseVerb]` — OrderPlaced, PaymentFailed, UserRegistered

**Why it matters**: Events are natural triggers for Given/When/Then:
```gherkin
Given an OrderPlaced event occurred
When the payment is processed
Then an OrderConfirmed event is emitted
```

## How to Extract Domain Knowledge

1. **Listen for rules**: "Oh, but in that case..." — that's a business rule
2. **Listen for exceptions**: "Except when..." — that's an edge case
3. **Listen for corrections**: "No, that's not how it works" — you found a misunderstanding
4. **Watch for jargon**: any term the human uses that you don't know — add to glossary
5. **Ask "what if?"**: challenge every statement with edge cases

## Sources

- Eric Evans: "Domain-Driven Design"
- Vaughn Vernon: "Domain-Driven Design Distilled"
