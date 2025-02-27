"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ParentPage = () => {
  const pathname = usePathname();

  return (
    <div className="parent-container">
     111
    </div>
  );
};

export default ParentPage;