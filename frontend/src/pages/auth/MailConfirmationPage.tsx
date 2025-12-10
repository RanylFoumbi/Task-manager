import { Send } from "lucide-react";
import { Button } from "../../components/ui";
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision";

export default function MailConfirmationPage() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg relative z-10 flex flex-col items-center justify-center gap-4 text-center">
        <Send className="h-12 w-12 text-slate-900 animate-bounce" />
        <h3 className="text-3xl font-bold tracking-tight text-slate-900">
          A confirmation email has been sent!
        </h3>
        <p className="text-sm text-slate-700">
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
    </BackgroundBeamsWithCollision>
  );
}
