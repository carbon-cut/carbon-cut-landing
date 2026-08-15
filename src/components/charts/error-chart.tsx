import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorChart({ error, title }: { error: Error; title: string }) {
  return (
    <div className="flex items-center" style={{ height: 360 }}>
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </div>
  );
}
