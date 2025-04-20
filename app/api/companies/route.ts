import { NextResponse } from 'next/server';
import path from 'path';
import { readCompaniesFromCSV } from '@/lib/csvUtils';

export async function GET() {
  try {
    // Read companies from all CSV files
    const baseDir = path.join(process.cwd(), 'lib');
    const companies = readCompaniesFromCSV(baseDir);
    
    return NextResponse.json({ companies });
  } catch (error) {
    console.error('Error reading company data:', error);
    return NextResponse.json(
      { error: 'Failed to read company data', details: String(error) }, 
      { status: 500 }
    );
  }
}
