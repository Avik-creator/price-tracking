import { CardTitle, CardContent, Card } from "@/components/ui/card";

interface PriceCardProps {
  amount: number;
  currency: string;
  type: string;
  label: any;
}

export function PriceCard({ amount, currency, type, label }: PriceCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="grid gap-4 p-2 md:p-4">
        <div className="grid gap-2">
          <CardTitle className="text-2xl font-bold">
            {label}
            {type}
          </CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl">
            {currency}
            {amount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
