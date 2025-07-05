
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const Newsletter = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-900/50 via-blue-900/50 to-teal-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Join the Revolution
        </h2>
        <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
          Be the first to know about new sustainable collections, exclusive drops, and behind-the-scenes content from the future of fashion.
        </p>
        <NewsletterForm />
        <p className="text-sm text-zinc-400 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};
