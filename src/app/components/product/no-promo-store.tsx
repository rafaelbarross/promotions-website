import { Frown } from "lucide-react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5U7N6mYo4WP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

interface Props {
  loja: string;
}

export default function NoPromoStore({ loja }: Props) {
  return (
    <div className="-mt-20 flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Frown className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Ainda não temos promoções da loja{" "}
          <span className="text-black font-bold">{loja}</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Pedimos desculpas, mas ainda não há promoções disponíveis para está
          loja. Por favor, volte mais tarde para atualizações.
        </p>
      </div>
    </div>
  );
}
