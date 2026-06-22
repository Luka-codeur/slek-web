import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Image
            src="/logo.png"
            alt="SLEK"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          © 2026 SLEK · Tous droits réservés
        </div>

        <p className="text-sm text-muted-foreground">
          Fait avec ♥ en France
        </p>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  )
}
