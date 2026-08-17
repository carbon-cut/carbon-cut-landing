"use client";

import { useMemo } from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { BotMessageSquare } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScopedI18n } from "@/locales/client";

export default function AssistantPanel({ datasetKey }: { datasetKey: string }) {
  const t = useScopedI18n("(pages).collectivityDashboard.inventoryWorkspace.assistant");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/collectivity/assistant/inventory" }),
    []
  );
  const { messages, sendMessage, status, error, stop } = useChat({ transport });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-md px-4 shadow-none"
        >
          <BotMessageSquare aria-hidden="true" />
          {t("action")}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/10 pr-12">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          <Conversation className="min-h-0 flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  title={t("emptyTitle")}
                  description={t("emptyDescription")}
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <MessageResponse key={`${message.id}-${index}`}>
                            {part.text}
                          </MessageResponse>
                        ) : null
                      )}
                    </MessageContent>
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label={t("scrollToLatest")} />
          </Conversation>

          {error ? (
            <div className="px-4">
              <Alert variant="destructive" className="">
                <AlertDescription>{t("error")}</AlertDescription>
              </Alert>
            </div>
          ) : null}

          <div className="border-t border-border/10 p-4">
            <PromptInput
              onSubmit={({ text }) => {
                if (text.trim()) {
                  void sendMessage(
                    { text },
                    {
                      body: { datasetKey },
                    }
                  );
                }
              }}
            >
              <PromptInputBody>
                <PromptInputTextarea placeholder={t("placeholder")} />
              </PromptInputBody>
              <PromptInputFooter>
                <span className="text-muted-foreground text-sm">{t("inputHint")}</span>
                <PromptInputSubmit status={status} onStop={stop} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
