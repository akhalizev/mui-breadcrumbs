import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href: string;
  }>;
  itemsBefore?: number;
  itemsAfter?: number;
}

export function Breadcrumbs({ 
  items, 
  itemsBefore = 1, 
  itemsAfter = 2 
}: BreadcrumbsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!items?.length) return null;

  const shouldCollapse = items.length > itemsBefore + itemsAfter + 1;
  const visibleItems = shouldCollapse
    ? [
        ...items.slice(0, itemsBefore),
        { label: '', href: '' }, // collapse placeholder
        ...items.slice(-itemsAfter),
      ]
    : items;

  const hiddenItems = shouldCollapse
    ? items.slice(itemsBefore, -itemsAfter)
    : [];

  return (
    <nav aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-2 text-sm">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isCollapsePlaceholder = item.label === '' && item.href === '';

          if (isCollapsePlaceholder) {
            return (
              <li key="collapse" className="flex items-center relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Show more breadcrumbs"
                  aria-expanded={isDropdownOpen}
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                
                {/* Dropdown Menu */}
                {isDropdownOpen && hiddenItems.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {hiddenItems.map((hiddenItem) => (
                      <a
                        key={hiddenItem.href}
                        href={hiddenItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      >
                        {hiddenItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.href} className="flex items-center">
              <a
                href={item.href}
                className={`hover:text-blue-600 transition-colors duration-200 ${
                  isLast
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </a>
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 
