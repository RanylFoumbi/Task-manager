export default function Header() {
  return (
    <header className="w-full h- theme-bg fixed top-0 left-0 shadow-md z-50 card-hover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"></div>
      <div className="text-2xl font-bold text-primary-foreground">App</div>
      <nav className="space-x-4">
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <a href="/about" className="text-primary hover:underline">
          About
        </a>
        <a href="/contact" className="text-primary hover:underline">
          Contact
        </a>
      </nav>
    </header>
  );
}
