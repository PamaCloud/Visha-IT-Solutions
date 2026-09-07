import { z } from "zod";
import { validateEmailStrict } from "@/lib/emailValidator";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required.")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Full name must start with a letter.",
    })
    .refine((val) => val.length >= 2, {
      message: "Full name must be at least 2 characters.",
    })
    .refine((val) => val.length <= 50, {
      message: "Full name must not exceed 50 characters.",
    })
    .refine((val) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(val), {
      message: "Full name can contain only letters and single spaces.",
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

  subject: z
    .string()
    .min(1, "Subject is required.")
    .refine((val) => /^[A-Za-z0-9]/.test(val), {
      message: "Subject must start with a letter or number.",
    })
    .refine((val) => val.length >= 5, {
      message: "Subject must be at least 5 characters.",
    })
    .refine((val) => val.length <= 100, {
      message: "Subject must not exceed 100 characters.",
    })
    .refine((val) => /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/.test(val), {
      message: "Subject can contain only letters, numbers, and spaces.",
    }),

  message: z
    .string()
    .min(1, "Message is required.")
    .refine(
      (val) => !/<[^>]*>|javascript:|eval\(|onload=|onerror=/i.test(val),
      {
        message: "Message contains invalid characters.",
      }
    )
    .refine((val) => val.trim().length >= 20, {
      message: "Message must be at least 20 characters.",
    })
    .refine((val) => val.trim().length <= 1000, {
      message: "Message must not exceed 1000 characters.",
    }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function validateContactField(
  field: keyof ContactFormValues,
  value: string
): string | null {
  switch (field) {
    case "fullName": {
      if (!value || value.trim() === "") return "Full name is required.";
      if (!/^[A-Za-z]/.test(value)) return "Full name must start with a letter.";
      if (value.length < 2) return "Full name must be at least 2 characters.";
      if (value.length > 50) return "Full name must not exceed 50 characters.";
      if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) {
        return "Full name can contain only letters and single spaces.";
      }
      return null;
    }
    case "email": {
      const res = validateEmailStrict(value);
      return res.isValid ? null : (res.error || "Please enter a valid email address.");
    }
    case "subject": {
      if (!value || value.trim() === "") return "Subject is required.";
      if (!/^[A-Za-z0-9]/.test(value)) return "Subject must start with a letter or number.";
      if (value.length < 5) return "Subject must be at least 5 characters.";
      if (value.length > 100) return "Subject must not exceed 100 characters.";
      if (!/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/.test(value)) {
        return "Subject can contain only letters, numbers, and spaces.";
      }
      return null;
    }
    case "message": {
      if (!value || value.trim() === "") return "Message is required.";
      if (/<[^>]*>|javascript:|eval\(|onload=|onerror=/i.test(value)) {
        return "Message contains invalid characters.";
      }
      if (value.trim().length < 20) return "Message must be at least 20 characters.";
      if (value.trim().length > 1000) return "Message must not exceed 1000 characters.";
      return null;
    }
    default:
      return null;
  }
}
