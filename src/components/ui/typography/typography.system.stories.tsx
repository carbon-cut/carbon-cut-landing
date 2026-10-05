import type { Meta, StoryObj } from "@storybook/nextjs";
import Typography from "./typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typography primitive refactored toward product-first readability. Marketing emphasis remains opt-in via dedicated marketing variants.",
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantScale: Story = {
  render: () => {
    const productVariants = [
      "default",
      "title",
      "subtitle",
      "description",
      "label",
      "caption",
      "muted",
    ] as const;
    const sizes = ["xs", "sm", "md", "lg", "xl", "huge"] as const;

    return (
      <div className="space-y-8">
        <section className="space-y-3">
          <Typography variant="title" size="lg">
            Product-first variants
          </Typography>
          {productVariants.map((variant) => (
            <div key={variant} className="space-y-1">
              <Typography variant="label" size="xs" className="uppercase text-secondary">
                {variant}
              </Typography>
              <Typography variant={variant} size="md">
                Exemple de texte pour verifier lisibilite, contraste et hierarchie dans l interface.
              </Typography>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <Typography variant="title" size="lg">
            Size scale
          </Typography>
          {sizes.map((size) => (
            <div key={size} className="space-y-1">
              <Typography variant="label" size="xs" className="uppercase text-secondary">
                {size}
              </Typography>
              <Typography variant="default" size={size}>
                Carbon Cut - echelle typographique
              </Typography>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <Typography variant="title" size="lg">
            Marketing opt-in variants
          </Typography>
          <Typography variant="marketingTitle" size="xl">
            Titre marketing uniquement
          </Typography>
          <Typography variant="marketingSubtitle" size="md">
            Sous-titre marketing uniquement
          </Typography>
        </section>
      </div>
    );
  },
};
