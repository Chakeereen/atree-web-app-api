export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground p-4 text-center">
      &copy; {new Date().getFullYear()} My Company. All rights reserved.
    </footer>
  );
}
