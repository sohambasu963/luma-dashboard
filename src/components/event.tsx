import { Button } from "./ui/button";

interface EventProps {
  name: string;
  isManager: boolean;
  onEventClick: any;
}

export default function Event({ name, isManager, onEventClick }: EventProps) {
  return (
    <Button
      className="border p-8 rounded flex flex-col"
      disabled={!isManager}
      onClick={onEventClick}
    >
      <h1 className="text-lg font-bold">{name}</h1>
      {isManager && <p className="text-xs text-left">Manage Access</p>}
    </Button>
  );
}
