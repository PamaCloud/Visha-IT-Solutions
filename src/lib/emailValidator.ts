/**
 * Comprehensive Strict Email Validation System
 * 
 * Implements:
 * 1. Syntax Check: RFC 5322 compliance, proper local-part and domain structure.
 * 2. TLD Enforcement: Rejects single-character TLDs (e.g. .c), restricts typos (.co for Gmail/Yahoo/Hotmail).
 * 3. Gmail-Specific Validation:
 *    - Allowed characters: Letters (a-z), numbers (0-9), and periods (.).
 *    - Username length: 6 to 30 characters (excluding periods).
 *    - Dot rules: No leading dot, no trailing dot, no consecutive dots (..).
 *    - Plus addressing: Strips tags after '+' for base length calculation.
 *    - Domain variations: Must strictly be @gmail.com or @googlemail.com (blocks @gmail.co, @gmail.c, @gamil.com).
 * 4. Disposable / Burner Email Blocklist: Flags temporary burner domains (Mailinator, TempMail, etc.).
 * 5. DNS / MX Lookup (Server-Side): Verifies domain exists and has active MX records.
 */

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "dispostable.com",
  "sharklasers.com",
  "getairmail.com",
  "fakeinbox.com",
  "inboxkitten.com",
  "burnermail.io",
  "generator.email",
  "getnada.com",
  "mohmal.com",
  "crazymailing.com",
  "mytemp.email",
  "mailcatch.com",
  "emailondeck.com",
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  normalizedEmail?: string;
}

/**
 * Synchronous client & server strict email validation
 */
