import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5U7N6mYo4WP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function NoPromo() {
  return (
    <div className="flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <MegaphoneIcon className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Nenhuma promoção disponível
        </h2>
        <p className="mt-4 text-muted-foreground">
          Pedimos desculpas, mas não há promoções disponíveis no momento. Por
          favor, volte mais tarde para atualizações.
        </p>
      </div>
    </div>
  );
}

function MegaphoneIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}
