import Appbar from "@/components/appbar";
import CompanyCard from "@/components/companycard";
import CompanyFilters from "@/components/companyfilter";
import SearchBar from "@/components/searchbar";
import { readCompaniesFromCSV, Company } from "@/lib/csvUtils";
import path from "path";
import fs from "fs";

export default function Home() {
  // Read companies from CSV file
  const getCompanies = (): Company[] => {
    try {
      const filePath = path.join(process.cwd(), 'lib', 'list1.csv');
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.error("CSV file not found:", filePath);
        return [];
      }
      
      return readCompaniesFromCSV(filePath);
    } catch (error) {
      console.error("Error loading companies:", error);
      return [];
    }
  };

  // Get companies data
  const companies = getCompanies();

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
            <SearchBar />
            <select className="border rounded-md px-4 py-2 bg-white">
              <option>Sort by: Latest</option>
              <option>Sort by: Name</option>
              <option>Sort by: Industry</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <CompanyFilters />
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <CompanyCard key={index} {...company} />
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">No companies found. Please check your CSV file format.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}