export function validateEmailStrict(email: string): EmailValidationResult {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email address is required." };
  }

  const trimmed = email.trim();

  // 1. Whitespace check
  if (/\s/.test(trimmed)) {
    return { isValid: false, error: "Email address cannot contain spaces." };
  }

  // 2. Length check
  if (trimmed.length < 6) {
    return { isValid: false, error: "Email address must be at least 6 characters." };
  }
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email address cannot exceed 254 characters." };
  }

  // 3. Single '@' check
  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount !== 1) {
    return { isValid: false, error: "Email must contain exactly one '@' symbol." };
  }

  const [localPart, domainPart] = trimmed.split("@");

  if (!localPart || !domainPart) {
    return { isValid: false, error: "Please enter a complete email address (e.g. name@company.com)." };
  }

  // 4. Local-part sanity checks
  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return { isValid: false, error: "Email username cannot start or end with a period." };
  }
  if (localPart.includes("..")) {
    return { isValid: false, error: "Email username cannot contain consecutive periods (..)." };
  }

  // 5. Domain structure checks
  if (!domainPart.includes(".")) {
    return { isValid: false, error: "Email domain must include an extension (e.g. .com, .in)." };
  }
  if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
    return { isValid: false, error: "Email domain cannot start or end with a period." };
  }
  if (domainPart.startsWith("-") || domainPart.endsWith("-")) {
    return { isValid: false, error: "Email domain cannot start or end with a hyphen." };
  }

  const domainParts = domainPart.toLowerCase().split(".");
  const tld = domainParts[domainParts.length - 1];

  // 6. Strict TLD validation (restricts single letters like .c, non-alpha extensions)
  if (tld.length < 2) {
    return {
      isValid: false,
      error: "Invalid domain extension '." + tld + "'. Domain extension must have at least 2 characters (e.g. .com, .in). Single letter extensions like .c are not allowed.",
    };
  }
  if (!/^[a-z]{2,24}$/.test(tld)) {
    return { isValid: false, error: "Email domain extension contains invalid characters." };
  }

  const lowerDomain = domainPart.toLowerCase();

  // 7. Check disposable email providers
  if (DISPOSABLE_EMAIL_DOMAINS.has(lowerDomain)) {
    return {
      isValid: false,
      error: "Temporary or disposable email addresses are not accepted. Please use a permanent email.",
    };
  }

  // 8. Restrict common domain typos (.c, .co, .con for major services)
  if (
    lowerDomain === "gmail.co" ||
    lowerDomain === "gmail.c" ||
    lowerDomain === "gmail.cm" ||
    lowerDomain === "gmail.con" ||
    lowerDomain === "gmail.in" ||
    lowerDomain === "gmail.org" ||
    lowerDomain === "gmail.net"
  ) {
    return {
      isValid: false,
      error: "Invalid Gmail domain. Valid Gmail addresses must end with @gmail.com or @googlemail.com (.co and .c are not valid).",
    };
  }
  if (lowerDomain === "yahoo.c" || lowerDomain === "yahoo.cm" || lowerDomain === "yahoo.con") {
    return { isValid: false, error: "Invalid domain. Did you mean @yahoo.com?" };
  }
  if (lowerDomain === "hotmail.c" || lowerDomain === "hotmail.co" || lowerDomain === "hotmail.con") {
    return { isValid: false, error: "Invalid domain. Did you mean @hotmail.com?" };
  }
  if (lowerDomain === "outlook.c" || lowerDomain === "outlook.co" || lowerDomain === "outlook.con") {
    return { isValid: false, error: "Invalid domain. Did you mean @outlook.com?" };
  }
  if (["gamil.com", "gmaill.com", "gmial.com", "gmai.com", "gmai.co"].includes(lowerDomain)) {
    return { isValid: false, error: "Invalid domain spelling. Did you mean @gmail.com?" };
  }

  // 9. Gmail-Specific Strict Validation
  if (lowerDomain === "gmail.com" || lowerDomain === "googlemail.com") {
    // Strip plus addressing for base username validation
    const baseUsername = localPart.split("+")[0];

    // Character rules: only letters (a-z), numbers (0-9), and periods (.)
    if (!/^[a-zA-Z0-9.]+$/.test(baseUsername)) {
      return {
        isValid: false,
        error: "Gmail usernames can only contain letters (a-z), numbers (0-9), and periods (.).",
      };
    }

    // Gmail character length rule: 6 to 30 characters (excluding periods)
    const pureAlphanumeric = baseUsername.replace(/\./g, "");
    if (pureAlphanumeric.length < 6) {
      return {
        isValid: false,
        error: "Gmail username must be at least 6 characters long (excluding periods).",
      };
    }
    if (pureAlphanumeric.length > 30) {
      return {
        isValid: false,
        error: "Gmail username cannot exceed 30 characters.",
      };
    }
  } else {
    // General RFC-compliant email regex for all other legitimate enterprise & personal domains
    const standardEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!standardEmailRegex.test(trimmed)) {
      return { isValid: false, error: "Please enter a valid email address." };
    }
  }

  return { isValid: true, normalizedEmail: trimmed.toLowerCase() };
}

/**
 * Server-side DNS / MX record validation
 */
export async function verifyEmailMx(email: string): Promise<EmailValidationResult> {
  const syncResult = validateEmailStrict(email);
  if (!syncResult.isValid) return syncResult;

  const domain = email.trim().split("@")[1].toLowerCase();

  // Well-known valid providers
  const TRUSTED_DOMAINS = new Set([
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "vishait.com",
    "microsoft.com",
  ]);

  if (TRUSTED_DOMAINS.has(domain)) {
    return { isValid: true, normalizedEmail: syncResult.normalizedEmail };
  }

  // Dynamic DNS query in Node environment
  try {
    const dns = await import("node:dns");
    const mxRecords = await dns.promises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return {
        isValid: false,
        error: "The email domain '" + domain + "' does not have active mail servers (MX records) configured.",
      };
    }
    return { isValid: true, normalizedEmail: syncResult.normalizedEmail };
  } catch (err: any) {
    if (err?.code === "ENOTFOUND" || err?.code === "ENODATA") {
      return {
        isValid: false,
        error: "The email domain '" + domain + "' does not exist or has no active mail exchange server.",
      };
    }
    // Graceful fallback on network timeout
    return { isValid: true, normalizedEmail: syncResult.normalizedEmail };
  }
}
