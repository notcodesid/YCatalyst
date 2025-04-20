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
}

export function readCompaniesFromCSV(filePath: string): Company[] {
  try {
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
        socials: row['Socials'] || ''
      };
    });
    
    return companies;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return [];
  }
}
