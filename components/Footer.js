import Link from "next/link";

function getAuthorDetail(author, index, englishLabel) {
  const details = Array.isArray(author?.about?.details) ? author.about.details : [];

  return details.find((item) => item.label === englishLabel)?.value || details[index]?.value || "";
}

export default function Footer({ author }) {
  const birthplace = getAuthorDetail(author, 2, "Birthplace");
  const education = getAuthorDetail(author, 3, "Education");

  return (
    <footer className="mt-20 w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-t border-white/10 py-10 lg:grid-cols-[1.15fr_0.75fr_1.1fr]">
          <section>
            <p className="text-sm uppercase tracking-[0.24em] text-white/55">About Us</p>
            <p className="mt-3 font-display text-3xl text-white">Author Portfolio Blog</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
              A dedicated reading space for poems, stories, literary reflections, and the ongoing archive of Dr. Amrendra
              Suman&apos;s work.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/about" className="text-[#f2c38b] transition hover:text-white">
                About Us
              </Link>
              <Link href="/contact" className="text-[#f2c38b] transition hover:text-white">
                Contact
              </Link>
            </div>
          </section>

          <section>
            <p className="text-sm uppercase tracking-[0.24em] text-white/55">Admin Login</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              <Link href="/admin/login" className="font-semibold text-white transition hover:text-[#f2c38b]">
                Go to admin login
              </Link>
              <p className="leading-7">
                Manage poems, stories, gallery posts, and archive content from the admin dashboard.
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm uppercase tracking-[0.24em] text-white/55">Author Details</p>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <p>
                <span className="font-semibold text-white">Name:</span> {author?.name || "Dr. Amrendra Suman"}
              </p>
              {author?.email ? (
                <p>
                  <span className="font-semibold text-white">Email:</span> {author.email}
                </p>
              ) : null}
              {birthplace ? (
                <p>
                  <span className="font-semibold text-white">Birthplace:</span> {birthplace}
                </p>
              ) : null}
              {education ? (
                <p className="leading-7">
                  <span className="font-semibold text-white">Education:</span> {education}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
