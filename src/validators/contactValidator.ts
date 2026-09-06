import { z } from "zod";

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
    .refine((val) => !/\s/.test(val), {
      message: "Email address cannot contain spaces.",
    })
    .refine((val) => val.length >= 6, {
      message: "Email address must be at least 6 characters.",
    })
    .refine((val) => val.length <= 254, {
      message: "Email address must not exceed 254 characters.",
    })
    .refine(
      (val) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return (
          emailRegex.test(val) &&
          !val.startsWith("@") &&
          !val.endsWith("@") &&
          (val.match(/@/g) || []).length === 1
        );
      },
      {
        message: "Please enter a valid email address.",
      }
    ),

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
      if (!value || value.trim() === "") return "Email address is required.";
      if (/\s/.test(value)) return "Email address cannot contain spaces.";
      if (value.length > 254) return "Email address must not exceed 254 characters.";
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (
        value.length < 6 ||
        !emailRegex.test(value) ||
        value.startsWith("@") ||
        value.endsWith("@") ||
        (value.match(/@/g) || []).length !== 1
      ) {
        return "Please enter a valid email address.";
      }
      return null;
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
