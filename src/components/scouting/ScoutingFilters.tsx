
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ScoutingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
  selectedAgeRange: string;
  onAgeRangeChange: (value: string) => void;
  selectedGender: string;
  onGenderChange: (value: string) => void;
}

const ScoutingFilters: React.FC<ScoutingFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedSport,
  onSportChange,
  selectedPosition,
  onPositionChange,
  selectedAgeRange,
  onAgeRangeChange,
  selectedGender,
  onGenderChange
}) => {
  return (
    <div className="bg-athlex-gray-900 border border-athlex-gray-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <SelectItem value="Badminton">Badminton</SelectItem>
              <SelectItem value="Netball">Netball</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-athlex-gray-500" />
          <Select value={selectedPosition} onValueChange={onPositionChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectItem value="all">All Positions</SelectItem>
              
              {/* Positions will change based on selected sport */}
              {selectedSport === "Football" && (
                <>
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Striker">Striker</SelectItem>
                </>
              )}
              
              {selectedSport === "Basketball" && (
                <>
                  <SelectItem value="Point Guard">Point Guard</SelectItem>
                  <SelectItem value="Shooting Guard">Shooting Guard</SelectItem>
                  <SelectItem value="Small Forward">Small Forward</SelectItem>
                  <SelectItem value="Power Forward">Power Forward</SelectItem>
                  <SelectItem value="Center">Center</SelectItem>
                </>
              )}
              
              {/* Show general positions if sport not selected or for other sports */}
              {selectedSport !== "Football" && selectedSport !== "Basketball" && (
                <>
                  <SelectItem value="Forward">Forward</SelectItem>
                  <SelectItem value="Midfielder">Midfielder</SelectItem>
                  <SelectItem value="Defender">Defender</SelectItem>
                  <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-athlex-gray-500" />
          <Select value={selectedAgeRange} onValueChange={onAgeRangeChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Age Range" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="13-15">13-15 years</SelectItem>
              <SelectItem value="16-18">16-18 years</SelectItem>
              <SelectItem value="19-22">19-22 years</SelectItem>
              <SelectItem value="23-30">23-30 years</SelectItem>
              <SelectItem value="30+">30+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-athlex-gray-500" />
          <Select value={selectedGender} onValueChange={onGenderChange}>
            <SelectTrigger className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className="bg-athlex-gray-800 border-athlex-gray-700 text-white">
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ScoutingFilters;
