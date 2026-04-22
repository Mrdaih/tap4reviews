import { SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppButton({ message }: { message?: string }) {
  return (
    <a
      href={whatsappLink(SITE.whatsapp, message ?? "Hi Tap4Reviews, I'd like more info.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald shadow-[0_12px_30px_-8px_rgba(16,185,129,0.6)] transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white" aria-hidden="true">
        <path d="M19.11 17.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.18-1.41-.07-.12-.27-.2-.57-.35Zm-5.07 6.97h-.01c-1.66 0-3.29-.45-4.72-1.3l-.34-.2-3.5.92.94-3.41-.22-.35a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.49-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.78 6.7c0 5.23-4.26 9.47-9.47 9.47Zm8.06-17.54A11.33 11.33 0 0 0 14.04 3C7.8 3 2.74 8.05 2.74 14.28c0 2 .52 3.95 1.52 5.67L2.66 26l6.17-1.62a11.3 11.3 0 0 0 5.2 1.32h.01c6.24 0 11.3-5.05 11.3-11.28 0-3.01-1.17-5.85-3.3-7.98Z" />
      </svg>
    </a>
  );
}
