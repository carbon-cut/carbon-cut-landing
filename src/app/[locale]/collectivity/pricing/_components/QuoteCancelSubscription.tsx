"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { cancelCollectivitySubscription } from "@/app/[locale]/collectivity/_lib/queries";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import { getCollectivityPricingRoute } from "@/lib/routing/routes";

export function QuoteCancelSubscription({
  subscriptionId,
  labels,
}: {
  subscriptionId: number;
  labels: {
    action: string;
    title: string;
    description: string;
    confirm: string;
    dismiss: string;
    error: string;
  };
}) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => cancelCollectivitySubscription(subscriptionId),
    onSuccess: () => router.push(getCollectivityPricingRoute()),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="h-10 w-full" variant="destructive-secondary" size="large">
          {labels.action}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={!mutation.isPending}
        className="rounded-md border-neutral-border bg-default-background"
      >
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>
        {mutation.isError ? (
          <Typography variant="captionSubframe" className="text-error-700">
            {labels.error}
          </Typography>
        ) : null}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="neutral-secondary"
              size="medium"
              disabled={mutation.isPending}
            >
              {labels.dismiss}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive-primary"
            size="medium"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {labels.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
