import type { ReactNode } from 'react';
import { Home, Book, NotebookText } from 'lucide-react';

export type MenuItem = {
  label: string;
  path: string;
  icon?: ReactNode;
};

export const menuItems: MenuItem[] = [
  { label: 'Revisión', path: '/', icon: <Home size={18} /> },
  { label: 'Vocabulario', path: '/vocabulary', icon: <NotebookText size={18} /> },
  { label: 'Gramática', path: '/grammar', icon: <Book size={18} /> },
];
