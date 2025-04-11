
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedSport,
  onSportChange
}) => {
  return (
    <div className="bg-athlex-gray-900 border border-athlex-gray-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-athlex-gray-500" />
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-athlex-gray-800 border-athlex-gray-700 text-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-athlex-gray-500" />
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="athlete">Athletes</SelectItem>
              <SelectItem value="coach">Coaches</SelectItem>
              <SelectItem value="scout">Scouts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-athlex-gray-500" />
          <Select value={selectedSport} onValueChange={onSportChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Swimming">Swimming</SelectItem>
              <SelectItem value="Track">Track & Field</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
