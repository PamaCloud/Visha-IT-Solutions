import { z } from "zod";
import { validateEmailStrict } from "@/lib/emailValidator";

export const CAREER_POSITION_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer (Flutter/React Native)",
  "UI/UX Designer",
  "QA / Automation Engineer",
  "Cloud / DevOps Engineer",
  "AI / ML Engineer",
] as const;

export const CAREER_EXPERIENCE_OPTIONS = [
  "Fresher (0–1 Years)",
  "Junior (1–3 Years)",
  "Mid-Level (3–5 Years)",
  "Senior (5–8 Years)",
  "Lead / Architect (8+ Years)",
  "Other",
] as const;

export const careerFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: "First name can contain letters only (no spaces, numbers, or symbols).",
    })
    .refine((val) => val.length >= 2 && val.length <= 40, {
      message: "First name must be between 2 and 40 characters.",
    }),

  lastName: z
    .string()
    .min(1, "Last name is required.")
    .refine((val) => val.length <= 40, {
      message: "Last name must not exceed 40 characters.",
    })
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "Last name can contain letters and single spaces only.",
    }),

  email: z
    .string()
    .min(1, "Email address is required.")
    .superRefine((val, ctx) => {
      const res = validateEmailStrict(val);
      if (!res.isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: res.error || "Please enter a valid email address.",
        });
      }
    }),

  phone: z
    .string()
    .min(1, "Phone number is required.")
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number can contain digits only.",
    })
    .refine((val) => /^[6-9]/.test(val), {
      message: "Phone number must start with 6, 7, 8, or 9.",
    })
    .refine((val) => val.length === 10, {
      message: "Phone number must contain exactly 10 digits.",
    })
    .refine((val) => /^[6-9][0-9]{9}$/.test(val), {
      message: "Phone number must contain exactly 10 digits.",
    }),

  currentCompany: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        return val.trim().length >= 2 && val.trim().length <= 100;
      },
      {
        message: "Company name must be between 2 and 100 characters.",
      }
    )
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        return /^[A-Za-z0-9&.,\- ]{2,100}$/.test(val.trim());
      },
      {
        message: "Company name contains invalid characters.",
      }
    ),

  linkedin: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-]+\/?$/i;
        return linkedInRegex.test(val.trim());
      },
      {
        message:
          "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username).",
      }
    ),

  portfolio: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        if (/\s/.test(val.trim()) || val.trim().length > 200) return false;
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
        return urlRegex.test(val.trim());
      },
      {
        message: "Please enter a valid website URL (e.g., https://yourportfolio.com).",
      }
    ),

  position: z
    .string()
    .min(1, "Please select an open position.")
    .max(120, "Position title is too long."),

  experienceLevel: z
    .string()
    .min(1, "Please select or specify your experience level.")
    .max(120, "Experience level is too long."),

  coverLetter: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        return !/<[^>]*>|javascript:|eval\(|onload=|onerror=/i.test(val);
      },
      {
        message: "Cover letter contains invalid or malicious characters.",
      }
    )
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        return val.trim().length >= 20 && val.trim().length <= 2000;
      },
      {
        message: "Cover letter must be between 20 and 2000 characters if provided.",
      }
    ),
});

export type CareerFormValues = z.infer<typeof careerFormSchema>;

export function validateCareerField(
  field: keyof CareerFormValues | "resume",
  value?: string,
  file?: File | null
): string | null {
  switch (field) {
    case "firstName": {
      if (!value || value.trim() === "") return "First name is required.";
      if (!/^[A-Za-z]+$/.test(value)) {
        return "First name can contain letters only (no spaces, numbers, or symbols).";
      }
      if (value.length < 2 || value.length > 40) {
        return "First name must be between 2 and 40 characters.";
      }
      return null;
    }

    case "lastName": {
      if (!value || value.trim() === "") return "Last name is required.";
      if (value.length > 40) {
        return "Last name must not exceed 40 characters.";
      }
      if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
        return "Last name can contain letters and single spaces only.";
      }
      return null;
    }

    case "email": {
      const res = validateEmailStrict(value || "");
      return res.isValid ? null : (res.error || "Please enter a valid email address.");
    }

    case "phone": {
      if (!value || value.trim() === "") return "Phone number is required.";
      if (/\D/.test(value)) return "Phone number can contain digits only.";
      if (/^[0-5]/.test(value)) return "Phone number must start with 6, 7, 8, or 9.";
      if (value.length !== 10) return "Phone number must contain exactly 10 digits.";
      if (!/^[6-9][0-9]{9}$/.test(value)) return "Phone number must contain exactly 10 digits.";
      return null;
    }

    case "currentCompany": {
      if (!value || value.trim() === "") return null;
      const trimmed = value.trim();
      if (/<[^>]*>/i.test(trimmed)) return "Company name contains invalid characters.";
      if (trimmed.length < 2 || trimmed.length > 100) {
        return "Company name must be between 2 and 100 characters.";
      }
      if (!/^[A-Za-z0-9&.,\- ]{2,100}$/.test(trimmed)) {
        return "Company name contains invalid characters.";
      }
      return null;
    }

    case "linkedin": {
      if (!value || value.trim() === "") return null;
      const trimmed = value.trim();
      if (/\s/.test(trimmed)) {
        return "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username).";
      }
      const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-]+\/?$/i;
      if (!linkedInRegex.test(trimmed)) {
        return "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username).";
      }
      return null;
    }

    case "portfolio": {
      if (!value || value.trim() === "") return null;
      const trimmed = value.trim();
      if (/\s/.test(trimmed) || trimmed.length > 200) {
        return "Please enter a valid website URL (e.g., https://yourportfolio.com).";
      }
      const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
      if (!urlRegex.test(trimmed)) {
        return "Please enter a valid website URL (e.g., https://yourportfolio.com).";
      }
      return null;
    }

    case "position": {
      if (!value || value.trim() === "") return "Please select an open position.";
      return null;
    }

    case "experienceLevel": {
      if (!value || value.trim() === "") return "Please select or specify your experience level.";
      return null;
    }

    case "coverLetter": {
      if (!value || value.trim() === "") return null;
      const trimmed = value.trim();
      if (/<[^>]*>|javascript:|eval\(|onload=|onerror=/i.test(trimmed)) {
        return "Cover letter contains invalid or malicious characters.";
      }
      if (trimmed.length < 20 || trimmed.length > 2000) {
        return "Cover letter must be between 20 and 2000 characters if provided.";
      }
      return null;
    }

    case "resume": {
      if (!file) return "Please upload your resume.";
      if (file.size === 0) return "Please upload your resume.";
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const fileNameLower = file.name.toLowerCase();
      const hasValidExt = allowedExtensions.some((ext) => fileNameLower.endsWith(ext));
      if (!hasValidExt) {
        return "Unsupported file format. Only PDF, DOC, and DOCX are allowed.";
      }
      const maxSizeBytes = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSizeBytes) {
        return "File size exceeds 10MB limit. Please upload a smaller file.";
      }
      return null;
    }

    default:
      return null;
  }
}
