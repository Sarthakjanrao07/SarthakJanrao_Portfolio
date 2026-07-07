import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ChatbotToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export const ChatbotToggle: React.FC<ChatbotToggleProps> = ({ isOpen, onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[120] p-3 rounded-full shadow-2xl transition-colors duration-300 ${isOpen ? 'bg-red-500 text-white' : 'bg-[var(--gold)] text-black'
                }`}
            aria-label="Toggle Chatbot"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center items-center w-11 h-11"
                >
                    {isOpen ? (
                        <FiX size={28} />
                    ) : (
                        <img
                            src="/images/chatbot.png"
                            alt="Chatbot Icon"
                            className="w-full h-full object-contain scale-125"
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};
