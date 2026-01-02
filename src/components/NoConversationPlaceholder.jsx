import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoConversationPlaceholder() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 h-full">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">Select a conversation</h4>
        <p className="text-slate-400 text-sm px-6">
         Choose a contact from the list or start a new chat to begin messaging.
        </p>
      </div>
    </div>
  );
}

export default NoConversationPlaceholder;
