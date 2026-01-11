import { useState } from 'react';
import { VscCommentDiscussion } from 'react-icons/vsc';
import ChatBot from './ChatBot';
import styles from '@/styles/ChatBotFab.module.css';

const ChatBotFab = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={styles.fab}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        title="Chat with AI Assistant"
      >
        <VscCommentDiscussion className={styles.fabIcon} />
      </button>

      {/* ChatBot Modal Overlay */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <ChatBot onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotFab;

