import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

type PagePlaceholderProps = {
  title: string;
  description?: string;
  figmaFrame?: string;
};

export function PagePlaceholder({
  title,
  description = "UI coming in a later step.",
  figmaFrame,
}: PagePlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      {figmaFrame ? (
        <CardContent>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Figma: {figmaFrame}
          </p>
        </CardContent>
      ) : null}
    </Card>
  );
}
