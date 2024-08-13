import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],  // This should match the state property you're updating
    setMessages: (messages) => set({ messages }),  // Update the `messages` state, not `message`
}));

export default useConversation;
