import { MessageCircle } from "lucide-react";

function NoChatHistoryPlaceholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 h-full">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-cyan-400" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">
          No chat history with {name}
        </h4>
        <p className="text-slate-400 text-sm px-6">
          Start a conversation with {name} to see your messages here.
        </p>
      </div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;
