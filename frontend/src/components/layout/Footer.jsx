import { APP_NAME } from "@/constants/app";
import Container from "./Container";

function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container className="py-5">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {APP_NAME}. Built for a simple shopping experience.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
