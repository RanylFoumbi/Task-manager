import { Send } from "lucide-react";
import { Button } from "../../components/ui";

export default function MailConfirmationPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1 text-center pt-10">
      <Send className="mb-2 h-12 w-12 text-green-500 animate-bounce" />
      <h3 className="text-3xl font-bold tracking-tight">
        A confirmation email has been sent!
      </h3>
      <p className="text-sm text-muted-foreground">
        Check your inbox and click the link to verify your email address.
      </p>
      <Button
        className="mt-4"
        onClick={() => {
          window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
        }}
      >
        Open Gmail
      </Button>
    </div>
  );
}
