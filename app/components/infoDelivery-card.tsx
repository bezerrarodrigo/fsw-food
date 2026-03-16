import { Card } from "@/components/ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";

interface infoDeliveryCardProps {
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

const InfoDeliveryCard = ({
  deliveryFee,
  deliveryTimeMinutes,
}: infoDeliveryCardProps) => {
  return (
    <Card className="mt-6 mx-5">
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {deliveryFee == 0 ? (
            <span className="font-medium">Grátis</span>
          ) : (
            <span className="font-medium">
              {Number(deliveryFee).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Tempo</span>
            <TimerIcon size={14} />
          </div>
          <span>{deliveryTimeMinutes}min</span>
        </div>
      </div>
    </Card>
  );
};

export default InfoDeliveryCard;
