import { ReactNode } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

function FormLayout({ children }: FormLayoutProps) {
  return (
    <main className="mx-2 sm:mx-6 mt-16 mb-16">
      <section className="max-w-[80ch] mx-auto">
        {children}
      </section>
    </main>
  );
}

export default FormLayout;
