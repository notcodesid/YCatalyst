import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface Founder {
  name: string;
  linkedin: string;
}

export interface Company {
  name: string;
  website: string;
  description: string;
  industry: string;
  founders: Founder[];
  founded: string;
  teamSize: number;
  location: string;
  socials: string;
  source?: string; // Optional field to track which file the data came from
}

/**
 * Read companies from a single CSV file
 */
export function readCompaniesFromSingleCSV(filePath: string, source?: string): Company[] {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`CSV file not found: ${filePath}`);
      return [];
    }

    // Read the CSV file
    const csvContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse the CSV content
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    // Process the data to match our Company interface
    const companies: Company[] = records.map((row: any) => {
      // Handle founders - the CSV has separate columns for founder names and LinkedIn profiles
      const foundersList: Founder[] = [];
      
      if (row['Founder Name']) {
        // Split founder names by comma
        const founderNames = row['Founder Name'].split(',').map((name: string) => name.trim());
        
        // Split LinkedIn URLs by comma if available
        let founderLinkedIns: string[] = [];
        if (row['Founder LinkedIn']) {
          // Some LinkedIn URLs might contain commas within quotes, handle this properly
          founderLinkedIns = row['Founder LinkedIn'].split(',').map((linkedin: string) => linkedin.trim());
        }
        
        // Create founder objects by pairing names with LinkedIn profiles
        for (let i = 0; i < founderNames.length; i++) {
          foundersList.push({
            name: founderNames[i],
            linkedin: i < founderLinkedIns.length ? founderLinkedIns[i] : ''
          });
        }
      }
      
      return {
        name: row['Company Name'] || '',
        website: row['Website'] || '',
        description: row['Company Description'] || '',
        industry: row['Industry'] || '',
        founders: foundersList,
        founded: row['Founded']?.toString() || '',
        teamSize: Number(row['Team Size']) || 0,
        location: row['Location'] || '',
        socials: row['Socials'] || '',
        source: source
      };
    });
    
    return companies;
  } catch (error) {
    console.error(`Error reading CSV file ${filePath}:`, error);
    return [];
  }
}

/**
 * Read companies from all CSV files
 */
export function readCompaniesFromCSV(baseDir: string): Company[] {
  const csvFiles = [
    path.join(baseDir, 'list1.csv'),
    path.join(baseDir, 'list2.csv'),
    path.join(baseDir, 'list3.csv'),
    path.join(baseDir, 'list4.csv')
  ];
  
  let allCompanies: Company[] = [];
  const uniqueCompanies = new Map<string, Company>();
  
  // Read each CSV file and combine the results
  csvFiles.forEach((filePath, index) => {
    const fileName = path.basename(filePath);
    const companies = readCompaniesFromSingleCSV(filePath, fileName);
    console.log(`Read ${companies.length} companies from ${fileName}`);
    
    // Add to all companies for logging purposes
    allCompanies = [...allCompanies, ...companies];
    
    // Add to unique companies map, using company name + website as the key
    companies.forEach(company => {
      const key = `${company.name}|${company.website}`.toLowerCase();
      if (!uniqueCompanies.has(key)) {
        uniqueCompanies.set(key, company);
      }
    });
  });
  
  const uniqueCompaniesArray = Array.from(uniqueCompanies.values());
  console.log(`Total companies loaded: ${allCompanies.length}`);
  console.log(`Unique companies after deduplication: ${uniqueCompaniesArray.length}`);
  
  return uniqueCompaniesArray;
}
