export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-brand-light py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
        <p id="footer-copy">
          © {currentYear} QR Code Styling Logo. Built with precision.
        </p>
        <p id="footer-author" className="font-medium">
          Created with focus on design and usability.
        </p>
      </div>
    </footer>
  );
}
