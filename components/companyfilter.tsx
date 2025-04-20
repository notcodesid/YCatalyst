'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Company } from '@/lib/csvUtils';

interface CompanyFiltersProps {
  companies: Company[];
  onFilterChange: (filters: FilterState) => void;
  loading?: boolean;
}

export interface FilterState {
  industries: string[];
  locations: string[];
  teamSizes: string[];
  foundedYears: string[];
}

// Industry categories mapping
const INDUSTRY_CATEGORIES: Record<string, string[]> = {
  "AI & Machine Learning": [
    "ai", "artificial-intelligence", "machine-learning", "deep-learning", 
    "generative-ai", "ai-enhanced-learning", "aiops", "llm"
  ],
  "Health & Biotech": [
    "health", "healthcare", "biotech", "synthetic-biology", "health-tech", 
    "medtech", "medical", "genomics", "drug-discovery"
  ],
  "Developer Tools": [
    "developer-tools", "devtools", "programming", "software", "code", 
    "infrastructure", "api", "cloud", "web-development"
  ],
  "Finance & Fintech": [
    "finance", "fintech", "payments", "banking", "insurance", 
    "crypto-web3", "blockchain", "investing"
  ],
  "Enterprise & B2B": [
    "b2b", "enterprise", "saas", "enterprise-software", "workflow-automation", 
    "productivity", "compliance", "operations"
  ],
  "Consumer": [
    "consumer", "b2c", "social-media", "entertainment", "gaming", 
    "travel", "food", "retail", "e-commerce"
  ],
  "Hardware & Robotics": [
    "hardware", "robotics", "iot", "drones", "hard-tech", 
    "manufacturing", "3d-printing"
  ],
  "Climate & Energy": [
    "climate", "energy", "renewable-energy", "sustainability", "clean-tech", 
    "climatetech", "agriculture"
  ],
  "Data & Analytics": [
    "data", "analytics", "big-data", "databases", "market-research", 
    "business-intelligence", "data-science"
  ],
  "Security": [
    "security", "cybersecurity", "privacy", "compliance", "defense"
  ]
};

// Location categories mapping
const LOCATION_CATEGORIES: Record<string, string[]> = {
  "San Francisco Bay Area": [
    "San Francisco", "SF", "Palo Alto", "Mountain View", "Menlo Park", 
    "Redwood City", "San Jose", "Sunnyvale", "Santa Clara"
  ],
  "New York": [
    "New York", "NYC", "New York, NY", "Brooklyn", "Manhattan"
  ],
  "Other US Cities": [
    "Seattle", "Boston", "Austin", "Chicago", "Los Angeles", "LA", 
    "Washington", "Miami", "Denver", "Portland"
  ],
  "Europe": [
    "London", "Berlin", "Paris", "Amsterdam", "Dublin", "Stockholm", 
    "Barcelona", "Madrid", "Zurich", "Munich", "Europe"
  ],
  "Asia": [
    "Singapore", "Tokyo", "Hong Kong", "Bangalore", "Beijing", 
    "Shanghai", "Seoul", "Taipei", "Mumbai", "Delhi"
  ],
  "Other International": [
    "Toronto", "Vancouver", "Montreal", "Sydney", "Melbourne", 
    "Tel Aviv", "Dubai", "Mexico City", "Sao Paulo"
  ]
};

