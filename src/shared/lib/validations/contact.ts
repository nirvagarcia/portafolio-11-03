import { z } from 'zod';

export const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t('contact.validation.nameRequired') })
      .min(2, { message: t('contact.validation.nameMin') }),
    email: z
      .string()
      .min(1, { message: t('contact.validation.emailRequired') })
      .email({ message: t('contact.validation.emailInvalid') }),
    subject: z
      .string()
      .min(1, { message: t('contact.validation.subjectRequired') })
      .min(5, { message: t('contact.validation.subjectMin') }),
    message: z
      .string()
      .min(1, { message: t('contact.validation.messageRequired') })
      .min(10, { message: t('contact.validation.messageMin') }),
  });

export type ContactFormSchema = z.infer<ReturnType<typeof createContactFormSchema>>;
