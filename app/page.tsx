import Appbar from "@/components/appbar";
import CompanyCard from "@/components/companycard";
import CompanyFilters from "@/components/companyfilter";
import SearchBar from "@/components/searchbar";

export default function Home() {

  const EXAMPLE_COMPANY = {
    name: "Raycaster",
    website: "https://raycaster.ai",
    description: "Raycaster helps companies sell complex technical products by surfacing hidden insights about their prospects. Our customers use us to automatically uncover everything from lab equipment specifications to API performance metrics - research that traditionally took weeks of manual digging.",
    industry: "Research and Sales Intelligence",
    founders: [
      { name: "Levi Lian", linkedin: "https://linkedin.com/in/levi-lian" },
      { name: "Anthony Humay", linkedin: "https://linkedin.com/in/ahumay" }
    ],
    founded: "2024",
    teamSize: 2,
    location: "SF",
    socials: "https://www.linkedin.com/company/raycasterai"
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
              <CompanyCard {...EXAMPLE_COMPANY} />
              <CompanyCard {...EXAMPLE_COMPANY} />
              <CompanyCard {...EXAMPLE_COMPANY} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