export default function CompanyFilters({ companies, onFilterChange, loading = false }: CompanyFiltersProps) {
  // Extract unique values from companies data
  const getUniqueValues = (key: keyof Company) => {
    const values = new Set<string>();
    
    companies.forEach(company => {
      if (key === 'industry' && company[key]) {
        // Handle industry which can be comma-separated
        company[key].split(',').forEach(item => {
          values.add(item.trim());
        });
      } else if (company[key]) {
        values.add(String(company[key]));
      }
    });
    
    return Array.from(values).sort();
  };

  // Get unique values for each filter category
  const uniqueIndustries = getUniqueValues('industry');
  const uniqueLocations = getUniqueValues('location');
  const uniqueFoundedYears = getUniqueValues('founded');
  
  // Create team size ranges
  const teamSizeRanges = [
    '1-10',
    '11-50',
    '51+'
  ];

  // Generate industry categories based on available data
  const getIndustryCategories = () => {
    const categories: Record<string, string[]> = {};
    
    // For each category, check if any of its keywords exist in the data
    Object.entries(INDUSTRY_CATEGORIES).forEach(([category, keywords]) => {
      const matchingIndustries = uniqueIndustries.filter(industry => 
        keywords.some(keyword => 
          industry.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (matchingIndustries.length > 0) {
        categories[category] = matchingIndustries;
      }
    });
    
    // Add "Other" category for industries that don't match any category
    const categorizedIndustries = Object.values(categories).flat();
    const otherIndustries = uniqueIndustries.filter(
      industry => !categorizedIndustries.includes(industry)
    );
    
    if (otherIndustries.length > 0) {
      categories["Other"] = otherIndustries;
    }
    
    return categories;
  };

  // Generate location categories based on available data
  const getLocationCategories = () => {
    const categories: Record<string, string[]> = {};
    
    // For each category, check if any of its keywords exist in the data
    Object.entries(LOCATION_CATEGORIES).forEach(([category, keywords]) => {
      const matchingLocations = uniqueLocations.filter(location => 
        keywords.some(keyword => 
          location.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (matchingLocations.length > 0) {
        categories[category] = matchingLocations;
      }
    });
    
    // Add "Other" category for locations that don't match any category
    const categorizedLocations = Object.values(categories).flat();
    const otherLocations = uniqueLocations.filter(
      location => !categorizedLocations.includes(location)
    );
    
    if (otherLocations.length > 0) {
      categories["Other"] = otherLocations;
    }
    
    return categories;
  };

  const industryCategories = getIndustryCategories();
  const locationCategories = getLocationCategories();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    locations: [],
    teamSizes: [],
    foundedYears: []
  });

  // Handle checkbox changes for industry category
  const handleIndustryCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => {
      let newIndustries = [...prev.industries];
      
      if (checked) {
        // Add all industries in this category that aren't already selected
        const industriesToAdd = industryCategories[category].filter(
          industry => !newIndustries.includes(industry)
        );
        newIndustries = [...newIndustries, ...industriesToAdd];
      } else {
        // Remove all industries in this category
        newIndustries = newIndustries.filter(
          industry => !industryCategories[category].includes(industry)
        );
      }
      
      const newFilters = { ...prev, industries: newIndustries };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle checkbox changes for location category
  const handleLocationCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => {
      let newLocations = [...prev.locations];
      
      if (checked) {
        // Add all locations in this category that aren't already selected
        const locationsToAdd = locationCategories[category].filter(
          location => !newLocations.includes(location)
        );
        newLocations = [...newLocations, ...locationsToAdd];
      } else {
        // Remove all locations in this category
        newLocations = newLocations.filter(
          location => !locationCategories[category].includes(location)
        );
      }
      
      const newFilters = { ...prev, locations: newLocations };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle checkbox changes for team size
  const handleTeamSizeChange = (size: string, checked: boolean) => {
    setFilters(prev => {
      const newTeamSizes = checked 
        ? [...prev.teamSizes, size] 
        : prev.teamSizes.filter(s => s !== size);
      
      const newFilters = { ...prev, teamSizes: newTeamSizes };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle checkbox changes for founded year
  const handleFoundedYearChange = (year: string, checked: boolean) => {
    setFilters(prev => {
      const newFoundedYears = checked 
        ? [...prev.foundedYears, year] 
        : prev.foundedYears.filter(y => y !== year);
      
      const newFilters = { ...prev, foundedYears: newFoundedYears };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle "All" checkbox changes
  const handleAllIndustriesChange = (checked: boolean) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev, 
        industries: checked ? uniqueIndustries : [] 
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleAllLocationsChange = (checked: boolean) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev, 
        locations: checked ? uniqueLocations : [] 
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleAllTeamSizesChange = (checked: boolean) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev, 
        teamSizes: checked ? teamSizeRanges : [] 
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleAllFoundedYearsChange = (checked: boolean) => {
    setFilters(prev => {
      const newFilters = { 
        ...prev, 
        foundedYears: checked ? uniqueFoundedYears : [] 
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Check if a category is fully or partially selected
  const isCategoryChecked = (category: string, items: string[]) => {
    const categoryItems = category === 'industry' 
      ? Object.values(industryCategories).flat()
      : Object.values(locationCategories).flat();
    
    return categoryItems.every(item => items.includes(item));
  };

  const isCategoryPartiallyChecked = (category: string, categoryItems: string[], selectedItems: string[]) => {
    const hasSelected = categoryItems.some(item => selectedItems.includes(item));
    const hasUnselected = categoryItems.some(item => !selectedItems.includes(item));
    return hasSelected && hasUnselected;
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div className="w-full md:w-[300px] space-y-6 bg-white p-6 rounded-lg border animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 mt-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 mt-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[300px] space-y-6 bg-white p-6 rounded-lg border">
      {/* Industry Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Industry</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-industries" 
              checked={filters.industries.length === uniqueIndustries.length && uniqueIndustries.length > 0}
              onCheckedChange={(checked) => handleAllIndustriesChange(checked === true)}
            />
            <Label htmlFor="all-industries">All Industries</Label>
          </div>
          
          {/* Industry Categories */}
          {Object.entries(industryCategories).map(([category, industries], index) => (
            <div key={`industry-category-${index}`} className="mt-2">
              <div className="flex items-center space-x-2 font-medium">
                <Checkbox 
                  id={`industry-category-${index}`} 
                  checked={industries.every(i => filters.industries.includes(i))}
                  indeterminate={isCategoryPartiallyChecked(category, industries, filters.industries)}
                  onCheckedChange={(checked) => handleIndustryCategoryChange(category, checked === true)}
                />
                <Label htmlFor={`industry-category-${index}`}>{category} ({industries.length})</Label>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Location Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Location</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-locations" 
              checked={filters.locations.length === uniqueLocations.length && uniqueLocations.length > 0}
              onCheckedChange={(checked) => handleAllLocationsChange(checked === true)}
            />
            <Label htmlFor="all-locations">All Locations</Label>
          </div>
          
          {/* Location Categories */}
          {Object.entries(locationCategories).map(([category, locations], index) => (
            <div key={`location-category-${index}`} className="mt-2">
              <div className="flex items-center space-x-2 font-medium">
                <Checkbox 
                  id={`location-category-${index}`} 
                  checked={locations.every(l => filters.locations.includes(l))}
                  indeterminate={isCategoryPartiallyChecked(category, locations, filters.locations)}
                  onCheckedChange={(checked) => handleLocationCategoryChange(category, checked === true)}
                />
                <Label htmlFor={`location-category-${index}`}>{category} ({locations.length})</Label>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Team Size Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Team Size</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-sizes" 
              checked={filters.teamSizes.length === teamSizeRanges.length}
              onCheckedChange={(checked) => handleAllTeamSizesChange(checked === true)}
            />
            <Label htmlFor="all-sizes">All Sizes</Label>
          </div>
          {teamSizeRanges.map((size, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${index}`} 
                checked={filters.teamSizes.includes(size)}
                onCheckedChange={(checked) => handleTeamSizeChange(size, checked === true)}
              />
              <Label htmlFor={`size-${index}`}>{size}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Founded Year Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">Founded</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="all-years" 
              checked={filters.foundedYears.length === uniqueFoundedYears.length && uniqueFoundedYears.length > 0}
              onCheckedChange={(checked) => handleAllFoundedYearsChange(checked === true)}
            />
            <Label htmlFor="all-years">All Years</Label>
          </div>
          {uniqueFoundedYears.map((year, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox 
                id={`year-${index}`} 
                checked={filters.foundedYears.includes(year)}
                onCheckedChange={(checked) => handleFoundedYearChange(year, checked === true)}
              />
              <Label htmlFor={`year-${index}`}>{year}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
