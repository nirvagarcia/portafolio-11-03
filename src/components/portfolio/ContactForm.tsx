'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { createContactFormSchema, type ContactFormSchema } from '@/shared/lib/validations/contact';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(createContactFormSchema(t)),
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Implement actual form submission
    console.warn('Form submitted:', data);

    reset();
    setIsSubmitting(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {t('contact.form.name')}
        </label>
        <Input
          id="name"
          placeholder={t('contact.form.namePlaceholder')}
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {t('contact.form.email')}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t('contact.form.emailPlaceholder')}
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
          {t('contact.form.subject')}
        </label>
        <Input
          id="subject"
          placeholder={t('contact.form.subjectPlaceholder')}
          {...register('subject')}
          aria-invalid={errors.subject ? 'true' : 'false'}
        />
        {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t('contact.form.message')}
        </label>
        <Textarea
          id="message"
          placeholder={t('contact.form.messagePlaceholder')}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          rows={6}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Send className="h-4 w-4" />
            </motion.div>
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            {t('contact.form.submit')}
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
