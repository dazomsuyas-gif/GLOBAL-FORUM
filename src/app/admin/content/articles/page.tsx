"use client";
import { useState } from 'react';
import DataTable from '../../../components/admin/DataTable';
import { adminData } from '../../../data/adminData';
import { Edit, Trash2, Eye, Copy, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
  { id: 1, title: 'AI Revolution 2024: Future of Technology', author: 'Kelvin Msuya', category: 'Technology', status: 'Published', views: 12567, created: '2024-10-15' },
  { id: 2, title: 'Master HSK Level 1 in 30 Days', author: 'Sarah Wilson', category: 'Languages', status: 'Draft', views: 0, created: '2024-10-14' },
  // ... more mock data
];

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'author', header: 'Author' },
  { key: 'category', header: 'Category' },
  { key: 'status', header: 'Status' },
  { key: 'views', header: 'Views' },
  { key: 'created', header: 'Created' },
];

export default function ArticlesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Articles Management
          </h1>
          <p className="text-2xl text-slate-400">Manage your content library with advanced moderation tools</p>
        </div>
        <div className="flex gap-4">
          <Button className="h-16 px-12 text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/50">
            Create New Article
          </Button>
        </div>
      </div>

      <DataTable data={articles} columns={columns} />
    </div>
  );
}
