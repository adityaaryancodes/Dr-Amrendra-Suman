import ContactForm from "@/components/ContactForm";
import SiteShell from "@/components/SiteShell";
import { getAuthorProfile } from "@/lib/posts";

export const metadata = {
  title: "Contact | Author Portfolio Blog",
  description: "Get in touch with the author for collaborations, feedback, and publishing conversations."
};

export default async function ContactPage() {
  const author = await getAuthorProfile();

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <p className="text-sm uppercase tracking-[0.28em] text-muted">Contact</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">
          Reach out about writing, collaborations, or the archive itself.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          Use the form below to send a message directly into the archive inbox, or write to the author by email.
        </p>
      </section>

      <section className="editorial-rule mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] bg-surface p-6 shadow-sm sm:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-muted">Contact details</p>
            <h2 className="mt-4 font-display text-4xl">{author.name}</h2>
            <p className="mt-4 text-base leading-8 text-muted">{author.bio}</p>
            {author.email ? <p className="mt-6 text-sm text-muted">Email: {author.email}</p> : null}
          </div>

          <ContactForm authorEmail={author.email} />
        </div>
      </section>
    </SiteShell>
  );
}
