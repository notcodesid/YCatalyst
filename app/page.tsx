'use client';

import { useState, useEffect } from 'react';
import Appbar from "@/components/appbar";
import CompanyCard from "@/components/companycard";
import CompanyFilters, { FilterState } from "@/components/companyfilter";
import SearchBar from "@/components/searchbar";
import { readCompaniesFromCSV, Company } from "@/lib/csvUtils";
import path from "path";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    locations: [],
    teamSizes: [],
    foundedYears: []
  });

  // Load companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // In a client component, we need to fetch from an API
        const response = await fetch('/api/companies');
        const data = await response.json();
        setCompanies(data.companies);
        setFilteredCompanies(data.companies);
      } catch (error) {
        console.error("Error loading companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Apply filters and search whenever they change
  useEffect(() => {
    if (!companies.length) return;

    let result = [...companies];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(company => 
        company.name.toLowerCase().includes(term) || 
        company.description.toLowerCase().includes(term) ||
        company.industry.toLowerCase().includes(term)
      );
    }

    // Apply industry filters
    if (filters.industries.length > 0) {
      result = result.filter(company => {
        if (!company.industry) return false;
        const companyIndustries = company.industry.split(',').map(i => i.trim());
        return filters.industries.some(industry => 
          companyIndustries.includes(industry)
        );
      });
    }

    // Apply location filters
    if (filters.locations.length > 0) {
      result = result.filter(company => 
        filters.locations.includes(company.location)
      );
    }

    // Apply team size filters
    if (filters.teamSizes.length > 0) {
      result = result.filter(company => {
        const size = company.teamSize;
        if (filters.teamSizes.includes('1-10') && size >= 1 && size <= 10) return true;
        if (filters.teamSizes.includes('11-50') && size >= 11 && size <= 50) return true;
        if (filters.teamSizes.includes('51+') && size > 50) return true;
        return false;
      });
    }

    // Apply founded year filters
    if (filters.foundedYears.length > 0) {
      result = result.filter(company => 
        filters.foundedYears.includes(company.founded)
      );
    }

    // Apply sorting
    result = sortCompanies(result, sortOption);

    setFilteredCompanies(result);
  }, [companies, searchTerm, filters, sortOption]);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Handle search term changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle sort option changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Sort companies based on the selected option
  const sortCompanies = (companies: Company[], option: string) => {
    const sorted = [...companies];
    
    switch (option) {
      case 'latest':
        return sorted.sort((a, b) => {
          // Sort by founded year in descending order
          return parseInt(b.founded || '0') - parseInt(a.founded || '0');
        });
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'teamSize':
        return sorted.sort((a, b) => b.teamSize - a.teamSize);
      default:
        return sorted;
    }
  };

  return (
    <>
    <Appbar />
    <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Startup Directory</h1>
          <p className="text-gray-600 mb-8">
            Discover innovative startups and their groundbreaking solutions.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
            <SearchBar onSearch={handleSearch} />
            <select 
              className="border rounded-md px-4 py-2 bg-white"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="latest">Sort by: Latest</option>
              <option value="name">Sort by: Name</option>
              <option value="teamSize">Sort by: Team Size</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <CompanyFilters 
            companies={companies} 
            onFilterChange={handleFilterChange} 
          />
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company, index) => (
                    <CompanyCard key={index} {...company} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No companies found matching your filters. Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}