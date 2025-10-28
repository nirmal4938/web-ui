import { FiInbox, FiSend, FiTrash } from 'react-icons/fi';

export const sidebarItems = [
  { label: 'Inbox', icon: <FiInbox />, path: '/inbox', unreadCount: 4 },
  { label: 'Sent', icon: <FiSend />, path: '/sent' },
  { label: 'Trash', icon: <FiTrash />, path: '/trash', unreadCount: 1 },
];
