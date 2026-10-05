import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Suivi carbone hebdomadaire</CardTitle>
          <CardDescription>Resume de votre progression actuelle.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary">
            Vos emissions estimees ont diminue de 8% cette semaine grace aux ajustements transport.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="default">Voir details</Button>
          <Button variant="outline">Ignorer</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Card / Base Surface</CardTitle>
          <CardDescription>For standard product content blocks.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary">
            Use for help, support, and form summary containers.
          </p>
        </CardContent>
      </Card>
      <Card className="border-border/15 bg-surface-warm">
        <CardHeader>
          <CardTitle>Card / Warm Surface</CardTitle>
          <CardDescription>For softer contextual content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary">
            Use sparingly where warm tone improves readability hierarchy.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
